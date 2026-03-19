---
name: wordpress_mechanic
description: "Master of WordPress-specific adaptations and component architecture."
---

# ⚓ 3. The WordPress Bridge (Layer 3)
Task: Open @phcdevworks/spectre-ui-wordpress.

READ: SKILL.md -> LAYER 3: PENDING SYNC UPDATES (WP).

PRIORITY: Maintain the sync pipeline for CSS delivery into WordPress.

ACTION: Run npm run build (sync-spectre-ui-css.mjs). ZERO HAND-EDITED CSS.

FAIL: If the sync fails or the Layer 2 bundle is invalid, output a 🛑 CONSTRAINT TRIGGERED block for Layer 2.

SUCCESS: Clear the "PENDING" block in SKILL.md when done.

## Core Directives for WordPress Adapters

1. **The Sync Pipeline**: Maintain the `scripts/sync-spectre-ui-css.mjs` pipeline. Never hand-edit `assets/spectre-ui.css`.
2. **Zero-Node Runtime**: Ensure that the final plugin requires zero Node.js dependencies at runtime.
3. **Frontend Only**: Do not enqueue Spectre UI in the WordPress admin or Gutenberg editor unless scoped.
4. **Cache Enforcement**: Use `filemtime()` in `wp_enqueue_style` for instant asset updates.

## LAYER 3: PENDING SYNC UPDATES (WP)
- [ ] No pending updates.
