# 如何添加一篇新笔记

> 本站内容即代码：一篇笔记 = 一个 Markdown 文件 + 一处侧边栏登记 + 一次提交推送。本篇记录完整流程与注意事项。

## 标准流程

### 1. 创建 Markdown 文件

在对应栏目下新建 `.md` 文件。本站中英双语并行，两个语言目录各放一份：

```
docs/notes/<栏目>/<NoteName>.md        # 中文版
docs/en/notes/<栏目>/<NoteName>.md     # 英文版
```

- 文件名用英文驼峰或 kebab-case（如 `CustomTheme.md`、`linear-algebra.md`），URL 由文件路径决定
- 栏目目录下的 `index.md` 是该栏目的目录页（如 `docs/notes/index.md`）
- 正文直接用 Markdown 书写，可选 frontmatter：

```yaml
---
outline: deep   # 右侧目录显示更深层级
---
```

### 2. 在侧边栏登记

编辑 `docs/.vitepress/config.mjs`，在中英文各自的 `sidebar` 配置里加一条：

```js
{ text: '笔记标题', link: '/notes/<栏目>/<NoteName>' }        // 中文
{ text: 'Note Title', link: '/en/notes/<栏目>/<NoteName>' }   // 英文
```

> [!WARNING] 链接必须与文件名**逐字符一致**
> `link` 不带 `.md` 后缀，但路径拼写要和实际文件名完全对应。本站曾因 `InitialConstuction`（少一个 r）与 `InitialConstruction.md` 不匹配导致 404。

### 3. 本地预览

```bash
npm run dev
```

打开终端提示的本地地址，确认：侧边栏出现新条目、点击能打开、代码块/表格/引用块渲染正常。

### 4. 提交并推送

```bash
git add -A
git commit -m "add note: <笔记标题>"
git push origin main
```

推送到 `main` 后 GitHub Actions 自动构建并部署到 GitHub Pages，约 1–2 分钟后线上更新。

## 注意事项

| 事项 | 说明 |
| --- | --- |
| 只提交源码 | `docs/.vitepress/dist` 与 `cache` 已被 `.gitignore` 排除，构建产物由 Actions 在云端重新生成 |
| 图片资源 | 放入 `docs/public/images/`，Markdown 中引用时带 base 前缀：`/WingedThoughts/images/xxx.jpg` |
| 目录页链接 | 栏目 `index.md` 中可用相对链接（如 `./website/NoteName.md`），新增笔记后可顺手补一条 |
| 构建自检 | 推送前可运行 `npm run docs:build`，能在本地提前发现死链或语法错误 |

## 一页速查

1. `docs/notes/` 与 `docs/en/notes/` 各建一份同名 `.md`
2. `config.mjs` 两侧 sidebar 各加一条 `link`（拼写与文件名一致）
3. `npm run dev` 本地确认
4. `git push origin main`，等 Actions 变绿
