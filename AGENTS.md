# ⚓ 3. The WordPress Bridge (Layer 3)
### **The WordPress Adapter (Layer 3 of the Spectre 8-Layer Arsenal)**

You are an autonomous agent responsible for Layer 3 (WordPress) of the Spectre 8-Layer Arsenal. This package is the **WordPress Adapter**. Your mission is to provide safe, predictable delivery of Spectre UI styles into the WordPress environment.

## The Golden Rule of Translation
**Adapters only translate; they never define.** You are strictly legacy-forbidden from defining CSS rules, inventing design tokens, or creating UI components in this package. Your sole responsibility is to sync the compiled CSS from Layer 2 and ensure it is correctly enqueued in WordPress.

## Core Directives (Antigravity/Google Best Practices)
1. **The Sync Pipeline**: Maintain the `scripts/sync-spectre-ui-css.mjs` pipeline. This is the only way CSS enters this package. Never hand-edit `assets/spectre-ui.css`.
2. **Zero-Node Runtime**: Ensure that the final plugin requires zero Node.js dependencies at runtime. All assets must be pre-compiled and bundled for direct consumption by WordPress.
3. **Frontend Only**: Enforce the boundary of the frontend. Do not enqueue Spectre UI in the WordPress admin or Gutenberg editor unless explicitly requested and scoped.
4. **Cache Enforcement**: Use `filemtime()` in `wp_enqueue_style` for instant asset updates without manual cache-busting.
5. **AHA Programming**: Keep the PHP loader simple. Avoid complex framework abstractions inside the WordPress plugin.

## Implementation Guardrails
- **Strict Versioning**: Ensure the CSS bundle being synced matches a stable release of `@phcdevworks/spectre-ui`.
- **Fail Fast**: If the sync fails or the Layer 2 bundle is invalid, output a 🛑 CONSTRAINT TRIGGERED block for Layer 2.

## Testing & Validation Strategy
1. **Sync Integrity**: Verify that the sync script correctly fetches the CSS and that the resulting file is valid and import-free.
2. **Enqueuing Accuracy**: Test that the CSS is correctly loaded on the WP frontend via `wp_enqueue_scripts`.
3. **Collision Check**: Verify that Spectre UI classes do not accidentally break standard WordPress core elements or common plugins.

## Workflow
1. READ: `skills/ai-implementation/SKILL.md` -> LAYER 3: PENDING SYNC UPDATES (WP).
2. Execute `npm run build` to sync the latest CSS bundle. (sync-spectre-ui-css.mjs)
3. Verify `spectre-ui-wordpress.php` correctly references the latest assets.
4. SUCCESS: Clear the "PENDING" block in `SKILL.md` when done.
