#!/usr/bin/env node
/**
 * Clone a site variant into a new, completely standalone one.
 *
 *   pnpm new-site <new-name> [source=v1]
 *   e.g. pnpm new-site v2
 *
 * Copies sites/<source> → sites/<new-name> (minus build artifacts and
 * node_modules), renames the package to site-<new-name>, and prints the
 * follow-up commands. Each variant is its own Next.js app — edit it freely
 * without touching the others.
 */
import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, sep } from "path";

const [, , name, source = "v1"] = process.argv;

if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error("usage: pnpm new-site <new-name> [source=v1]   (lowercase letters, digits, dashes)");
  process.exit(1);
}

const src = join("sites", source);
const dest = join("sites", name);
if (!existsSync(src)) {
  console.error(`source ${src} does not exist`);
  process.exit(1);
}
if (existsSync(dest)) {
  console.error(`${dest} already exists`);
  process.exit(1);
}

const SKIP = new Set(["node_modules", ".next", "out"]);
cpSync(src, dest, {
  recursive: true,
  filter: (p) => !p.split(sep).some((seg) => SKIP.has(seg)) && !p.endsWith(".tsbuildinfo"),
});

const pkgPath = join(dest, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.name = `site-${name}`;
pkg.description = `Signapps smart-home marketing site, variant ${name} — Next.js (static export), Slovenian.`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`created ${dest} (package ${pkg.name}) from ${src}`);
console.log(`next steps:`);
console.log(`  pnpm install                       # register the new workspace package`);
console.log(`  pnpm --filter site-${name} dev     # run it (use -p 3001 for a second port)`);
