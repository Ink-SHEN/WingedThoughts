# AGENTS.md — WingedThoughts 项目指南

面向在此仓库内工作的 AI agent。本文件描述**项目的当前真实状态**（不是历史设计意图）。
改动仓库结构、配置或约定时，请同步更新本文件。

> **先读第 0 节。** 它是一条硬约束，优先于本文件其余全部内容。

- 仓库：https://github.com/Ink-SHEN/WingedThoughts
- 线上：https://ink-shen.github.io/WingedThoughts/ （GitHub Pages，由 Actions 自动构建）
- npm 包名：`winged-thoughts` · 版本 `1.0.0` · 许可证 ISC · `"type": "commonjs"`
- 站点性质：**纯静态**，无服务端、无数据库、无密钥

---

## 0. 内容所有权（最高优先级，优先于本文件其余所有章节）

> **未经作者（仓库所有者）明确同意，agent 不得撰写、修改或删除任何面向读者的文字内容。**

这是本站的第一原则。本站是作者个人的思考记录，**文字本身就是作品**；
agent 的职责是维护承载它的结构，而不是替作者说话。

### 「文字内容」的范围

一切会出现在站点上的自然语言正文，包括但不限于：

- `docs/**/*.md` 与 `docs/en/**/*.md` 的正文、标题、引文、导语、描述
- 目录页卡片里的 `note-card-title` / `note-card-desc` 文案
- 组件中用户可见的文案，尤其是 `theme/components/about-content.js` 这类 content 模块
- 站点级文案：`title` / `description` / hero 的 `text`、`tagline` / `features` 条目

### 默认可做（无需额外授权）

- **结构**：新建/调整目录与文件、frontmatter、`config.mjs` 的 nav 与 sidebar 登记
- **样式**：`custom.css`、组件样式、布局
- **修复**：失效链接、错误的路径拼写、明显的标点或格式错误
- **双语同步**：作者改完一侧后，把另一侧替换为**对应的译文** —— 这是转译作者已写好的文字，
  不是代写（但译文本身仍需作者过目）
- **原样录入**：作者给出的文字，不加改动地放进去

### 必须先征得同意

- 新增任何笔记正文、读书笔记内容、书目介绍、读后感、总结
- 改写、润色、扩写、精简作者已写的文字
- 为占位结构补写示例文字、导语、段落

### 留空就留空

**不要为了"看起来完整"而填充内容。** 遇到空的小节、空的卡片区、空的目录页，
正确做法是保持它空着，最多留一条给 agent 自己的 HTML 注释说明这里该由作者来写，
而不是生成一段"合理"的文字填满。

```md
<!-- 本节由作者自行撰写，agent 请勿代为生成内容 -->
```

**判断标准**：如果这段文字将来会被作者以外的人当作"作者的声音"来读，那就不该由 agent 写。

---

## 1. 技术栈

| 项目 | 当前值 |
| --- | --- |
| 文档框架 | VitePress `^1.6.4`（`node_modules` 实际装的是 1.6.4） |
| 构建工具 | Vite（随 VitePress 内置，无独立配置） |
| 内容格式 | Markdown，`.md` 内可直接写 `<script setup>` 与 Vue 组件 |
| 代码高亮 | Shiki，**light/dark 统一使用 `github-dark`**（见 `config.mjs` 的 `markdown.theme`） |
| 配置语言 | `.mjs`（唯一配置文件 `docs/.vitepress/config.mjs`） |
| 包管理 | npm（有 `package-lock.json`，Actions 用 `npm ci`） |
| 国际化 | VitePress locales：根路径 = 简体中文，`/en/` = 英文 |
| 搜索 | 本地搜索（`search.provider: 'local'`） |
| 部署 | GitHub Actions → GitHub Pages |

没有引入除 VitePress 外的运行时依赖；没有自动化测试；没有 lint/format 工具链。

---

## 2. 目录结构

