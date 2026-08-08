import { writeFileSync, mkdirSync } from "fs";
import { advisoryNotes } from "../src/lib/content/advisory";

mkdirSync("public/advisory", { recursive: true });
writeFileSync("public/advisory/manifest.json", JSON.stringify({ notes: advisoryNotes }, null, 2));
console.log(`Generated public/advisory/manifest.json with ${advisoryNotes.length} note(s)`);
