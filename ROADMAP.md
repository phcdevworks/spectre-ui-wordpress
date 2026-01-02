# Roadmap

This document outlines the development roadmap for Spectre UI WordPress and its companion projects within the WordPress ecosystem.

## Project Philosophy

Spectre UI WordPress is intentionally **frontend-only** and **minimal by design**. It exists solely to bridge WordPress with `@phcdevworks/spectre-ui` CSS in a safe, predictable way.

**This plugin will never:**
- Style the WordPress admin UI
- Style the Gutenberg block editor
- Define blocks or block patterns
- Override design tokens
- Run build tools at WordPress runtime

Those responsibilities belong in separate, purpose-built plugins and themes.

---

## ✅ Phase 1: Foundation (Complete)

**Goal:** Establish stable CSS loading for WordPress frontend

- [x] Core plugin structure (`spectre-ui-wordpress.php`)
- [x] CSS synchronization script (`sync-spectre-ui-css.mjs`)
- [x] Frontend-only enqueue via `wp_enqueue_scripts`
- [x] Import-free CSS bundle verification
- [x] Cache-busting via `filemtime()`
- [x] Documentation (README, CONTRIBUTING, SECURITY)
- [x] Repository infrastructure (CI, templates, LICENSE)

**Status:** v0.1.0 released

---

## 🔄 Phase 2: Gutenberg Blocks (In Progress)

**Goal:** Provide official Spectre UI blocks for WordPress

### New Repository: `spectre-ui-blocks`

A **separate plugin** that depends on `spectre-ui-wordpress` and provides:

- [ ] Core blocks:
  - [ ] `<SpButton>` block (variant, size, URL, polymorphic)
  - [ ] `<SpCard>` block (variant, padding, semantic HTML)
  - [ ] `<SpInput>` block (state, validation, accessibility)
  - [ ] `<SpBadge>` block (variant, size, inline)
  - [ ] `<SpIconBox>` block (variant, size, icon picker)
- [ ] Block patterns:
  - [ ] Hero sections
  - [ ] Feature grids
  - [ ] Card layouts
  - [ ] Form patterns
- [ ] Editor styles (Gutenberg-only CSS, separate from frontend)
- [ ] Block transforms and variations
- [ ] Accessibility testing and ARIA compliance

**Why separate?**
- Keeps `spectre-ui-wordpress` minimal and stable
- Allows independent versioning
- Users can install blocks only if needed
- Editor styles stay isolated from frontend

**Timeline:** Q1-Q2 2026

---

## 📋 Phase 3: Developer Experience (Planned)

**Goal:** Make Spectre UI easier to adopt in WordPress themes

### 3.1 Optional PHP Helpers

Utility functions for classic themes and templates:

- [ ] `spectre_button()` - Generate button markup
- [ ] `spectre_card()` - Generate card wrapper
- [ ] `spectre_input()` - Generate form inputs
- [ ] `spectre_badge()` - Generate badge markup
- [ ] `spectre_container()` - Generate layout containers

**Principles:**
- Optional and non-intrusive
- Output only HTML + classes (no inline styles)
- Documented with examples
- Filterable via WordPress hooks

### 3.2 Theme Compatibility Layer

- [ ] Detect popular themes (GeneratePress, Kadence, Astra)
- [ ] Provide opt-in integration guides
- [ ] Offer CSS variable mapping for theme compatibility
- [ ] Document common override patterns

**Timeline:** Q2-Q3 2026

---

## 🎨 Phase 4: Enhancements (Future)

**Goal:** Refine and extend the WordPress adapter ecosystem

### 4.1 Documentation & Examples

- [ ] Live demo site with WordPress installation
- [ ] Theme starter template using Spectre UI
- [ ] Video tutorials (installation, usage, blocks)
- [ ] Migration guides from other design systems
- [ ] Performance optimization guide

### 4.2 Optional Shortcodes (Classic Editor)

For users still on classic editor:

- [ ] `[sp-button]` shortcode
- [ ] `[sp-card]` shortcode
- [ ] `[sp-badge]` shortcode
- [ ] Shortcode generator in admin UI

### 4.3 Advanced Features

- [ ] Admin settings page:
  - Choose CSS bundle (full, components-only, base-only)
  - Toggle specific component groups
  - Custom CSS variable overrides
- [ ] Multi-site support and network activation
- [ ] REST API endpoints for block patterns
- [ ] WP-CLI commands for setup and validation

**Timeline:** 2026-2027 (based on community demand)

---

## 🚫 Out of Scope

The following will **never** be part of `spectre-ui-wordpress`:

- ❌ Admin UI styling (WordPress admin is not a target)
- ❌ Custom post types or taxonomies
- ❌ Page builders or visual editors
- ❌ E-commerce integrations
- ❌ SEO or analytics features
- ❌ Design token generation at runtime
- ❌ Font loading or icon libraries
- ❌ Tailwind or PostCSS compilation in WordPress

These belong in separate plugins, companion projects, or user-land code.

---

## Community Priorities

We track feature requests and votes in [GitHub Discussions](https://github.com/phcdevworks/spectre-ui-wordpress/discussions). High-demand features may be prioritized or accelerated.

### How to Influence This Roadmap

1. Open a discussion or issue on GitHub
2. Provide use cases and specific requirements
3. Contribute code, documentation, or testing
4. Sponsor development via [GitHub Sponsors](https://github.com/sponsors/phcdevworks)

---

## Part of the Spectre Suite

This roadmap coordinates with:

- **[@phcdevworks/spectre-tokens](https://github.com/phcdevworks/spectre-tokens)** – Design token foundation
- **[@phcdevworks/spectre-ui](https://github.com/phcdevworks/spectre-ui)** – CSS framework (source of truth)
- **spectre-ui-blocks** – Gutenberg blocks (separate repo, coming soon)
- **[@phcdevworks/spectre-ui-astro](https://github.com/phcdevworks/spectre-ui-astro)** – Astro integration

---

## Questions?

See **[CONTRIBUTING.md](CONTRIBUTING.md)** or open a [GitHub Discussion](https://github.com/phcdevworks/spectre-ui-wordpress/discussions).
