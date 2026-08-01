# 自定义主题：从默认模板到深色质感

> 本篇记录 WingedThoughts 从 VitePress 默认主题到「Linear 骨架 + 照片暖调」自定义主题的改造过程与关键实现。

## 设计定位

整体风格参考 Linear.app：极简、深色、呼吸感。在此基础上用一张跨海大桥日落照片提取色板，冷暖对撞但冷色主导，关键词是**冷静骨架 + 人文温度**。

## 目录结构

所有自定义代码集中在 `docs/.vitepress/theme/`，不引入任何额外 npm 包：

```
docs/.vitepress/theme/
├── index.js      # 主题入口：继承 DefaultTheme，注册 Layout，引入 custom.css
├── Layout.vue    # 滚动监听（导航栏毛玻璃切换）、hero 背景图注入、滚动箭头插槽
└── custom.css    # 全部视觉样式：设计 token 置顶，按区块注释组织
```

```js
// theme/index.js —— 极简入口
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout
}
```

## 设计 Token

色板提取自照片：海面雾蓝为品牌色，天空灰粉仅作 accent。深/浅两套变量分别定义在 `html.dark` 与 `:root`，直接覆盖 VitePress 默认变量名，深浅切换逻辑零改动：

```css
html.dark {
  --vp-c-brand-1: #6b8dd4;  /* 品牌色：海面雾蓝 */
  --vp-c-bg: #0b0f19;       /* 最深背景 */
  --vp-c-bg-alt: #111827;   /* 卡片、代码块 */
  --vp-c-text-1: #e2e8f0;   /* 主文字，暖白 */
  --vp-c-divider: #1e293b;
}
```

## 首页 Hero

- 全屏照片背景（`min-height: 100vh` + `background-size: cover`）叠加渐变遮罩保证文字可读
- 标题淡入动画用纯 CSS：`opacity 0 → 1`、`translateY(24px) → 0`，缓动 `cubic-bezier(0.22, 1, 0.36, 1)`，各元素 `animation-delay` 依次错开
- Liquid Glass 按钮：`backdrop-filter: blur(24px) saturate(150%)` + 顶部高光描边；主按钮用伪元素 + mask 合成 1px 渐变描边

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

## 三个踩过的坑

### 1. base 前缀导致背景图 404

站点部署在 `/WingedThoughts/` 子路径，CSS 里写死 `url(/images/hero-bg.jpg)` 会 404。解决办法是在 Layout 里用 `withBase()` 注入 CSS 变量：

```js
document.documentElement.style.setProperty(
  '--hero-bg-image',
  `url("${withBase('/images/hero-bg.jpg')}")`
)
```

CSS 中通过 `background-image: ..., var(--hero-bg-image)` 使用。

### 2. VitePress 1.x 的代码高亮没有 .token 类

默认主题使用 Shiki，输出的是 `--shiki-light` / `--shiki-dark` 内联 CSS 变量而非 Prism 风格的 `.token.keyword` 类。想要 Stripe 风格的统一深色代码块，最干净的做法是在 `config.mjs` 中固定高亮主题：

```js
markdown: {
  theme: { light: 'github-dark', dark: 'github-dark' }
}
```

### 3. dist 与 cache 不该进仓库

`docs/.vitepress/dist`（构建产物）和 `docs/.vitepress/cache` 一旦被 git 跟踪，每次构建都会产生大量无意义 diff。GitHub Actions 工作流本来就会从源码重新构建，因此用 `.gitignore` 排除并 `git rm -r --cached` 取消跟踪。

## 部署

仓库配置了 GitHub Actions 工作流（`.github/workflows/deploy.yml`）：推送到 `main` 分支后自动 `npm ci` → `npm run docs:build` → 发布 `docs/.vitepress/dist` 到 GitHub Pages。本地改动只有提交并推送后，线上站点才会更新。
