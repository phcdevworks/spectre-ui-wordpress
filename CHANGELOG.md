# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases published to npm.

## [Unreleased]

### Added

- Added comprehensive README with installation, usage, and development documentation ([f5d8a04], [1454af7]).
- Added SECURITY.MD with security policy guidelines ([89be108]).
- Added CODE_OF_CONDUCT.md for community standards ([afca5d1]).
- Added issue and pull request templates ([f5e44d1]).
- Added VSCode configuration, funding info, and contribution documentation ([1549e0d]).
- Added Spectre UI CSS bundle synchronization and improved sync script ([22f81f3]).
- Added devcontainer configuration, Dependabot config, and workspace file ([9e0969a]).

### Changed

- Updated style enqueue function and hook for better WordPress integration ([883f957]).

## [0.1.0] - 2025-12-27

### Added

- Initial WordPress plugin setup with CSS synchronization from `@phcdevworks/spectre-ui` ([d0353d5]).
- Main plugin file (`spectre-ui-wordpress.php`) with frontend and block editor hooks ([d0353d5]).
- CSS sync script (`sync-spectre-ui-css.mjs`) that resolves import-free CSS bundles ([d0353d5]).
- Build configuration using `@wordpress/scripts` for JavaScript bundling ([d0353d5]).
- Package configuration with proper dependencies on `@phcdevworks/spectre-ui` ([d0353d5]).
- Repository infrastructure including LICENSE, basic README, and configuration files ([d0353d5]).
- WordPress-standard enqueue functions with cache-busting via `filemtime()` ([d0353d5]).
- Support for both frontend (`wp_enqueue_scripts`) and Gutenberg editor (`enqueue_block_editor_assets`) ([d0353d5]).

[unreleased]: https://github.com/phcdevworks/spectre-ui-wordpress/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/phcdevworks/spectre-ui-wordpress/tree/v0.1.0
[f5d8a04]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/f5d8a04b5f0c01b68638c803ceb3d5e33c1cc932
[1454af7]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/1454af756310172bce18af94d88fd9019a0731b6
[89be108]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/89be1081446ae5f1fa03a0d242b703ecdbdd1935
[afca5d1]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/afca5d10b52046d64970a3b6403c5cddc726ebd1
[7e427a4]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/7e427a40cf6c8dfe6340b85e8d7b2710f313983b
[f5e44d1]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/f5e44d155cc2cfea55422bcdee66a0c06a7460be
[1549e0d]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/1549e0de5a3ce86517b846d55dde39470532a5c0
[883f957]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/883f95765c6752c929483577273983c0da0302c1
[22f81f3]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/22f81f3433c772fd64fc90b425795c5ece8e5657
[d0353d5]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/d0353d5e6986c3fc8a766e33ce5e9d04935fdb32
[9e0969a]: https://github.com/phcdevworks/spectre-ui-wordpress/commit/9e0969aa3aa7aabe30d9d864a56b360b68d747bb
