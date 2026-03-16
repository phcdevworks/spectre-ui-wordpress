# Spectre Agent Instructions: @phcdevworks/spectre-ui-wordpress

### **The WordPress Adapter (Layer 3 of the Spectre 8-Layer Arsenal)**

You are an autonomous agent responsible for Layer 3 of the Spectre 8-Layer Arsenal. This package is the **WordPress Adapter**. Your mission is to provide safe, predictable delivery of Spectre UI styles into the WordPress environment.

## The Golden Rule of Translation
**Adapters only translate; they never define.** You are strictly legacy-forbidden from defining CSS rules, inventing design tokens, or creating UI components in this package. Your sole responsibility is to sync the compiled CSS from Layer 2 and ensure it is correctly enqueued in WordPress.

## Core Directives
1. **The Sync Pipeline:** Maintain the `scripts/sync-spectre-ui-css.mjs` pipeline. This is the only way CSS enters this package. Never hand-edit `assets/spectre-ui.css`.
2. **Zero-Node Runtime:** Ensure that the final plugin requires zero Node.js dependencies at runtime. All assets must be pre-compiled and bundled for direct consumption by WordPress.
3. **Frontend Only:** Enforce the boundary of the frontend. Do not enqueue Spectre UI in the WordPress admin or Gutenberg editor unless explicitly requested and scoped to avoid conflicts with the WP UI.
4. **Cache Enforcement:** Use `filemtime()` in `wp_enqueue_style` to ensure that asset updates are instantly reflected for users without manual cache-busting.

## Implementation Guardrails
* **AHA Programming:** Keep the PHP loader simple. Avoid complex framework abstractions inside the WordPress plugin. It should be a thin bridge.
* **No Style Duplication:** If you find yourself writing a class name or a CSS rule that isn't part of the sync process, you are violating the architecture.
* **Strict Versioning:** Ensure the CSS bundle being synced matches a stable release of `@phcdevworks/spectre-ui`.

## Testing & Validation Strategy
1. **Sync Integrity:** Verify that the sync script correctly fetches the CSS and that the resulting file is valid and import-free.
2. **Enqueuing Accuracy:** Test in a standard WordPress installation that the CSS is correctly loaded on the frontend via `wp_enqueue_scripts`.
3. **Collision Check:** Verify that Spectre UI classes do not accidentally break standard WordPress core elements or common plugins.
4. **Build Verification:** Ensure that the `npm run build` command correctly prepares the plugin for distribution.

## Workflow
1. **Reference Sync:** Check `@phcdevworks/spectre-ui` for new releases.
2. **Run Build:** Execute `npm run build` to sync the latest CSS bundle.
3. **Inspect Artifacts:** Verify `assets/spectre-ui.css` contains the expected classes from Layer 2.
4. **Verify Plugin Loader:** Ensure `spectre-ui-wordpress.php` correctly references the latest assets.
