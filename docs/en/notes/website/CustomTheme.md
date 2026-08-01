# Custom Theme: From Default Template to a Dark, Textured Site

> This note documents how WingedThoughts went from the stock VitePress theme to a custom look: a Linear-style skeleton warmed up by a sunset photograph.

## Design Direction

The overall style borrows from Linear.app: minimal, dark, spacious. On top of that, the palette is extracted from a sunset photo of a sea-crossing bridge — cool tones dominate with warm accents. The keywords are **a calm skeleton with human warmth**.

## Directory Structure

All custom code lives in `docs/.vitepress/theme/`, with zero additional npm packages:

```
docs/.vitepress/theme/
├── index.js      # Theme entry: extends DefaultTheme, registers Layout, imports custom.css
├── Layout.vue    # Scroll listener (nav glass toggle), hero background injection, scroll-arrow slot
└── custom.css    # All visual styling: design tokens on top, organized in commented sections
```

```js
// theme/index.js — minimal entry
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout
}
```

## Design Tokens

The palette comes from the photo: misty sea blue as the brand color, dusty sky pink as accent only. Dark and light variable sets are defined under `html.dark` and `:root`, overriding VitePress's own variable names so the built-in mode toggle keeps working untouched:

```css
html.dark {
  --vp-c-brand-1: #6b8dd4;  /* brand: misty sea blue */
  --vp-c-bg: #0b0f19;       /* deepest background */
  --vp-c-bg-alt: #111827;   /* cards, code blocks */
  --vp-c-text-1: #e2e8f0;   /* primary text, warm white */
  --vp-c-divider: #1e293b;
}
```

## Home Hero

- Full-screen photo background (`min-height: 100vh` + `background-size: cover`) with a gradient overlay for readability
- Pure-CSS fade-in: `opacity 0 → 1`, `translateY(24px) → 0`, easing `cubic-bezier(0.22, 1, 0.36, 1)`, elements staggered via `animation-delay`
- Liquid Glass buttons: `backdrop-filter: blur(24px) saturate(150%)` with a top highlight border; the primary button gets a 1px gradient border via a masked pseudo-element

```css
.VPHome .VPHero .VPButton.brand::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(139,174,232,.9), rgba(212,168,154,.6));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

## Three Pitfalls

### 1. The base prefix breaks background image URLs

The site deploys under `/WingedThoughts/`, so a hard-coded `url(/images/hero-bg.jpg)` in CSS 404s. The fix is injecting a CSS variable from the Layout with `withBase()`:

```js
document.documentElement.style.setProperty(
  '--hero-bg-image',
  `url("${withBase('/images/hero-bg.jpg')}")`
)
```

Then use it in CSS via `background-image: ..., var(--hero-bg-image)`.

### 2. VitePress 1.x code highlighting has no .token classes

The default theme uses Shiki, which emits inline `--shiki-light` / `--shiki-dark` CSS variables instead of Prism-style `.token.keyword` classes. The cleanest way to get Stripe-style dark code blocks in both color modes is pinning the highlight theme in `config.mjs`:

```js
markdown: {
  theme: { light: 'github-dark', dark: 'github-dark' }
}
```

### 3. dist and cache don't belong in the repo

Once `docs/.vitepress/dist` (build output) and `docs/.vitepress/cache` are tracked by git, every build produces a pile of meaningless diffs. The GitHub Actions workflow rebuilds from source anyway, so exclude them with `.gitignore` and untrack them via `git rm -r --cached`.

## Deployment

The repo has a GitHub Actions workflow (`.github/workflows/deploy.yml`): pushing to `main` triggers `npm ci` → `npm run docs:build` → publishes `docs/.vitepress/dist` to GitHub Pages. Local changes only reach the live site after they are committed and pushed.
