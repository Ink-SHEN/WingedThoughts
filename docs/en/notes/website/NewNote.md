# How to Add a New Note

> Content is code on this site: a note = one Markdown file + one sidebar entry + one commit and push. This note documents the full workflow and the pitfalls.

## Standard Workflow

### 1. Create the Markdown file

Create a `.md` file under the appropriate section. This site is bilingual, so add one copy per language:

```
docs/notes/<section>/<NoteName>.md        # Chinese version
docs/en/notes/<section>/<NoteName>.md     # English version
```

- Use English CamelCase or kebab-case filenames (e.g. `CustomTheme.md`, `linear-algebra.md`); the URL is derived from the file path
- Each section directory has an `index.md` acting as its landing page (e.g. `docs/notes/index.md`)
- Write in plain Markdown; optional frontmatter:

```yaml
---
outline: deep   # show deeper heading levels in the right-hand outline
---
```

### 2. Register it in the sidebar

Edit `docs/.vitepress/config.mjs` and add an entry to each locale's `sidebar`:

```js
{ text: '笔记标题', link: '/notes/<section>/<NoteName>' }        // Chinese
{ text: 'Note Title', link: '/en/notes/<section>/<NoteName>' }   // English
```

> [!WARNING] The link must match the filename **character for character**
> `link` omits the `.md` extension, but the path spelling must exactly match the real filename. This site once 404'd because `InitialConstuction` (missing an "r") didn't match `InitialConstruction.md`.

### 3. Preview locally

```bash
npm run dev
```

Open the local address printed in the terminal and confirm: the new entry appears in the sidebar, it opens without a 404, and code blocks / tables / blockquotes render correctly.

### 4. Commit and push

```bash
git add -A
git commit -m "add note: <note title>"
git push origin main
```

Pushing to `main` triggers the GitHub Actions workflow, which builds and deploys to GitHub Pages. The live site updates in about 1–2 minutes.

## Things to Know

| Topic | Note |
| --- | --- |
| Commit source only | `docs/.vitepress/dist` and `cache` are excluded via `.gitignore`; Actions rebuilds everything in the cloud |
| Images | Put them in `docs/public/images/` and reference with the base prefix: `/WingedThoughts/images/xxx.jpg` |
| Section index links | Section `index.md` files can use relative links (e.g. `./website/NoteName.md`); add one when you add a note |
| Pre-flight check | Run `npm run docs:build` before pushing to catch dead links or syntax errors locally |

## Cheat Sheet

1. Create the same-named `.md` under both `docs/notes/` and `docs/en/notes/`
2. Add a `link` to both sidebars in `config.mjs` (spelling must match the filename)
3. Confirm locally with `npm run dev`
4. `git push origin main`, wait for Actions to go green