```
.
├── AGENTS.md                      # 本文件
├── README.md                      # 一句话简介
├── package.json / package-lock.json
├── .github/workflows/deploy.yml   # 唯一的 CI：push main → 构建 → 部署 Pages
├── scripts/
│   ├── optimize-hero-bg.py        # 【离线工具】生成 hero 响应式图，不参与构建
│   └── src/hero-bg.jpg            # hero 原图（替换原图后才需重跑脚本）
├── docs/                          # VitePress 源目录（root = 中文站）
│   ├── .vitepress/
│   │   ├── config.mjs             # 站点配置：base / locales / nav / sidebar
│   │   └── theme/
│   │       ├── index.js           # 主题入口：extends 默认主题 + Layout + custom.css
│   │       ├── Layout.vue         # 自定义 Layout（滚动状态、hero 背景图、导航高光）
│   │       ├── custom.css         # 全站样式（1099 行，按 0–9 分区）
│   │       ├── hero-bg.js         # hero 图 srcset 构建器（导出 WIDTHS / buildSrcSet…）
│   │       ├── hero-lqip.js       # hero 占位图 data URI
│   │       └── components/
│   │           ├── AboutPage.vue      # 关于页组件（含 locale prop）
│   │           └── about-content.js   # 关于页双语文案
│   ├── index.md                   # 中文首页（layout: home，hero + features）
│   ├── about.md                   # 中文关于页（挂 <AboutPage locale="zh" />）
│   ├── markdown-examples.md       # ⚠️ 脚手架示例页，未进导航
│   ├── api-examples.md            # ⚠️ 脚手架示例页，未进导航
│   ├── public/images/hero/        # hero-{640,960,1280,1920,2560}.{avif,webp,jpg}
│   ├── notes/                     # 中文笔记区
│   │   ├── index.md               # 笔记总目录（note-cards 卡片）
│   │   ├── fds.md
│   │   ├── linear-algebra.md
│   │   ├── website/               # 栏目：个人网站搭建
│   │   │   ├── InitialConstruction.md
│   │   │   ├── CustomTheme.md
│   │   │   └── NewNote.md         # ★ 新增笔记的官方流程说明
│   │   └── reading/               # 栏目：读书笔记
│   │       ├── index.md           # 读书笔记总目录（按书列卡片）
│   │       └── the-protestant-ethic/    # 一本书 = 一个子栏目
│   │           ├── index.md             # 书目信息 + 篇目导航
│   │           └── 01..04-*.md          # 编号篇目（编号即建议阅读顺序）
│   └── en/                        # 英文站，与中文侧结构镜像
│       ├── index.md / about.md
│       └── notes/                 # 与 docs/notes/ 逐文件对应
└── node_modules/
```

**关于 `docs/notes/website/NewNote.md`**：它是面向作者的"如何添加一篇新笔记"操作手册，
讲的是内容生产流程。给 agent 的工程约定以本文件为准，两者冲突时以本文件 + 源码为准。

---

## 3. 站点配置（`docs/.vitepress/config.mjs`）

### 全局

- `base: '/WingedThoughts/'` —— 与仓库名一致。**任何硬编码的绝对资源路径都会被破坏**，
  站内链接与静态资源引用要么用相对路径，要么走 `withBase()`。
- `lang: 'zh-CN'`（默认语言）
- `markdown.theme`: light/dark 都是 `github-dark`（刻意的：代码块在两种模式下都是深色）

### locales

| locale | 前缀 | 标题 | 侧边栏 key |
| --- | --- | --- | --- |
| `root` | `/` | `Ink的浮思` | `/notes/` |
| `en` | `/en/` | `Ink's Winged Thoughts` | `/en/notes/` |

### nav（顶部导航）

```js
// 中文
{ text: '首页',      link: '/' },
{ text: '笔记',      link: '/notes/',         activeMatch: '^/notes/(?!reading)' },
{ text: '读书笔记',  link: '/notes/reading/', activeMatch: '^/notes/reading/' },
{ text: '关于',      link: '/about' }

// 英文
{ text: 'home',          link: '/en/' },
{ text: 'notes',         link: '/en/notes/',         activeMatch: '^/en/notes/(?!reading)' },
{ text: 'reading notes', link: '/en/notes/reading/', activeMatch: '^/en/notes/reading/' },
{ text: 'about',         link: '/en/about' }
```

