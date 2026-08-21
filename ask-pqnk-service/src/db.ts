// Persistence layer. Uses node:sqlite (built into Node 22+, no external
// dependency) — appropriate for V1's local-only scope per the standing
// instruction not to provision production infrastructure. A single file on
// disk; swapping to a managed Postgres later is a data-layer change only,
// nothing above this module needs to know.
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "ask-pqnk.sqlite");
export const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA journal_mode = WAL;

  -- Permanent Farmer Advisory knowledge (QA_KNOWLEDGE_SCHEMA.json shape).
  -- Never contains contact info — see referral_queue for that, kept
  -- structurally separate (PEDAVER_REFERRAL_WORKFLOW.md sec 13).
  CREATE TABLE IF NOT EXISTS farmer_advisory (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    canonical_question TEXT NOT NULL,
    farmer_language_wording TEXT NOT NULL DEFAULT '[]',
    field_context TEXT,
    question_cluster_id TEXT,
    short_answer TEXT NOT NULL,
    answer TEXT NOT NULL,
    practical_action TEXT,
    language TEXT NOT NULL,
    crops TEXT NOT NULL DEFAULT '[]',
    problems TEXT NOT NULL DEFAULT '[]',
    problem_family TEXT NOT NULL DEFAULT '[]',
    science_domains TEXT NOT NULL DEFAULT '[]',
    practices TEXT NOT NULL DEFAULT '[]',
    machinery TEXT NOT NULL DEFAULT '[]',
    geography TEXT,
    authority_status TEXT NOT NULL,
    evidence_type TEXT NOT NULL,
    publication_level TEXT NOT NULL DEFAULT 'Farmer Advisory Q&A',
    escalated_to TEXT,
    publication_status TEXT NOT NULL DEFAULT 'Internal',
    advisory_reference TEXT,
    supersedes_or_clarifies TEXT NOT NULL DEFAULT '[]',
    sources TEXT NOT NULL DEFAULT '[]',
    approved_by TEXT,
    approved_date TEXT,
    related_media TEXT NOT NULL DEFAULT '[]',
    related_papers TEXT NOT NULL DEFAULT '[]',
    related_science TEXT NOT NULL DEFAULT '[]',
    related_farmer_advisories TEXT NOT NULL DEFAULT '[]',
    origin_question_modality TEXT NOT NULL DEFAULT 'Text',
    version INTEGER NOT NULL DEFAULT 1,
    superseded_by TEXT,
    origin_queue_id TEXT,
    -- Self-contained provenance: the human-facing PQNK-Q-XXXXXXXX reference
    -- number this record originated from, stored directly here (not only
    -- reachable via a join through origin_queue_id -> referral_queue) so
    -- the record's provenance survives even if the queue entry is ever
    -- archived. ASK_PQNK_ARCHITECTURE.md sec 19.
    origin_reference_number TEXT,
    repeat_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS question_cluster (
    id TEXT PRIMARY KEY,
    canonical_question TEXT NOT NULL,
    variant_questions TEXT NOT NULL DEFAULT '[]',
    repeat_count INTEGER NOT NULL DEFAULT 1,
    languages_observed TEXT NOT NULL DEFAULT '[]',
    crops_observed TEXT NOT NULL DEFAULT '[]',
    regions_observed TEXT NOT NULL DEFAULT '[]',
    first_asked TEXT NOT NULL,
    last_asked TEXT NOT NULL,
    answer_coverage TEXT NOT NULL DEFAULT 'Unanswered',
    knowledge_gap_status TEXT NOT NULL DEFAULT 'Open Gap',
    resolved_by_record_id TEXT
  );

  -- Internal only. Contact info lives ONLY here, never in farmer_advisory.
  CREATE TABLE IF NOT EXISTS referral_queue (
    id TEXT PRIMARY KEY,
    reference_number TEXT NOT NULL UNIQUE,
    original_question TEXT NOT NULL,
    question_modality TEXT NOT NULL DEFAULT 'Text',
    language TEXT,
    canonical_question TEXT,
    submitted_context TEXT NOT NULL DEFAULT '{}',
    contact TEXT NOT NULL DEFAULT '{}',
    date TEXT NOT NULL,
    due_by TEXT NOT NULL,
    taxonomy_classification TEXT NOT NULL DEFAULT '{}',
    cluster_id TEXT,
    retrieval_attempt TEXT NOT NULL DEFAULT '{}',
    sources_already_found TEXT NOT NULL DEFAULT '[]',
    referral_reason TEXT,
    response_status TEXT NOT NULL DEFAULT 'New',
    pedaver_answer TEXT,
    reviewer TEXT,
    publication_decision TEXT,
    advisory_record_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_advisory_status ON farmer_advisory(publication_status);
  CREATE INDEX IF NOT EXISTS idx_queue_status ON referral_queue(response_status);
  CREATE INDEX IF NOT EXISTS idx_queue_cluster ON referral_queue(cluster_id);
`);

export function nowIso(): string {
  return new Date().toISOString();
}
