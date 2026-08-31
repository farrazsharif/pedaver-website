"use client";

/**
 * Read Aloud — browser-native (SpeechSynthesis) chapter narration. PILOT.
 *
 * Additive, dependency-free, English only. A reading utility, not a media
 * player: it must not compete visually with the Download PDF control, must
 * not move focus, auto-scroll, mutate visible text, or highlight words. Speech
 * input comes from the structured chapter data via buildSpeechChunks — never
 * from the DOM. See src/lib/content/chapterSpeech.ts.
 *
 * Robustness notes:
 *  - Chrome cuts a single long utterance at ~15s. Mitigated two ways: every
 *    utterance is one sentence (see splitSentences), and a 5s interval calls
 *    speechSynthesis.resume() while playing to clear Chrome's internal timer.
 *  - Safari/iOS requires the first .speak() to run inside the user gesture —
 *    handlePlay calls speakFrom() synchronously from the click handler.
 *  - Safari/iOS pause()/resume() is unreliable; resume falls back to
 *    re-speaking the current sentence, which also lets a speed change take
 *    effect immediately.
 *  - Everything is cancelled on Stop, on unmount, and on pagehide.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildSpeechChunks, type SpeechSegment } from "@/lib/content/chapterSpeech";

type Status = "idle" | "playing" | "paused" | "ended" | "unsupported" | "unavailable";

const SPEEDS = [0.75, 1, 1.1, 1.25] as const;
const APPARATUS: React.CSSProperties = { fontFamily: "Arial, sans-serif" };

const PRIVACY_NOTE =
  "If you use “Listen”, the text of the page may be sent to your browser or " +
  "operating system’s speech provider, such as Apple, Google or Microsoft, depending " +
  "on the voice your device uses. Pedaver does not process, transmit or store any audio.";

export default function ReadAloud({ segments }: { segments: SpeechSegment[] }) {
  const chunks = useMemo(() => buildSpeechChunks(segments), [segments]);

  const [status, setStatus] = useState<Status>("idle");
  const [rate, setRate] = useState<number>(1);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [live, setLive] = useState("");

  const genRef = useRef(0); // bumped on every (re)start / stop — stale callbacks check against it
  const idxRef = useRef(0);
  const pausedAtRef = useRef(0);
  const rateRef = useRef(1);
  const startedRateRef = useRef(1); // rate the currently-speaking utterance began at
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const startedRef = useRef(false);
  const keepAliveRef = useRef<number | null>(null);

  const total = chunks.length;

  /* ---- Chrome keep-alive ---- */
  const stopKeepAlive = useCallback(() => {
    if (keepAliveRef.current !== null) {
      window.clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }, []);
  const startKeepAlive = useCallback(() => {
    stopKeepAlive();
    keepAliveRef.current = window.setInterval(() => {
      const s = window.speechSynthesis;
      if (s && s.speaking && !s.paused) s.resume();
    }, 5000);
  }, [stopKeepAlive]);

  /* ---- feature detection + English voice selection ---- */
  useEffect(() => {
    const s = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    let done = false;

    const applySupport = () => {
      if (done) return;
      if (!s || typeof window.SpeechSynthesisUtterance === "undefined") setStatus("unsupported");
    };
    const pickVoice = () => {
      if (done || !s) return;
      if (startedRef.current && voiceRef.current) return; // don't swap voices mid-chapter
      const voices = s.getVoices();
      if (!voices.length) return; // may arrive later on voiceschanged
      const english = voices.filter((v) => /^en([-_]|$)/i.test(v.lang));
      voiceRef.current =
        english.find((v) => v.default) ??
        english.find((v) => v.localService) ??
        english[0] ??
        null;
      setStatus((prev) => {
        if (prev !== "idle" && prev !== "unavailable") return prev;
        return voiceRef.current ? "idle" : "unavailable";
      });
    };

    // Deferred so the first paint matches the server HTML (no synchronous
    // setState in the effect body), then reconcile on the microtask.
    queueMicrotask(() => {
      applySupport();
      pickVoice();
    });
    s?.addEventListener?.("voiceschanged", pickVoice);
    return () => {
      done = true;
      s?.removeEventListener?.("voiceschanged", pickVoice);
    };
  }, []);

  /* ---- hard stop on unmount / navigation away ---- */
  useEffect(() => {
    const hardStop = () => {
      genRef.current += 1;
      stopKeepAlive();
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* no-op */
      }
    };
    window.addEventListener("pagehide", hardStop);
    return () => {
      window.removeEventListener("pagehide", hardStop);
      hardStop();
    };
  }, [stopKeepAlive]);

  /* ---- core: speak from a chunk index, one sentence at a time ---- */
  const speakFrom = useCallback(
    (start: number) => {
      const s = window.speechSynthesis;
      if (!s || total === 0) return;
      genRef.current += 1;
      const myGen = genRef.current;
      s.cancel();

      const run = (i: number) => {
        if (myGen !== genRef.current) return;
        if (i >= total) {
          idxRef.current = total;
          setChunkIndex(total);
          setStatus("ended");
          setLive("Finished");
          stopKeepAlive();
          return;
        }
        idxRef.current = i;
        setChunkIndex(i);

        const u = new SpeechSynthesisUtterance(chunks[i].text);
        if (voiceRef.current) {
          u.voice = voiceRef.current;
          u.lang = voiceRef.current.lang;
        } else {
          u.lang = "en-US";
        }
        u.rate = rateRef.current;
        startedRateRef.current = rateRef.current;
        u.onend = () => {
          if (myGen !== genRef.current) return;
          run(i + 1);
        };
        u.onerror = (event) => {
          if (myGen !== genRef.current) return;
          const err = event.error;
          if (err === "interrupted" || err === "canceled") return;
          setStatus("idle");
          setLive("Playback stopped");
          stopKeepAlive();
        };
        s.speak(u);
      };

      run(start);
    },
    [chunks, total, stopKeepAlive]
  );

  /* ---- controls ---- */
  const play = useCallback(() => {
    startedRef.current = true;
    setStatus("playing");
    setLive("Playing");
    startKeepAlive();
    speakFrom(0); // synchronous .speak() inside the gesture — required by Safari/iOS
  }, [speakFrom, startKeepAlive]);

  const pause = useCallback(() => {
    pausedAtRef.current = idxRef.current;
    window.speechSynthesis?.pause();
    stopKeepAlive();
    setStatus("paused");
    setLive("Paused");
  }, [stopKeepAlive]);

  const resume = useCallback(() => {
    const s = window.speechSynthesis;
    setStatus("playing");
    setLive("Playing");
    startKeepAlive();
    // Use native mid-sentence resume only when it's actually paused and the
    // speed hasn't changed; otherwise re-speak the current sentence.
    if (s && s.paused && rateRef.current === startedRateRef.current) {
      s.resume();
    } else {
      speakFrom(pausedAtRef.current);
    }
  }, [speakFrom, startKeepAlive]);

  const stop = useCallback(() => {
    genRef.current += 1;
    stopKeepAlive();
    window.speechSynthesis?.cancel();
    idxRef.current = 0;
    pausedAtRef.current = 0;
    setChunkIndex(0);
    setStatus("idle");
    setLive("Stopped");
  }, [stopKeepAlive]);

  const changeRate = useCallback(
    (r: number) => {
      setRate(r);
      rateRef.current = r;
      if (status === "playing") speakFrom(idxRef.current); // brief re-read of the current sentence
      // paused: applied on resume. idle/ended: applied on next play.
    },
    [status, speakFrom]
  );

  /* ---- render ---- */
  if (status === "unsupported" || total === 0) return null;

  const pct = total > 0 ? Math.min(100, Math.round((chunkIndex / total) * 100)) : 0;
  const active = status === "playing" || status === "paused";

  return (
    <div role="group" aria-label="Read this chapter aloud" style={APPARATUS} className="text-sm">
      <p aria-live="polite" className="sr-only">
        {live}
      </p>

      {status === "unavailable" ? (
        <p className="text-xs text-ink-soft">
          Listen is unavailable on this device — no English speech voice was found.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {!active && (
            <button
              type="button"
              onClick={play}
              className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-3 py-1.5 font-semibold text-ink-soft transition hover:border-primary-light hover:text-primary-dark"
            >
              <span aria-hidden="true">{status === "ended" ? "↻" : "▶"}</span>
              {status === "ended" ? "Listen again" : "Listen to this chapter"}
            </button>
          )}

          {active && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={status === "playing" ? pause : resume}
                    aria-pressed={status === "paused"}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-semibold text-ink-soft transition hover:border-primary-light hover:text-primary-dark"
                  >
                    <span aria-hidden="true">{status === "playing" ? "⏸" : "▶"}</span>
                    {status === "playing" ? "Pause" : "Resume"}
                  </button>
                  <button
                    type="button"
                    onClick={stop}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-semibold text-ink-soft transition hover:border-primary-light hover:text-primary-dark"
                  >
                    <span aria-hidden="true">{"■"}</span>
                    Stop
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="sr-only">Playback speed</span>
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => changeRate(s)}
                      aria-pressed={rate === s}
                      aria-label={`${s} times speed`}
                      className={`min-w-[2.5rem] rounded-md border px-2 py-1.5 font-semibold transition ${
                        rate === s
                          ? "border-primary bg-primary/10 text-primary-dark"
                          : "border-border text-ink-soft hover:border-primary-light hover:text-primary-dark"
                      }`}
                    >
                      {s}&times;
                    </button>
                  ))}
                </div>

                <span className="ml-auto tabular-nums text-xs text-ink-soft">{pct}%</span>
              </div>

              <div className="h-1 w-full overflow-hidden rounded-full bg-border" aria-hidden="true">
                <div className="h-full rounded-full bg-primary-light transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          <p className="max-w-2xl text-xs leading-relaxed text-ink-soft">{PRIVACY_NOTE}</p>
        </div>
      )}
    </div>
  );
}
