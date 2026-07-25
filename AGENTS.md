# Agent Guidance for `WingedThoughts`

## Project Overview

`WingedThoughts` is a bilingual static documentation site built with [VitePress](https://vitepress.dev/). It serves as a personal notebook for knowledge, ideas, and reflections. The repository is hosted at https://github.com/Ink-SHEN/WingedThoughts.

- **Project name:** `WingedThoughts`
- **npm package name:** `winged-thoughts`
- **Version:** `1.0.0`
- **Description:** "Here I store my knowledge and ideas, in search of knowledge's heart and life's elegance"
- **License:** ISC
- **Runtime:** Node.js (CommonJS `package.json` with `"type": "commonjs"`)
- **Primary framework:** VitePress `^1.6.4`

## Technology Stack

- **Documentation generator:** VitePress 1.x
- **Build tool:** Vite (bundled with VitePress)
- **Content format:** Markdown with optional Vue single-file components (`.md` files support `<script setup>`)
- **Syntax highlighting:** Shiki
- **Configuration language:** JavaScript modules (`.mjs`)
- **Package manager:** npm (evidenced by `package-lock.json`)
- **Internationalization:** VitePress locales (Chinese root + English)

## Project Structure

```
.
├── README.md                 # Short project description
├── package.json              # Node.js manifest and scripts
├── package-lock.json         # Locked dependency tree
├── AGENTS.md                 # This file
├── docs/                     # VitePress source directory
│   ├── .vitepress/
│   │   ├── config.mjs        # Site configuration (locales, nav, sidebar, social links)
│   │   └── cache/            # VitePress build cache (generated)
│   ├── index.md              # Chinese home page (uses VitePress home layout)
│   ├── about.md              # Chinese about page
│   ├── markdown-examples.md  # Example Markdown features
│   ├── api-examples.md       # Example runtime API usage
│   ├── notes/                # Chinese notes section
│   │   ├── fds.md
│   │   └── linear-algebra.md
│   └── en/                   # English locale
│       ├── index.md          # English home page
│       ├── about.md          # English about page
│       └── notes/            # English notes section
│           ├── fds.md
│           └── linear-algebra.md
└── node_modules/             # Installed dependencies
```

### Key Configuration Files

- `package.json`: Defines project metadata, dependencies, and npm scripts.
- `docs/.vitepress/config.mjs`: VitePress site configuration.
  - `base`: `/WingedThoughts/` (matches the GitHub Pages repository name)
  - Root locale (`/`): Chinese (`zh-CN`)
    - `title`: "Ink的浮思"
    - `description`: "在这里记录我的知识和灵感，寻找知识的本质与生活的优雅"
    - Navigation: 首页, 笔记, 关于
    - Sidebar: notes section under `/notes/`
  - English locale (`/en/`): English (`en-US`)
    - `title`: "Ink's Winged Thoughts"
    - `description`: "Here I store my knowledge and ideas, in search of knowledge's heart and life's elegance"
    - Navigation: home, notes, about
    - Sidebar: notes section under `/en/notes/`
  - Social link: GitHub icon pointing to `https://github.com/Ink-SHEN/WingedThoughts`
  - Search provider: local

### Content Organization

- All documentation source lives under `docs/`.
- Markdown files are automatically routed based on their file path.
- The root locale is Chinese; English content lives under `docs/en/` and is served under `/en/`.
- Frontmatter is supported for per-page metadata (e.g., `layout: home`, `outline: deep`).

## Build and Development Commands

Run these from the project root:

```bash
# Install dependencies
npm install

# Start local development server with hot reload
npm run docs:dev

# Build the static site (output goes to docs/.vitepress/dist by default)
npm run docs:build

# Preview the production build locally
npm run docs:preview
```

### Notes

- The `test` script currently just prints an error and exits with code 1; there are no automated tests configured.
- The project has no custom build pipeline beyond VitePress itself.
- The default build output directory is `docs/.vitepress/dist`.
- Because `base` is set to `/WingedThoughts/`, the site is intended to be deployed to GitHub Pages under the `WingedThoughts` repository.

## Code Style Guidelines

- Follow the existing VitePress conventions:
  - Keep Markdown content in `docs/`.
  - Use frontmatter for page-level configuration.
  - Use Vue `<script setup>` blocks inside Markdown when dynamic data is needed.
- Configuration lives in `docs/.vitepress/config.mjs` and should remain a JavaScript module.
- Maintain consistent naming:
  - Repository / project: `WingedThoughts`
  - npm package name: `winged-thoughts`
  - Site title: `Winged Thoughts` (hero) / `Ink的浮思` (Chinese locale) / `Ink's Winged Thoughts` (English locale)
- Chinese content uses the root locale; English content lives under `docs/en/`.

## Testing Instructions

- There is no test suite at this time.
- To verify changes:
  1. Run `npm run docs:dev` and check pages in a browser.
  2. Run `npm run docs:build` to confirm the static build succeeds.
  3. Run `npm run docs:preview` to inspect the production build.
  4. Verify both Chinese (`/`) and English (`/en/`) locales render correctly.

## Deployment Considerations

- The project produces a static site under `docs/.vitepress/dist/` after `npm run docs:build`.
- Any static host (GitHub Pages, Netlify, Vercel, etc.) can serve the contents of `docs/.vitepress/dist/`.
- For GitHub Pages deployment under the `WingedThoughts` repository, ensure `base` in `docs/.vitepress/config.mjs` remains `/WingedThoughts/`.

## Security Considerations

- The site is static and contains no server-side code or secrets.
- Do not commit sensitive information (tokens, passwords, private keys) to this repository.
- If adding custom Vue components or third-party scripts in Markdown, validate user-facing content to avoid XSS in the generated site.
