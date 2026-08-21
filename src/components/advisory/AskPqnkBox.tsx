"use client";

import { useState } from "react";
import Link from "next/link";
import { askPqnk, type AskResponse } from "./askPqnkClient";
import ReferralForm from "./ReferralForm";

type Phase = "idle" | "loading" | "answered" | "insufficient" | "referred" | "error";

// ASK_PQNK_UI_ARCHITECTURE.md sec 3-4: the Ask a Question / Answer-or-Refer
// zones of the Farmer Advisory page, as one coherent flow rather than
// three unrelated systems. Text-first for V1 — the mic affordance is
// reserved but inert until voice activates (ASK_PQNK_ARCHITECTURE.md sec 15).
export default function AskPqnkBox() {
  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<AskResponse | null>(null);
  const [referenceInfo, setReferenceInfo] = useState<{ referenceNumber: string; message: string } | null>(null);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (question.trim().length < 3) return;
    setPhase("loading");
    try {
      const res = await askPqnk(question);
      setResult(res);
      setPhase(res.sufficient ? "answered" : "insufficient");
    } catch {
      setPhase("error");
    }
  }

  function reset() {
    setQuestion("");
    setPhase("idle");
    setResult(null);
    setReferenceInfo(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Ask PQNK</p>
      <h2 className="mt-1 text-2xl font-bold text-primary-dark">Ask a question naturally</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Type in English, Urdu, Roman Urdu, or the way you'd normally describe it. You don't need to know PQNK terminology.
      </p>

      <form onSubmit={handleAsk} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What's going on in your field?"
            className="flex-1 bg-transparent text-sm outline-none"
            disabled={phase === "loading"}
          />
          <button
            type="button"
            disabled
            title="Voice questions are coming soon"
            aria-label="Ask by voice (coming soon)"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-ink-soft/40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0M12 19v3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={phase === "loading" || question.trim().length < 3}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-cream disabled:opacity-60"
        >
          {phase === "loading" ? "Searching…" : "Ask"}
        </button>
      </form>

      {phase === "error" && (
        <p className="mt-4 text-sm text-red-700">Something went wrong reaching Ask PQNK. Please try again.</p>
      )}

      {phase === "answered" && result && (
        <div className="mt-6 rounded-xl border border-border bg-background p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Answer</p>
          <p className="mt-1 font-medium text-ink">{result.shortAnswer}</p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">Why</p>
          <p className="mt-1 text-sm text-ink-soft">{result.answer}</p>

          {result.practicalAction && (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">What to do</p>
              <p className="mt-1 text-sm text-ink-soft">{result.practicalAction}</p>
            </>
          )}

          {result.sources && result.sources.length > 0 && (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">Sources</p>
              <ul className="mt-1 flex flex-col gap-1">
                {result.sources.map((s) => (
                  <li key={s.reference} className="text-sm">
                    {s.sourceType === "Science Page" ? (
                      <Link href={s.reference} className="text-primary underline underline-offset-2">
                        {s.title}
                      </Link>
                    ) : s.sourceType === "Knowledge Paper" ? (
                      <Link href={`/papers/${s.reference}`} className="text-primary underline underline-offset-2">
                        {s.title}
                      </Link>
                    ) : (
                      <span className="text-primary">{s.title}</span>
                    )}
                    <span className="ml-2 text-xs text-ink-soft">({s.sourceType})</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <button onClick={reset} className="mt-5 text-xs font-semibold text-accent underline underline-offset-2">
            Ask another question
          </button>
        </div>
      )}

      {phase === "insufficient" && result && (
        <div className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5">
          <p className="font-semibold text-primary-dark">This question needs a Pedaver response.</p>
          <p className="mt-2 text-sm text-ink-soft">{result.explanation}</p>
          <ReferralForm question={question} onDone={(referenceNumber, message) => { setReferenceInfo({ referenceNumber, message }); setPhase("referred"); }} />
        </div>
      )}

      {phase === "referred" && referenceInfo && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="font-semibold text-primary-dark">Your question has been referred to Pedaver.</p>
          <p className="mt-2 text-sm text-ink-soft">
            Reference: <span className="font-mono font-semibold text-ink">{referenceInfo.referenceNumber}</span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">Pedaver normally aims to respond within one week. Save this reference number to check back, or we'll message you if you gave contact details.</p>
          <button onClick={reset} className="mt-4 text-xs font-semibold text-accent underline underline-offset-2">
            Ask another question
          </button>
        </div>
      )}
    </div>
  );
}
