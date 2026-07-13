import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const sourceDirectory = join(root, "src");
const limit = Number.parseInt(process.env.BACKEND_LINE_LIMIT ?? "1500", 10);

async function listTypeScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listTypeScriptFiles(path)));
    if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
  }

  return files;
}

const files = await listTypeScriptFiles(sourceDirectory);
let total = 0;

for (const file of files.sort()) {
  const contents = await readFile(file, "utf8");
  const lines = contents === "" ? 0 : contents.split("\n").length;
  total += lines;
  console.log(`${relative(root, file)}: ${lines}`);
}

console.log(`\nBackend: ${total.toLocaleString()} / ${limit.toLocaleString()} lines`);
console.log(`Status: ${total <= limit ? "NOT OVERENGINEERED" : "COMPLIANCE INCIDENT"}`);

if (total > limit) process.exitCode = 1;
