# @phcdevworks/spectre-ui-wordpress

### **The WordPress Adapter (Layer 3 of the Spectre 8-Layer Arsenal)**

`@phcdevworks/spectre-ui-wordpress` is the official WordPress adapter for the Spectre design system. It handles the safe and predictable delivery of Spectre UI logic and styles into the WordPress environment.

> 📋 **[View Roadmap](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/ROADMAP.md)** | 🤝 **[Contributing Guide](CONTRIBUTING.md)** | 📝 **[Changelog](CHANGELOG.md)** | 🏛️ **[Spectre Arsenal](https://github.com/phcdevworks)**

---

## 🏗️ Core Architecture

This package operates as a pure **Adapter Layer**. It enqueues the compiled Spectre UI CSS on the frontend, making the entire arsenal of classes and utilities available to themes and plugins without a Node runtime.

- 🔌 **Zero-Node Runtime**: Designed to work within standard WordPress constraints.
- 📦 **Import-Free Bundle**: Delivers a pre-compiled CSS bundle optimized for the browser.
- 🔄 **Build-Time Sync**: Automated pipeline to sync styles from `@phcdevworks/spectre-ui`.
- ⚡ **Frontend Focused**: Intentionally lightweight, focusing on delivery rather than definition.

---

This plugin loads the compiled Spectre UI CSS on the frontend only, making Spectre's tokens, components, and utilities available to WordPress themes, templates, and companion plugins — without requiring Node tooling or runtime build steps in WordPress.

**This plugin does not define blocks, editor styles, or design logic.**
It exists solely to bridge WordPress with [@phcdevworks/spectre-ui](https://github.com/phcdevworks/spectre-ui) in a safe, predictable way.

### What This Plugin Does

- ✅ Loads a compiled, import-free Spectre UI CSS bundle on the frontend
- ✅ Uses the canonical styles from `@phcdevworks/spectre-ui`
- ✅ Follows WordPress runtime constraints (no Node, no `@import`)
- ✅ Cache-busted via `filemtime()`
- ✅ Provides a stable foundation for Spectre-powered themes and plugins

### What This Plugin Does NOT Do

- ❌ Does not style the WordPress admin UI
- ❌ Does not style the Gutenberg editor
- ❌ Does not provide blocks (see Spectre UI Blocks)
- ❌ Does not define or override design values
- ❌ Does not run Tailwind or PostCSS in WordPress
- ❌ Does not load fonts

**This separation is intentional and enforced.**

## Installation

### Manual Installation (Development)

1. Clone the repository:

```bash
git clone https://github.com/phcdevworks/spectre-ui-wordpress.git
cd spectre-ui-wordpress
```

2. Install dependencies and build assets:

```bash
npm install
npm run build
```

3. Symlink or copy into WordPress:

```bash
ln -s $(pwd) /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress
# or
cp -r . /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress
```

4. Activate **Spectre UI WordPress** in WP Admin → Plugins

## Usage

### Frontend Styling

Once activated, the plugin automatically enqueues:

**`assets/spectre-ui.css`**
Frontend only via `wp_enqueue_scripts`

All Spectre UI classes are now available in:

- theme templates
- custom PHP markup
- custom blocks
- page builder output

### Example (Theme Template)

```php
<article class="sp-card sp-card--elevated">
  <h1><?php the_title(); ?></h1>

  <div class="sp-stack sp-stack--md">
    <?php the_content(); ?>
  </div>

  <a href="<?php echo esc_url( home_url() ); ?>" class="sp-btn sp-btn--primary">
    Back to Home
  </a>
</article>
```

## CSS Availability

All Spectre UI classes are available once the plugin is active, including:

### Buttons

```html
<button class="sp-btn sp-btn--primary">Primary</button>
<button class="sp-btn sp-btn--secondary">Secondary</button>
<button class="sp-btn sp-btn--ghost">Ghost</button>
```

### Cards

```html
<div class="sp-card sp-card--elevated">Elevated</div>
<div class="sp-card sp-card--outline">Outline</div>
<div class="sp-card sp-card--ghost">Ghost</div>
```

### Utilities

```html
<div class="sp-stack sp-stack--md"></div>
<div class="sp-container"></div>
```

## Development Notes

### Build Pipeline

The plugin includes a build-time sync script that:

1. Resolves the compiled CSS bundle from `@phcdevworks/spectre-ui`
2. Verifies it is import-free
3. Copies it to `assets/spectre-ui.css`

```bash
npm run build
```

**WordPress never runs build steps at runtime.**
All generated assets are committed for distribution.

### Project Structure

```
spectre-ui-wordpress/
├── spectre-ui-wordpress.php     # Plugin loader
├── assets/
│   └── spectre-ui.css           # Compiled Spectre CSS (generated)
├── build/
│   └── index.js                 # JS build artifact (generated)
├── scripts/
│   └── sync-spectre-ui-css.mjs  # CSS sync pipeline
├── src/
│   └── index.js                 # Minimal JS entry
└── package.json
```

## Spectre Design Philosophy

Spectre is a **specification-driven design system** built on three fundamental principles:

### 1. Single Source of Truth

Design values flow from one place: `@phcdevworks/spectre-tokens`. Colors, spacing, typography, shadows, and semantic roles are defined once in JSON, then consumed everywhere. No downstream package invents values.

### 2. Separation of Concerns

- **Tokens** define _meaning_ (what is `brand-500`? what is `surface.card`?)
- **UI** defines _structure_ (how does `.sp-btn` work? what CSS makes a card?)
- **Adapters** translate without duplicating (WordPress loads CSS; it never rewrites design)

### 3. Framework Agnostic

Spectre's core (`tokens` + `ui`) runs anywhere CSS and JavaScript run. Adapters (WordPress, Astro, 11ty) bridge runtimes without locking teams into frameworks.

## Core Rules

### For Tokens (@phcdevworks/spectre-tokens)

- Tokens define **semantic meaning**, not UI behavior
- Output formats: CSS variables (`--sp-*`), JS objects, Tailwind theme
- Designers own `tokens/*.json`; engineers maintain `src/` transforms
- Contrast targets and accessibility constraints are encoded at the token level

### For UI (@phcdevworks/spectre-ui)

- UI **consumes tokens**, never redefines design values
- Ships: compiled CSS (`base`, `components`, `utilities`), type-safe recipes, Tailwind preset
- Every CSS class has a matching recipe (`.sp-btn` → `getButtonClasses()`)
- Literal values in CSS are fallbacks only; real values come from tokens

### For Adapters (spectre-ui-wordpress, spectre-ui-astro, etc.)

- Adapters **translate only**; they never invent CSS or design logic
- WordPress: syncs and enqueues CSS; all styles come from `@phcdevworks/spectre-ui`
- Astro/11ty: wraps Spectre UI classes in framework components
- If it's a design token, it belongs in `spectre-tokens`. If it's a CSS class, it belongs in `spectre-ui`. If it's runtime integration, it belongs in the adapter.

## WordPress Adapter Principles

1. **Single source of truth** – All design lives in `@phcdevworks/spectre-ui`
2. **No CSS duplication** – This plugin never defines `.sp-*` styles
3. **Frontend only** – No admin or editor styling (by design)
4. **Distribution-safe** – Import-free CSS, no Node assumptions at runtime
5. **Adapter, not framework** – Thin by design; translate, don't transform

---

## 🏛️ The Spectre Suite Hierarchy

Spectre is built on a non-negotiable hierarchy to prevent style leakage and duplication:

1.  **Layer 1: DNA** ([@phcdevworks/spectre-tokens](https://github.com/phcdevworks/spectre-tokens)) – The source of truth for all design values.
2.  **Layer 2: Blueprint** ([@phcdevworks/spectre-ui](https://github.com/phcdevworks/spectre-ui)) – Translates tokens into CSS structure and recipes.
3.  **Layer 3: Adapter (This Package)** – Thin bridges that map Layer 2 to specific frameworks.

> **The Golden Rule**: Tokens define *meaning*. UI defines *structure*. Adapters define *delivery*.

---

## Roadmap (High Level)

- ✅ Frontend CSS adapter (this plugin)
- 🔄 `spectre-ui-blocks` (Gutenberg blocks, separate repo)
- [ ] Block patterns
- [ ] Optional PHP helpers
- [ ] Documentation & examples

See **[ROADMAP.md](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/ROADMAP.md)** for details.

## Contributing

Issues and pull requests are welcome. Please test changes in a local WordPress environment (frontend + block editor) before submitting.

For detailed contribution guidelines, see **[CONTRIBUTING.md](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/CONTRIBUTING.md)**.

## License

MIT © PHCDevworks — see **[LICENSE](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/LICENSE)** for details.

---

## ❤️ Support Spectre

If Spectre UI WordPress helps your workflow, consider sponsoring:

- [GitHub Sponsors](https://github.com/sponsors/phcdevworks)
- [Buy Me a Coffee](https://buymeacoffee.com/phcdevworks)
