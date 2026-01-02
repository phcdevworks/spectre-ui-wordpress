# Contributing to Spectre UI WordPress

Thanks for helping improve Spectre UI WordPress! This plugin is a WordPress adapter that loads the Spectre UI CSS bundle into WordPress sites (frontend and block editor). It ensures WordPress users can leverage the Spectre Design System without manually managing CSS files or imports.

## Spectre Design System Non-Negotiables (Authoritative)

Spectre is a specification-driven design system with three strict layers. Keep these in mind for any contribution so responsibilities never blur.

### 1. @phcdevworks/spectre-tokens (Foundation, Source of Truth)

- Purpose: single source of truth for design values (colors, surfaces, text roles, space, radii, shadows, etc.).
- Exports: CSS variables (`--sp-*`), TypeScript token object, Tailwind-compatible theme mappings.
- Rules: tokens define meaning, not UI behavior; UI must never invent new colors; tokens may provide fallbacks but semantics live here.
- Status: v0.1.0 released with stable semantic roles (surface.*, text.*, component.*) and considered correct/locked.

### 2. @phcdevworks/spectre-ui (Framework-Agnostic UI Layer)

- Purpose: converts tokens into real CSS and class recipes.
- Ships: `index.css` (canonical CSS bundle: tokens + base + components + utilities), `base.css` (resets + globals), `components.css` (.sp-btn, .sp-card, .sp-input, etc.), `utilities.css` (.sp-stack, .sp-container, etc.).
- Provides recipes: `getButtonClasses`, `getCardClasses`, `getInputClasses`.
- Rules: UI must consume tokens, not redefine design values; literal values in CSS are fallbacks only; every CSS selector has a matching recipe where applicable; Tailwind preset is optional and non-authoritative.
- Status: v0.1.0 released, hardened and aligned to tokens (no badge or iconbox primitives yet).

### 3. @phcdevworks/spectre-ui-wordpress (WordPress Adapter)

- Purpose: thin WordPress plugin wrapper around spectre-ui; automatically syncs and enqueues the Spectre UI CSS bundle into WordPress frontend and block editor.
- Key mechanism: `sync-spectre-ui-css.mjs` resolves import-free CSS from `@phcdevworks/spectre-ui` at build time and copies it to `assets/spectre-ui.css`; PHP hooks enqueue that file via `wp_enqueue_scripts` and `enqueue_block_editor_assets`.
- Rules: WordPress never defines styles, never duplicates CSS, never loads tokens directly; plugin only synchronizes and loads CSS; all design values come from tokens, all CSS comes from spectre-ui.
- Status: v0.1.0 with basic frontend and editor integration; no custom blocks or PHP components yet.

### Known Gaps (Not Done Yet)

- Custom Gutenberg blocks (Button, Card, Input blocks) that output Spectre UI classes.
- PHP helper functions or shortcodes for generating Spectre-styled markup.
- Admin settings page for controlling which CSS bundles to load (full vs. components-only).

### What Needs to Happen Next

- Spectre UI WordPress: add Gutenberg block definitions (SpButton, SpCard, SpInput) that use Spectre UI classes and recipes; ensure blocks register correctly and output semantic HTML + correct classes.
- PHP helpers: optionally add utility functions (`spectre_button()`, `spectre_card()`) for classic theme/template usage.
- Settings/configuration: allow theme developers to opt into base-only, components-only, or full CSS bundles.

### Golden Rule (Non-Negotiable)

Tokens define meaning. UI defines structure. Adapters only translate. WordPress never invents CSS or design values—it only loads what spectre-ui provides. If it's a design token, it belongs in @phcdevworks/spectre-tokens. If it's a CSS class or style, it belongs in @phcdevworks/spectre-ui. If it's WordPress integration (hooks, blocks, PHP), it belongs here.

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/phcdevworks/spectre-ui-wordpress.git
cd spectre-ui-wordpress
```

2. Install dependencies:

```bash
npm install
```

3. Build the plugin (syncs CSS and compiles scripts):

```bash
npm run build
# or for development with watch mode:
npm run start
```

4. Link or copy the plugin to a local WordPress installation:

```bash
# Option 1: Symlink from wp-content/plugins/
ln -s /path/to/spectre-ui-wordpress /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress

# Option 2: Copy the plugin folder
cp -r /path/to/spectre-ui-wordpress /path/to/wordpress/wp-content/plugins/
```

5. Activate the plugin in the WordPress admin dashboard under Plugins.

## Project Structure

- `spectre-ui-wordpress.php` – Main plugin file; registers hooks to enqueue CSS on frontend and in block editor
- `assets/` – Synchronized CSS bundle from @phcdevworks/spectre-ui (generated, do not edit manually)
- `scripts/` – Build utilities (e.g., `sync-spectre-ui-css.mjs`) that resolve and copy the correct CSS bundle from spectre-ui
- `src/` – JavaScript entry for WordPress scripts (currently minimal; block registration would go here)
- `build/` – Compiled JavaScript output from `@wordpress/scripts` (generated, do not edit manually)

PHP developers can safely edit `spectre-ui-wordpress.php` to add hooks, shortcodes, or filters. JavaScript/block developers own `src/` for Gutenberg blocks. `scripts/` should only change when CSS resolution logic needs updates.

## Guidelines

### CSS Synchronization and WordPress Integration

1. **Never edit `assets/spectre-ui.css` manually** – Always sync from @phcdevworks/spectre-ui via `npm run build` or `npm run start`. The sync script ensures WordPress receives an import-free CSS bundle.
2. **No CSS in PHP or JavaScript** – All styles come from spectre-ui; this plugin only loads CSS, never defines it.
3. **Enqueue correctly** – Use `wp_enqueue_style()` with proper dependencies, versioning (filemtime for cache busting), and WordPress hooks (`wp_enqueue_scripts`, `enqueue_block_editor_assets`).
4. **Test in WordPress environments** – Verify CSS loads correctly in both classic themes and block themes, and that Gutenberg editor receives the same styles as the frontend.

### JavaScript & WordPress Scripts

- This plugin uses `@wordpress/scripts` for JavaScript bundling and follows WordPress JavaScript standards.
- Keep block registration code in `src/` and ensure blocks use Spectre UI classes (not inline styles).
- Run `npm run build` before testing blocks in WordPress to ensure compiled JavaScript is up to date.
- Follow WordPress block development best practices: use `registerBlockType`, proper attributes, and semantic HTML output.

### Documentation

- Update the plugin header in `spectre-ui-wordpress.php` if version, description, or features change.
- Document new blocks, shortcodes, or PHP helpers in README.md with usage examples.
- If WordPress integration patterns change (e.g., adding settings pages, custom post types), update relevant sections to reflect the new behavior.

## Pull Request Process

1. Branch from `main`.
2. Make your changes and test in a local WordPress installation (frontend + block editor).
3. Run `npm run build` to sync CSS and compile scripts; commit generated artifacts in `assets/` and `build/` when necessary.
4. Update documentation or code comments to reflect behavior changes.
5. Open a PR describing the motivation, changes, and any WordPress-specific testing notes (theme compatibility, block editor behavior, etc.).

## Questions?

Please open an issue or discussion on GitHub if you're unsure about the best approach for a change. Coordinating early avoids conflicts with WordPress core updates, theme compatibility issues, or diverging patterns across the Spectre Suite.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
