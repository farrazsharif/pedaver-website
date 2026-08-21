// High-entropy public reference number — the bearer credential for the
// unauthenticated status-lookup endpoint (PEDAVER_REFERRAL_WORKFLOW.md
// sec 10a). Deliberately not a sequential ticket ID: sequential numbers
// are enumerable, letting anyone walk /api/status/PQNK-Q-000001,
// PQNK-Q-000002, ... and read other farmers' case statuses.
import { randomBytes } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — avoids
// misread-over-WhatsApp ambiguity, still ~5 bits/char of entropy.

export function generateReferenceNumber(): string {
  const bytes = randomBytes(8);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  // 8 chars from a 33-symbol alphabet ~= 40 bits of entropy — impractical
  // to guess or enumerate, short enough to read aloud or type from memory.
  return `PQNK-Q-${code}`;
}
