"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { askPqnk } from "@/lib/content/askPqnk";

type Msg = { from: "user" | "bot"; text: string };
type Labels = {
  chatWelcome: string;
  chatPlaceholder: string;
  chatSend: string;
  chatThinking: string;
  chatError: string;
  chatNewConversation: string;
};

const SESSION_KEY = "ask-pqnk-session";

function newSessionId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

// Inline formatting from the assistant: *bold* (WhatsApp style), **bold**, and bare URLs as links.
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(https?:\/\/[^\s)]+)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const url = m[1].replace(/[.,;:]+$/, "");
      const own = url.startsWith("https://pedaver.com");
      out.push(
        <a
          key={m.index}
          href={own ? url.replace("https://pedaver.com", "") || "/" : url}
          className="break-words font-semibold text-primary underline underline-offset-2"
          {...(own ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {url.replace(/^https?:\/\//, "")}
        </a>
      );
      last = m.index + url.length;
      re.lastIndex = last;
      continue;
    }
    out.push(<strong key={m.index}>{m[2] ?? m[3]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Formatted({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((raw, i) => {
        const line = raw.trim();
        if (!line) return <Fragment key={i} />;
        const bullet = /^[•\-–]\s+/.test(line);
        const numbered = /^\d+\.\s+/.test(line);
        if (bullet)
          return (
            <p key={i} className="pl-4 -indent-4">
              • {inline(line.replace(/^[•\-–]\s+/, ""))}
            </p>
          );
        return (
          <p key={i} className={numbered ? "pl-5 -indent-5" : undefined}>
            {inline(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function AskPqnkChat({ labels }: { labels: Labels }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = "";
    try {
      id = sessionStorage.getItem(SESSION_KEY) || "";
    } catch {}
    if (!id) {
      id = newSessionId();
      try {
        sessionStorage.setItem(SESSION_KEY, id);
      } catch {}
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || busy) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: q }]);
    setBusy(true);
    try {
      const res = await fetch(askPqnk.chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: sessionId || newSessionId(), chatInput: q }),
      });
      const data = await res.json();
      const answer = typeof data?.output === "string" && data.output.trim() ? data.output : null;
      setMessages((m) => [...m, { from: "bot", text: answer ?? labels.chatError }]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: labels.chatError }]);
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    const id = newSessionId();
    try {
      sessionStorage.setItem(SESSION_KEY, id);
    } catch {}
    setSessionId(id);
    setMessages([]);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between bg-primary-dark px-4 py-3 text-cream">
        <span className="font-semibold">Ask PQNK</span>
        {messages.length > 0 && (
          <button type="button" onClick={restart} className="text-xs text-cream/80 underline underline-offset-2 hover:text-cream">
            {labels.chatNewConversation}
          </button>
        )}
      </div>
      <div ref={listRef} className="h-[28rem] space-y-3 overflow-y-auto bg-cream/40 p-4 text-[15px] leading-relaxed" aria-live="polite">
        <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-ink shadow-sm">{labels.chatWelcome}</div>
        {messages.map((m, i) =>
          m.from === "user" ? (
            <div key={i} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-cream">
              {m.text}
            </div>
          ) : (
            <div key={i} className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-ink shadow-sm">
              <Formatted text={m.text} />
            </div>
          )
        )}
        {busy && (
          <div className="max-w-[90%] animate-pulse rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm italic text-ink-soft shadow-sm">
            {labels.chatThinking}
          </div>
        )}
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-border bg-white p-3">
        <label htmlFor="ask-pqnk-input" className="sr-only">
          {labels.chatPlaceholder}
        </label>
        <textarea
          id="ask-pqnk-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          rows={2}
          maxLength={1500}
          placeholder={labels.chatPlaceholder}
          className="min-w-0 flex-1 resize-none rounded-xl border border-border px-3 py-2 text-[15px] focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="self-end rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-primary-dark disabled:opacity-50"
        >
          {labels.chatSend}
        </button>
      </form>
    </div>
  );
}
