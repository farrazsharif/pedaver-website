// Thin client for the separate Ask PQNK backend service
// (ask-pqnk-service/, not part of this static export — see
// ASK_PQNK_V1_IMPLEMENTATION_SPEC.md sec 8). The base URL is a public env
// var since this is called from the browser.
const API_BASE = process.env.NEXT_PUBLIC_ASK_PQNK_API_URL ?? "http://localhost:4001";

export interface AskSource {
  sourceType: string;
  reference: string;
  title: string;
  authorityStatus: string;
}

export interface AskResponse {
  sufficient: boolean;
  language: string;
  shortAnswer?: string;
  answer?: string;
  practicalAction?: string;
  sources?: AskSource[];
  referralReason?: string;
  explanation?: string;
}

export async function askPqnk(question: string): Promise<AskResponse> {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Ask PQNK request failed (${res.status})`);
  return res.json();
}

export interface ReferralInput {
  question: string;
  crop?: string;
  region?: string;
  fieldCondition?: string;
  additionalExplanation?: string;
  name?: string;
  whatsapp?: string;
  email?: string;
}

export interface ReferralResponse {
  referenceNumber: string;
  dueBy: string;
  message: string;
}

export async function referToPedaver(input: ReferralInput): Promise<ReferralResponse> {
  const res = await fetch(`${API_BASE}/api/refer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Referral request failed (${res.status})`);
  return res.json();
}

export interface ReferralStatus {
  referenceNumber: string;
  status: string;
  advisoryId: string | null;
  advisoryUrl: string | null;
}

export async function lookupReference(referenceNumber: string): Promise<ReferralStatus> {
  const res = await fetch(`${API_BASE}/api/status/${encodeURIComponent(referenceNumber)}`);
  if (!res.ok) throw new Error("Reference number not found.");
  return res.json();
}

export interface AdvisoryListItem {
  id: string;
  canonical_question: string;
  short_answer: string;
  crops: string; // json
  problems: string; // json
  science_domains: string; // json
  language: string;
  approved_date: string;
}

export async function fetchAdvisories(): Promise<AdvisoryListItem[]> {
  const res = await fetch(`${API_BASE}/api/advisory`);
  if (!res.ok) throw new Error("Could not load Farmer Advisory records.");
  const data = await res.json();
  return data.records;
}

export function advisoryApiBase(): string {
  return API_BASE;
}