> **`activeMatch` 是必需的，不是装饰。** VitePress 1.6 的导航高亮逻辑
> （`VPNavBarMenuLink.vue`）只在你显式提供 `activeMatch` 时才按正则**前缀**匹配；
> 不提供时退化为**严格相等**（`normalize(link) === currentPath`），
> 结果是子页面不高亮。而 `currentPath` 是归一化后的路径：
> `en/notes/reading/index.md` → `/en/notes/reading/`，且已去掉 `.md` 后缀。
> 「笔记」用负向先行断言 `(?!reading)` 把自己从 reading 子树里摘出来，
> 否则两个导航项会同时高亮。**新增顶层导航项时沿用这个写法。**

### sidebar

中英各一棵树，key 为路径前缀，覆盖整个 `/notes/` 子树：

```
笔记
├── fds
├── 线性代数
├── 个人网站搭建 (3 篇)
└── 读书笔记
    ├── 总目录
    └── 新教伦理与资本主义精神（目录页）
```

- 读书笔记**有自己的导航项，但仍挂在同一棵侧边栏树里**（点进读书笔记页，
  侧边栏依然能看到全部笔记栏目，只有「读书笔记」分组高亮展开）。
  这是刻意的选择：读笔记时不应丢失跨栏目导航。
- sidebar 项嵌套最深到三层（如 `笔记 → 个人网站搭建 → 篇目`）。

### 其它

- `socialLinks`: GitHub 图标 → `https://github.com/Ink-SHEN/WingedThoughts`（仓库主页，非个人主页）
- `search.provider: 'local'`
- 主题入口 `theme/index.js` 只做三件事：`extends: DefaultTheme`、挂 `Layout`、`import './custom.css'`

---

## 4. 自定义主题与设计系统

### `layout: home` 首页

`docs/index.md` 与 `docs/en/index.md` 用 VitePress 默认 home 布局（hero + features）。
hero 的中英关系是**镜像**的：中文站 hero 用英文大标题，英文站 hero 保留中文装饰色
（`about` 页沿用同一套手法，见 `about-content.js` 顶部注释）。

### `theme/Layout.vue`

在默认 Layout 之上叠加三件事：

1. **滚动状态**：`window.scrollY > 50` 时给 `<html>` 加 `.scrolled`，
   驱动导航栏"透明 → Liquid Glass"（样式在 `custom.css` §3）。
2. **hero 响应式背景图**：通过 `#home-hero-info-before` 插槽注入一个
   `<picture>`（AVIF → WebP → JPEG 回退）+ LQIP 模糊占位 + 渐变遮罩层。
   > 槽位必须是 `home-hero-info-before`：它渲染在 `.VPHero` **内部**，
   > 而 `home-hero-before` 会渲染成 `.VPHero` 的**兄弟节点**，`inset: 0` 会锚错元素。
3. **按钮镜面高光**：`document` 级指针事件委托（路由切换无需重绑），
   rAF 节流，只写 `--lg-gx/--lg-gy` 两个 CSS 变量，实际动画交给 CSS。
   触摸设备（`pointerType === 'touch'`）与 `prefers-reduced-motion: reduce` 下整体跳过。

### hero 图片资产链

```
scripts/src/hero-bg.jpg
    └─(python scripts/optimize-hero-bg.py, 需 Pillow >= 11.3 且带 AVIF 支持)
        ├─ docs/public/images/hero/hero-{640,960,1280,1920,2560}.{avif,webp,jpg}
        └─ docs/public/images/hero/../hero-lqip.txt
```

- 脚本是**离线工具**，不参与站点构建。只有替换原图时才需要重跑。
- `WIDTHS` 常量在脚本和 `theme/hero-bg.js` 里各有一份，**必须同步修改**。
- `hero-lqip.js` 是**脚本自动生成**的产物（文件头有 `do not edit manually`），不要手改。
- `hero-bg.js` 导出 `WIDTHS` / `buildSrcSet(format)` / `FALLBACK_JPG` / `HERO_LQIP`，
  内部一律通过 `withBase()` 注入 base 前缀，因此**不硬编码任何绝对 URL**。
  新页面要复用响应式背景图，直接 import 这个模块，不要另写一套。

### `theme/custom.css`

单文件 1099 行，按注释分区，改动时**认准分区**再动手：

