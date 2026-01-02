# Spectre UI WordPress

WordPress integration layer for the Spectre design system.

> 📋 **[View Roadmap](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/ROADMAP.md)** | 🤝 **[Contributing Guide](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/CONTRIBUTING.md)** | 📝 **[Changelog](https://github.com/phcdevworks/spectre-ui-wordpress/blob/main/CHANGELOG.md)**

## Overview

`spectre-ui-wordpress` provides seamless integration of [@phcdevworks/spectre-ui](https://github.com/phcdevworks/spectre-ui)'s design system into WordPress. This plugin automatically syncs and enqueues Spectre UI CSS for both the frontend and block editor, providing a foundation for Spectre-powered themes and blocks.

- ✅ Automatically enqueues Spectre UI CSS on frontend and in Gutenberg editor
- ✅ Resolves import-free CSS bundle for WordPress compatibility
- ✅ Does not reimplement design logic—consumes all styling from `@phcdevworks/spectre-ui`
- ✅ Cache-busted versioning via `filemtime()`
- ✅ Foundation for future Gutenberg blocks using Spectre UI classes

## Installation

### Option 1: Manual Installation (Development)

1. Clone the repository:

```bash
git clone https://github.com/phcdevworks/spectre-ui-wordpress.git
cd spectre-ui-wordpress
```

2. Install dependencies and build:

```bash
npm install
npm run build
```

3. Copy or symlink to your WordPress plugins directory:

```bash
# Symlink (recommended for development)
ln -s $(pwd) /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress

# Or copy
cp -r . /path/to/wordpress/wp-content/plugins/spectre-ui-wordpress
```

4. Activate the plugin in WordPress Admin → Plugins

### Option 2: Composer (Coming Soon)

```bash
composer require phcdevworks/spectre-ui-wordpress
```

## Usage

### 1. Activate the Plugin

Once activated, Spectre UI WordPress automatically:
- Enqueues `assets/spectre-ui.css` on the frontend via `wp_enqueue_scripts`
- Loads the same CSS in the Gutenberg block editor via `enqueue_block_editor_assets`
- Provides cache-busted versioning using the CSS file modification time

No additional configuration is required. All Spectre UI styles (tokens, base, components, utilities) are now available in your WordPress site.

### 2. Use Spectre Classes in Your Theme

Add Spectre UI classes to your theme templates:

```php
<!-- Single post template -->
<article class="sp-card sp-card--elevated">
  <h1><?php the_title(); ?></h1>
  <div class="sp-stack sp-stack--md">
    <?php the_content(); ?>
  </div>
  <a href="<?php echo home_url(); ?>" class="sp-btn sp-btn--primary">
    Back to Home
  </a>
</article>
```

### 3. Build Custom Blocks with Spectre Classes

Create Gutenberg blocks that leverage Spectre UI styling:

```javascript
// src/index.js
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('spectre/button', {
  title: 'Spectre Button',
  icon: 'button',
  category: 'design',
  attributes: {
    text: { type: 'string', default: 'Click me' },
    variant: { type: 'string', default: 'primary' }
  },
  edit: ({ attributes, setAttributes }) => {
    return (
      <button className={`sp-btn sp-btn--${attributes.variant}`}>
        {attributes.text}
      </button>
    );
  },
  save: ({ attributes }) => {
    return (
      <button className={`sp-btn sp-btn--${attributes.variant}`}>
        {attributes.text}
      </button>
    );
  }
});
```

## Available CSS Classes

All Spectre UI classes are available after plugin activation:

### Buttons
```html
<button class="sp-btn sp-btn--primary">Primary CTA</button>
<button class="sp-btn sp-btn--secondary">Secondary</button>
<button class="sp-btn sp-btn--ghost">Ghost Button</button>
<button class="sp-btn sp-btn--danger">Destructive</button>
```

### Cards
```html
<div class="sp-card sp-card--elevated">
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</div>

<div class="sp-card sp-card--outline">Bordered card</div>
<div class="sp-card sp-card--ghost">Transparent card</div>
```

### Inputs
```html
<div class="sp-input-wrapper">
  <label for="email" class="sp-input-label">Email</label>
  <input type="email" id="email" class="sp-input sp-input--default" />
</div>

<div class="sp-input-wrapper sp-input-wrapper--error">
  <label for="password" class="sp-input-label">Password</label>
  <input type="password" id="password" class="sp-input sp-input--error" />
  <span class="sp-input-error">This field is required</span>
</div>
```

### Badges
```html
<span class="sp-badge sp-badge--primary">New</span>
<span class="sp-badge sp-badge--success">Success</span>
<span class="sp-badge sp-badge--warning">Warning</span>
<span class="sp-badge sp-badge--danger">Danger</span>
```

### Utilities
```html
<div class="sp-stack sp-stack--md">
  <!-- Vertical spacing -->
</div>

<div class="sp-container">
  <!-- Max-width container -->
</div>
```

## Development

### Build Process

The plugin uses a custom sync script to ensure WordPress receives an import-free CSS bundle:

```bash
# Development mode with watch
npm run start

# Production build
npm run build

# Lint JavaScript
npm run lint
```

The `sync-spectre-ui-css.mjs` script:
1. Resolves the correct CSS bundle from `@phcdevworks/spectre-ui`
2. Ensures the bundle is import-free (no `@import` statements)
3. Copies it to `assets/spectre-ui.css`

### Project Structure

```
spectre-ui-wordpress/
├── spectre-ui-wordpress.php  # Main plugin file (hooks)
├── assets/
│   └── spectre-ui.css        # Synced CSS (generated, do not edit)
├── build/
│   └── index.js              # Compiled JavaScript (generated)
├── scripts/
│   └── sync-spectre-ui-css.mjs  # CSS sync utility
├── src/
│   └── index.js              # Block registration entry
└── package.json
```

## Design Principles

1. **Single source of truth** – All styles come from `@phcdevworks/spectre-ui`
2. **No style duplication** – This plugin never defines CSS, only loads it
3. **WordPress standards** – Follows WordPress coding standards and best practices
4. **Cache-friendly** – Uses `filemtime()` for automatic cache invalidation
5. **Editor parity** – Same styles in frontend and Gutenberg editor

## Part of the Spectre Suite

- **Spectre Tokens** – Design-token foundation
- **Spectre UI** – Core styling layer
- **Spectre Blocks** – WordPress block library (coming soon)
- **Spectre Astro** – Astro integration
- **Spectre 11ty** – Eleventy integration
- **Spectre WordPress** – WordPress integration (this plugin)

## Roadmap

- [ ] Custom Gutenberg blocks (Button, Card, Input, Badge, IconBox)
- [ ] PHP helper functions (`spectre_button()`, `spectre_card()`)
- [ ] Admin settings page (choose CSS bundles: full, components-only, base-only)
- [ ] Shortcode support for classic editor
- [ ] Theme compatibility layer

See **[ROADMAP.md](ROADMAP.md)** for detailed plans.

## Contributing

Issues and pull requests are welcome. Please test changes in a local WordPress environment (frontend + block editor) before submitting.

For detailed contribution guidelines, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## License

MIT © PHCDevworks — See **[LICENSE](LICENSE)** for details.

---

## ❤️ Support Spectre

If Spectre UI WordPress helps your workflow, consider sponsoring:

- [GitHub Sponsors](https://github.com/sponsors/phcdevworks)
- [Buy Me a Coffee](https://buymeacoffee.com/phcdevworks)
