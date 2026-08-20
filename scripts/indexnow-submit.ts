/**
 * Isolated IndexNow submission tool. Deliberately manual — V1 has no
 * automatic per-deploy triggering (see the IndexNow audit report). Run by
 * hand, after confirming a deploy succeeded, when there's a genuine batch of
 * new/updated/removed URLs worth notifying participating engines about.
 *
 * Usage:
 *   tsx scripts/indexnow-submit.ts --dry-run
 *   tsx scripts/indexnow-submit.ts --dry-run --urls-file scripts/indexnow-first-activation-urls.ts
 *   tsx scripts/indexnow-submit.ts                 # live submission
 *   tsx scripts/indexnow-submit.ts --batch-size 2   # force multiple batches, for testing
 *
 * Key: the IndexNow key is intentionally public (the protocol requires it be
 * readable at the site root), so there is no secret to manage. It is read
 * directly from the single committed "<hex>.txt" file under public/ — that
 * file is the source of truth for both the key value and its public
 * location. No environment variable or GitHub secret is involved.
 *
 * Fails clearly if that file is missing, ambiguous, or malformed.
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "pedaver.com"; // locked per approved decision — do not infer from argv
const ENDPOINT = "https://api.indexnow.org/indexnow";
const PUBLIC_DIR = join(process.cwd(), "public");
const LOG_DIR = join(process.cwd(), "scripts", "indexnow-logs");
const KEY_FILENAME_RE = /^[a-f0-9]{8,128}\.txt$/i;

interface Args {
  dryRun: boolean;
  batchSize: number;
  urlsFile: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    dryRun: false,
    batchSize: 10_000, // IndexNow's documented per-request maximum
    urlsFile: "scripts/indexnow-first-activation-urls.ts",
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--batch-size") args.batchSize = Number(argv[++i]);
    else if (arg === "--urls-file") args.urlsFile = argv[++i];
    else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }
  if (!Number.isInteger(args.batchSize) || args.batchSize < 1) {
    console.error("--batch-size must be a positive integer");
    process.exit(1);
  }
  return args;
}

function resolveKey(): { key: string; keyLocation: string } {
  const candidates = readdirSync(PUBLIC_DIR).filter((f) => KEY_FILENAME_RE.test(f));
  if (candidates.length === 0) {
    throw new Error("No IndexNow key found. Expected a committed key file at public/<key>.txt.");
  }
  if (candidates.length > 1) {
    throw new Error(
      `Multiple candidate key files found in public/ (${candidates.join(", ")}) — ambiguous. ` +
        "Only one <hex>.txt key file should exist at the public root."
    );
  }

  const filename = candidates[0];
  const key = filename.replace(/\.txt$/i, "");
  const fileContent = readFileSync(join(PUBLIC_DIR, filename), "utf8").trim();
  if (fileContent !== key) {
    throw new Error(
      `public/${filename}'s content ("${fileContent}") does not match its filename-derived key ("${key}"). ` +
        "The key file must contain exactly the key."
    );
  }
  return { key, keyLocation: `https://${HOST}/${filename}` };
}

function validateAndDedupe(urls: string[]): { valid: string[]; errors: string[]; duplicates: string[] } {
  const errors: string[] = [];
  const seen = new Set<string>();
  const duplicates: string[] = [];
  const valid: string[] = [];

  for (const raw of urls) {
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      errors.push(`Not a valid URL: ${raw}`);
      continue;
    }
    if (parsed.protocol !== "https:") {
      errors.push(`Not HTTPS: ${raw}`);
      continue;
    }
    if (parsed.hostname !== HOST) {
      errors.push(`Host is "${parsed.hostname}", expected locked host "${HOST}": ${raw}`);
      continue;
    }
    if (seen.has(raw)) {
      duplicates.push(raw);
      continue;
    }
    seen.add(raw);
    valid.push(raw);
  }

  return { valid, errors, duplicates };
}

function batch<T>(items: T[], size: number): T[][] {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size));
  }
  return batches;
}

function redactKey(payload: Record<string, unknown>): Record<string, unknown> {
  return { ...payload, key: "<INDEXNOW_KEY REDACTED>" };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const { key, keyLocation } = resolveKey();
  console.log(`Host:         ${HOST}`);
  console.log(`Key location: ${keyLocation}`);
  console.log(`Endpoint:     ${ENDPOINT}`);
  console.log(`Mode:         ${args.dryRun ? "DRY RUN (no network calls)" : "LIVE"}`);
  console.log("");

  const urlsModule = await import(join(process.cwd(), args.urlsFile));
  const rawUrls: string[] = urlsModule.FIRST_ACTIVATION_URLS ?? urlsModule.default;
  if (!Array.isArray(rawUrls)) {
    throw new Error(`${args.urlsFile} did not export an array of URLs (FIRST_ACTIVATION_URLS or default).`);
  }

  const { valid, errors, duplicates } = validateAndDedupe(rawUrls);

  console.log(`Input URLs:      ${rawUrls.length}`);
  console.log(`Valid & unique:  ${valid.length}`);
  console.log(`Duplicates skipped: ${duplicates.length}`);
  console.log(`Validation errors:  ${errors.length}`);
  if (errors.length > 0) {
    console.log("\nValidation errors:");
    for (const e of errors) console.log(`  - ${e}`);
  }
  if (duplicates.length > 0) {
    console.log("\nDuplicates skipped:");
    for (const d of duplicates) console.log(`  - ${d}`);
  }

  if (valid.length === 0) {
    console.log("\nNo valid URLs to submit. Exiting.");
    return;
  }

  const batches = batch(valid, args.batchSize);
  console.log(`\nBatches: ${batches.length} (batch size ${args.batchSize})`);

  mkdirSync(LOG_DIR, { recursive: true });
  const runLog: Record<string, unknown>[] = [];
  let anyFailure = false;

  for (const [i, urlList] of batches.entries()) {
    const payload = { host: HOST, key, keyLocation, urlList };
    console.log(`\n--- Batch ${i + 1}/${batches.length} (${urlList.length} URLs) ---`);
    console.log(JSON.stringify(redactKey(payload), null, 2).slice(0, 1200));

    if (args.dryRun) {
      runLog.push({ batch: i + 1, mode: "dry-run", urlCount: urlList.length, payload });
      continue;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const bodyText = await res.text();
      const ok = res.status === 200 || res.status === 202;
      console.log(`Response: ${res.status} ${res.statusText}${ok ? "" : "  <-- FAILURE"}`);
      if (!ok) anyFailure = true;
      runLog.push({
        batch: i + 1,
        mode: "live",
        urlCount: urlList.length,
        status: res.status,
        ok,
        responseBody: bodyText.slice(0, 500),
      });
    } catch (err) {
      anyFailure = true;
      console.log(`Request failed: ${(err as Error).message}`);
      runLog.push({
        batch: i + 1,
        mode: "live",
        urlCount: urlList.length,
        error: (err as Error).message,
      });
    }
  }

  const logPath = join(LOG_DIR, `${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(
    logPath,
    JSON.stringify(
      { host: HOST, keyLocation, endpoint: ENDPOINT, dryRun: args.dryRun, batches: runLog },
      null,
      2
    )
  );
  console.log(`\nLog written: ${logPath}`);

  if (!args.dryRun && anyFailure) {
    // Non-zero exit so a human running this locally sees failure clearly.
    // If/when this is wired into CI, that step must use continue-on-error
    // (or equivalent) so this never fails the deployment job itself —
    // IndexNow failures must never block or roll back a successful deploy.
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exitCode = 1;
});