| 分区 | 内容 |
| --- | --- |
| 0 | 字体引入（Google Fonts + 霞鹜文楷 CDN） |
| 1 | 设计 Token |
| 2 | 首页 Hero（含响应式背景图图层、按钮液态玻璃、滚动指示箭头） |
| 3 | 导航栏（滚动前透明 → 滚动后 Liquid Glass） |
| 4 | 代码块（Stripe 风格深色） |
| 5 | 文章页 |
| 6 | 侧边栏与右侧目录 |
| 7 | Feature 卡片 |
| 8 | **笔记目录卡片（`.note-cards` / `.note-card`）与翻页器** |
| 9 | 滚动条与选区 |

约定：

- 设计 token 全部定义在**文件开头的 `:root`**；深色模式覆盖写在 **`html.dark`**。
  **不要把深色规则混进元素选择器**——light/dark 必须隔离。
- 字体变量：`--font-serif`(Newsreader / Noto Serif SC)、`--font-sans`(Inter)、
  `--font-cjk-display`(LXGW WenKai)。
- 品牌色 light/dark 各一套（`--vp-c-brand-*`），圆角与动效曲线也是 token 化的；
  新组件优先复用 token，不要写魔数。
- `.note-cards / .note-card / .note-card-glyph` 是**通用**链接卡片组件（§8），
  不只服务 notes 页；卡片容器用 `auto-fill`，卡片少时不会铺满整行，属既有行为。
- 任何样式改动都要**同时验证 light 与 dark**。

---

## 5. 内容约定

> 本节只讲**结构**约定。至于「哪些文字能动、哪些不能」，以第 0 节为准。

### 铁律：中英同构

中文在 `docs/`，英文在 `docs/en/`，**目录名与文件名必须逐字符一致**：

```
docs/notes/<栏目>/<Note>.md   →   docs/en/notes/<栏目>/<Note>.md
```

侧边栏两侧各登记一条。结构漂移（一边加了另一边没加）是最常见的回归来源。

### 命名

- 文件名：kebab-case（`linear-algebra.md`、`the-protestant-ethic/`）或英文驼峰
  （`CustomTheme.md`、`InitialConstruction.md`），与同栏目现有文件保持一致。
- 侧边栏 `link` **不带 `.md` 后缀**，但**路径拼写必须与文件名逐字符一致**。
  本站曾因 `InitialConstuction`（少一个 r）导致 404。

### 目录页

栏目目录页是 `<栏目>/index.md`，用 HTML 卡片列出下级条目：

```html
<div class="note-cards">
  <a class="note-card" href="./reading/">
    <span class="note-card-glyph">書</span>
    <span class="note-card-body">
      <span class="note-card-title">读书笔记</span>
      <span class="note-card-desc">以书为纲：问题、论证与读后</span>
    </span>
    <span class="note-card-arrow">→</span>
  </a>
</div>
```

- `href` 用**相对路径**（`./fds`、`./reading/`、`../website/NewNote`）。
  不要写 `../../docs/...`，也不要写站点绝对路径去依赖 VitePress 对 base 的重写。
- `note-card-glyph` 是一个字符，走衬线体斜体（现有：`{}` `∑` `W` `書`）。

### frontmatter

```yaml
---
layout: home        # 首页用
outline: deep       # 右侧目录显示更深层级
aside: false        # 去掉空右栏（如 about、about 类自定义页面）
title: 关于
description: 关于 Ink、这个站点的由来，以及如何联系我。
---
```

自定义 Vue 页面（如 about）要在 `.md` 里用相对路径 import 组件：

```md
<script setup>
import AboutPage from './.vitepress/theme/components/AboutPage.vue'
</script>

<AboutPage locale="zh" />
```

### 双语组件写法

**单组件 + content 模块 + `locale` prop**，不要复制两份模板：

```
components/AboutPage.vue      ← 只负责结构与样式，defineProps({ locale })
components/about-content.js   ← 导出 { zh, en } 两套文案，字段一一对应
```

新增字段时两套必须同时补，否则渲染会静默缺内容。

### 读书笔记栏目（`notes/reading/`）

结构固定，加书即加子目录：

| 层级 | 文件 | 作用 |
| --- | --- | --- |
| 模块总目录 | `reading/index.md` | note-cards 列出所有书 |
| 书目页 | `reading/<book-slug>/index.md` | 书目信息 + 篇目导航 |
| 篇目 | `reading/<book-slug>/NN-<topic>.md` | 一主题一篇，编号即推荐顺序 |

