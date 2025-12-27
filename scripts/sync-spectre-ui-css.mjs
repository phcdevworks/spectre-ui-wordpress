import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resolveCss() {
  const candidates = [
    "@phcdevworks/spectre-ui/dist/index.css",
    "@phcdevworks/spectre-ui/index.css",
  ];

  for (const spec of candidates) {
    try {
      const p = require.resolve(spec);
      const css = await fs.readFile(p, "utf8");
      if (spec.endsWith("/index.css") && css.includes("@import")) {
        // Not portable for WP
        continue;
      }
      return p;
    } catch {
      // try next
    }
  }

  throw new Error(
    "Could not find an import-free Spectre UI CSS bundle. Ensure @phcdevworks/spectre-ui publishes dist/index.css."
  );
}

async function main() {
  try {
    const sourcePath = await resolveCss();
    const assetsDir = path.resolve(__dirname, "..", "assets");
    const destPath = path.join(assetsDir, "spectre-ui.css");

    await fs.mkdir(assetsDir, { recursive: true });
    await fs.copyFile(sourcePath, destPath);

    console.log(`[spectre-ui-wordpress] Copied Spectre UI CSS to ${destPath}`);
  } catch (error) {
    console.error("[spectre-ui-wordpress] Failed to copy Spectre UI CSS:");
    console.error(error);
    process.exit(1);
  }
}

main();
