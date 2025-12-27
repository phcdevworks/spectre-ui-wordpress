import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TAG = "[spectre-ui-wordpress]";
const OUT_FILE = "spectre-ui.css";

// Prefer an import-free bundle for WP. Fall back only if safe.
const CANDIDATES = [
  "@phcdevworks/spectre-ui/dist/index.css",
  "@phcdevworks/spectre-ui/dist/spectre-ui.css",
  "@phcdevworks/spectre-ui/index.css",
];

// Robust detection of CSS imports (covers @import "x"; and @import url("x");)
function hasCssImports(css) {
  return /@import\s+(?:url\()?["'][^"']+["']\)?\s*;/i.test(css) || /@import\s+/i.test(css);
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveCssBundle() {
  const attempts = [];

  for (const spec of CANDIDATES) {
    try {
      const resolved = require.resolve(spec);
      const css = await fs.readFile(resolved, "utf8");

      // WP cannot resolve npm/package/relative @import statements at runtime.
      if (spec.endsWith("/index.css") && hasCssImports(css)) {
        attempts.push(`${spec} -> rejected (contains @import)`);
        continue;
      }

      attempts.push(`${spec} -> OK (${resolved})`);
      return { spec, resolved, attempts };
    } catch (err) {
      attempts.push(`${spec} -> not found (${err?.code ?? "ERR"})`);
    }
  }

  const msg =
    `${TAG} Could not find an import-free Spectre UI CSS bundle.\n` +
    `Expected @phcdevworks/spectre-ui to publish a compiled CSS file (e.g. dist/index.css).\n` +
    `Tried:\n- ${attempts.join("\n- ")}\n`;

  throw new Error(msg);
}

async function main() {
  const assetsDir = path.resolve(__dirname, "..", "assets");
  const destPath = path.join(assetsDir, OUT_FILE);

  try {
    const { spec, resolved, attempts } = await resolveCssBundle();

    await fs.mkdir(assetsDir, { recursive: true });

    // Copy file (atomic-ish write: copy to temp then rename)
    const tmpPath = destPath + ".tmp";
    await fs.copyFile(resolved, tmpPath);
    await fs.rename(tmpPath, destPath);

    // Post-check: ensure result is import-free (belt + suspenders)
    const outCss = await fs.readFile(destPath, "utf8");
    if (hasCssImports(outCss)) {
      throw new Error(
        `${TAG} Output CSS still contains @import. Source "${spec}" is not WP-safe.`
      );
    }

    // Helpful logs
    const stat = await fs.stat(destPath);
    console.log(`${TAG} Using: ${spec}`);
    console.log(`${TAG} Copied to: ${destPath} (${stat.size} bytes)`);
    // Uncomment for debugging:
    // console.log(`${TAG} Resolution attempts:\n- ${attempts.join("\n- ")}`);
  } catch (error) {
    console.error(`${TAG} Failed to sync Spectre UI CSS.`);
    console.error(error);
    // Cleanup tmp if present
    try {
      const tmpPath = path.join(assetsDir, OUT_FILE + ".tmp");
      if (await fileExists(tmpPath)) await fs.unlink(tmpPath);
    } catch {
      // ignore
    }
    process.exit(1);
  }
}

main();