**新增一本书的四步**：建 `<book-slug>/`（中英各一份，`index.md` 只留空的小节框架）→
**由作者撰写**书目页与篇目内容（agent 不代写，见第 0 节）→
在 `config.mjs` 两侧 sidebar 的「读书笔记」分组下登记该书的目录页 →
在 `reading/index.md` 与 `en/notes/reading/index.md` 各加一张卡片。然后提交。

> 现状：`the-protestant-ethic/` 目前**只有目录页、没有篇目**（正文已清空，等作者自己写）。
> 以后如果又出现"内容被删到只剩目录"的情况，记得同步清掉对应的 sidebar 登记 —— 否则会留下死链。

---

## 6. 命令

```bash
npm install              # 安装依赖
npm run docs:dev         # 本地开发服务器（热重载）
npm run docs:build       # 生产构建 → docs/.vitepress/dist
npm run docs:preview     # 本地预览生产构建
npm run dev              # docs:dev 的别名
```

- `npm test` 是脚手架占位，**恒以退出码 1 失败**，无测试套件，不要依赖它做验证。
- 没有独立于 VitePress 的构建流水线。

---

## 7. 部署

`.github/workflows/deploy.yml` 是唯一的 CI：

```
push main → checkout → setup-node@20 (cache: npm) → npm ci
          → npm run docs:build → upload-pages-artifact(dist) → deploy-pages
```

- 触发条件：push 到 `main`，或手动 `workflow_dispatch`。
- 只提交源码：`node_modules/`、`docs/.vitepress/dist/`、`docs/.vitepress/cache/`
  均在 `.gitignore` 中，构建产物由 Actions 在云端重新生成。
- `base` 必须保持 `/WingedThoughts/`，否则 Pages 上的资源路径全部失效。
- 线上更新有 1–2 分钟延迟；核验部署状态可查 Actions 运行结论
  （`GET /repos/Ink-SHEN/WingedThoughts/actions/runs`，对目标 commit 应为 `completed / success`）。

---

## 8. Agent 环境注意事项（本机 / 沙箱，非项目属性）

这些是本开发机上运行 agent 时反复踩到的坑，与仓库本身无关，但会直接影响验证与提交流程：

- **`npm run docs:build` 在沙箱内可能因 `dist` 删除保护失败。**
  → 改用 `npm run docs:dev -- --port <p>` 起服务，用 HTTP 状态码 + 浏览器截图验证。
- **沙箱内 `git push` 会挂死**（无输出、被 SIGTERM，`github.com:443` 不可达），
  但 `api.github.com` 可达。→ 走 `github-push-via-api` 技能用 Git Data API 推送，
  推完用 `git ls-remote origin refs/heads/main` 核对远端 SHA 是否与本地一致。
- **`git credential fill` 在 Python 子进程里会永久挂死**，在 shell 里正常。
  → 先在 shell 侧取 token 写临时文件，再传给 Python，用完删除。
- **浏览器自动化（agent-browser）的 daemon 会随工具调用结束被回收。**
  → 把整串操作（open / wait / get / screenshot / close）打包进**一个后台任务**一次跑完，
  结果落盘日志再读。
- 执行 `git checkout` / `git reset` 等写操作前，**先停掉 dev server**，
  否则会撞 `node_modules/.bin/esbuild` 等文件锁，损坏 `.git`。
- 改动前先 `cp` 到工作区外留底，再做 git 写操作。

---

## 9. 不要做的事

- **不要未经同意撰写或改动任何面向读者的文字** —— 见第 0 节。这是本项目最容易被违反、也最要紧的一条。
- 不要在 `custom.css` 里把 dark 规则写进元素选择器——必须走 `html.dark`。
- 不要在 Markdown 或组件里硬编码 `https://ink-shen.github.io/WingedThoughts/...`
  这类绝对 URL；用相对路径或 `withBase()`。
- 不要只改中文侧或只改英文侧。两侧同构是硬约束。
- 不要为单个页面复制一份模板/样式副本，先看现有组件能否复用。
- 不要提交 `dist/`、`cache/`、`node_modules/` 或任何 token / 凭据。
- 不要顺手改动与当前任务无关的样式或结构（本项目遵循最小侵入原则）。
