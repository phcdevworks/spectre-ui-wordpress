# Contributing to Spectre UI WordPress

Thanks for helping improve Spectre UI WordPress! This plugin is a WordPress adapter that loads the Spectre UI CSS bundle into WordPress sites (frontend and block editor). It ensures WordPress users can leverage the Spectre Design System without manually managing CSS files or imports.

## Spectre Design Philosophy

Spectre is a **specification-driven design system** built on three strict layers:

### 1. @phcdevworks/spectre-tokens (Foundation)

**Purpose**: Single source of truth for design values (colors, surfaces, text roles, space, radii, shadows, etc.)

**Exports**: CSS variables (`--sp-*`), TypeScript token object, Tailwind-compatible theme mappings

**Rules**:
- Tokens define semantic meaning, not UI behavior
- UI must never invent new colors or values
- Designers own `tokens/*.json`; engineers maintain `src/` transforms
- Contrast targets and accessibility constraints are encoded at the token level

**Status**: v0.1.0 released with stable semantic roles (`surface.*`, `text.*`, `component.*`) and considered correct/locked

### 2. @phcdevworks/spectre-ui (Framework-Agnostic UI Layer)

**Purpose**: Converts tokens into real CSS and class recipes

**Ships**:
- `index.css` (canonical CSS bundle: tokens + base + components + utilities)
- `base.css` (resets + globals)
- `components.css` (`.sp-btn`, `.sp-card`, `.sp-input`, etc.)
- `utilities.css` (`.sp-stack`, `.sp-container`, etc.)
- Type-safe recipes: `getButtonClasses`, `getCardClasses`, `getInputClasses`

**Rules**:
- UI must consume tokens, not redefine design values
- Literal values in CSS are fallbacks only
- Every CSS selector has a matching recipe where applicable
- Tailwind preset is optional and non-authoritative

**Status**: v0.1.0 released, hardened and aligned to tokens

### 3. @phcdevworks/spectre-ui-wordpress (WordPress Adapter)

**Purpose**: Thin WordPress plugin wrapper around spectre-ui; automatically syncs and enqueues the Spectre UI CSS bundle

**Key mechanism**:
- `sync-spectre-ui-css.mjs` resolves import-free CSS from `@phcdevworks/spectre-ui` at build time
- Copies to `assets/spectre-ui.css`
- PHP hooks enqueue via `wp_enqueue_scripts` and `enqueue_block_editor_assets`

**Rules**:
- WordPress never defines styles, never duplicates CSS, never loads tokens directly
- Plugin only synchronizes and loads CSS
- All design values come from tokens, all CSS comes from spectre-ui

**Status**: v0.1.0 with basic frontend and editor integration

### Golden Rule (Non-Negotiable)

**Tokens define meaning. UI defines structure. Adapters only translate.**

WordPress never invents CSS or design values—it only loads what spectre-ui provides.

- If it's a design token → belongs in `@phcdevworks/spectre-tokens`
- If it's a CSS class or style → belongs in `@phcdevworks/spectre-ui`
- If it's WordPress integration (hooks, blocks, PHP) → belongs here

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
ln -s $(pwd) /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress

# Option 2: Copy the plugin folder
cp -r . /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress
```

5. Activate the plugin in the WordPress admin dashboard under Plugins

## Project Structure

```
spectre-ui-wordpress/
├── spectre-ui-wordpress.php     # Main plugin file; registers hooks
├── assets/
│   └── spectre-ui.css           # Synchronized CSS from @phcdevworks/spectre-ui (generated)
├── scripts/
│   └── sync-spectre-ui-css.mjs  # CSS sync pipeline
├── src/
│   └── index.js                 # JavaScript entry for WordPress scripts
├── build/
│   └── index.js                 # Compiled JavaScript (generated)
└── package.json
```

**Responsibilities**:
- **PHP developers**: Edit `spectre-ui-wordpress.php` to add hooks, shortcodes, or filters
- **JavaScript/block developers**: Own `src/` for Gutenberg blocks
- **Build engineers**: Update `scripts/` when CSS resolution logic changes

## Contribution Guidelines

### CSS Synchronization and WordPress Integration

1. **Never edit `assets/spectre-ui.css` manually** – Always sync from `@phcdevworks/spectre-ui` via `npm run build` or `npm run start`
2. **No CSS in PHP or JavaScript** – All styles come from spectre-ui; this plugin only loads CSS, never defines it
3. **Enqueue correctly** – Use `wp_enqueue_style()` with proper dependencies, versioning (`filemtime` for cache busting), and WordPress hooks
4. **Test in WordPress environments** – Verify CSS loads correctly in both classic themes and block themes, and that Gutenberg editor receives the same styles as the frontend

### JavaScript & WordPress Scripts

- This plugin uses `@wordpress/scripts` for JavaScript bundling
- Keep block registration code in `src/` and ensure blocks use Spectre UI classes (not inline styles)
- Run `npm run build` before testing blocks in WordPress
- Follow WordPress block development best practices: use `registerBlockType`, proper attributes, and semantic HTML output

### Code Quality

- Follow WordPress coding standards for PHP
- Follow WordPress JavaScript standards
- Add JSDoc comments for functions
- Write clear commit messages
- Test changes in multiple WordPress themes (classic and block themes)

### Documentation

- Update the plugin header in `spectre-ui-wordpress.php` if version, description, or features change
- Document new blocks, shortcodes, or PHP helpers in README.md with usage examples
- Include inline code comments for complex logic
- Update this CONTRIBUTING.md if development workflows change

## Pull Request Process

1. **Branch from `main`**
2. **Make your changes** and test in a local WordPress installation (frontend + block editor)
3. **Run `npm run build`** to sync CSS and compile scripts
4. **Commit generated artifacts** in `assets/` and `build/` when necessary
5. **Update documentation** or code comments to reflect behavior changes
6. **Open a PR** describing:
   - The motivation for the change
   - What was changed
   - WordPress-specific testing notes (theme compatibility, block editor behavior, etc.)
7. **Respond to feedback** and make requested changes

## Known Gaps (Not Done Yet)

- Custom Gutenberg blocks (Button, Card, Input blocks) that output Spectre UI classes
- PHP helper functions or shortcodes for generating Spectre-styled markup
- Admin settings page for controlling which CSS bundles to load (full vs. components-only)

## Questions or Issues?

Please open an issue or discussion on GitHub if you're unsure about the best approach for a change. Coordinating early avoids conflicts with:
- WordPress core updates
- Theme compatibility issues
- Diverging patterns across the Spectre Suite

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
