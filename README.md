# Spectre UI WordPress

WordPress integration layer for the Spectre design system.

> 📋 **[View Roadmap](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/ROADMAP.md)** | 🤝 **[Contributing Guide](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/CONTRIBUTING.md)** | 📝 **[Changelog](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/CHANGELOG.md)**

## Overview

`spectre-ui-wordpress` is the official WordPress adapter for the Spectre design system.

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

## Design Principles

1. **Single source of truth** – All design lives in `@phcdevworks/spectre-ui`
2. **No CSS duplication** – This plugin never defines `.sp-*` styles
3. **Frontend only** – No admin or editor styling
4. **Distribution-safe** – Import-free CSS, no Node assumptions
5. **Adapter, not framework** – Thin by design

## Part of the Spectre Suite

- **Spectre Tokens** – Design-token foundation
- **Spectre UI** – Core CSS + class contracts
- **Spectre UI WordPress** – WordPress adapter (this plugin)
- **Spectre UI Blocks** – Gutenberg blocks (separate plugin)
- **Spectre Astro** – Astro adapter

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
