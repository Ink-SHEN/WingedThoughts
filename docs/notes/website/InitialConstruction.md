# VitePress + GitHub Pages 个人笔记网站搭建教程

> 零成本、Markdown 驱动、自动部署、支持中英文切换。

---

## 一、前置准备

- **GitHub 账号**
- **Node.js 环境**（已安装 npm）
- **Git**（已配置 `user.name` 和 `user.email`）
- **PowerShell / Terminal**

---

## 二、创建 GitHub 仓库

1. 打开 [GitHub](https://github.com)，点击 **New Repository**
2. 填写仓库名，例如 `WingedThoughts`
3. 选择 **Public**（GitHub Pages 对公开仓库免费）
4. 勾选 **Add a README file**
5. 点击 **Create repository**

> 注意：仓库名**不需要**是 `用户名.github.io`，项目站点同样支持 Pages。

---

## 三、克隆仓库到本地

```powershell
cd "D:\study mate"        # 换成你的工作目录
git clone https://github.com/你的用户名/仓库名.git
cd 仓库名
```

---

## 四、初始化 VitePress

### 4.1 安装依赖

```powershell
npm init -y
npm add -D vitepress
```

- `npm init -y`：快速初始化 `package.json`（`-y` 表示全部默认）
- `npm add -D vitepress`：将 VitePress 作为**开发依赖**安装

### 4.2 初始化配置向导

```powershell
npx vitepress init
```

按提示选择：

| 提示                                          | 选择            |
| --------------------------------------------- | --------------- |
| Where should VitePress initialize the config? | `docs`          |
| Site title                                    | 你的站点标题    |
| Site description                              | 站点描述        |
| Theme                                         | `Default Theme` |
| Use TypeScript?                               | `No`            |
| Add VitePress npm scripts?                    | `Yes`           |

### 4.3 本地预览

```powershell
npm run docs:dev
```

浏览器访问 `http://localhost:5173`，确认默认页面正常。

按 `Ctrl + C` 停止服务器。

---

## 五、配置站点（config.mjs）

编辑 `docs/.vitepress/config.mjs`。

### 5.1 关键字段说明

| 字段                  | 含义                                                         |
| --------------------- | ------------------------------------------------------------ |
| `title`               | 浏览器标签页标题                                             |
| `description`         | SEO 描述                                                     |
| `base`                | **URL 基础路径**。若仓库名不是 `用户名.github.io`，必须填写，如 `'/WingedThoughts/'` |
| `themeConfig.nav`     | 顶部导航栏                                                   |
| `themeConfig.sidebar` | 左侧目录树                                                   |
| `locales`             | 国际化（多语言切换）                                         |

### 5.2 完整配置示例（含中英文切换）

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 必须：项目站点需要 base
  base: '/WingedThoughts/',

  // 默认语言
  lang: 'zh-CN',

  // 国际化配置
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: '思翼笔记',
      description: '存放我的思考，追寻知识的本质与生活的优雅',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '笔记', link: '/notes/' },
          { text: '关于', link: '/about' }
        ],
        sidebar: {
          '/notes/': [
            {
              text: '学习笔记',
              items: [
                { text: '数据结构', link: '/notes/data-structure' },
                { text: '离散数学', link: '/notes/discrete-math' },
                { text: '计算机架构', link: '/notes/computer-architecture' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Winged Thoughts',
      description: 'Where I store my thoughts, in search of knowledge and elegance',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Notes', link: '/en/notes/' },
          { text: 'About', link: '/en/about' }
        ],
        sidebar: {
          '/en/notes/': [
            {
              text: 'Notes',
              items: [
                { text: 'Data Structure', link: '/en/notes/data-structure' },
                { text: 'Discrete Math', link: '/en/notes/discrete-math' },
                { text: 'Computer Architecture', link: '/en/notes/computer-architecture' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/你的用户名' }
    ],
    search: {
      provider: 'local'
    }
  }
})
```

> `link` 中的路径**不加 `.md`**，VitePress 会自动映射到对应的 Markdown 文件。

---

## 六、创建内容文件

在 `docs/` 下创建与 `config.mjs` 中 `link` 对应的 `.md` 文件。

### 6.1 目录结构

```
docs/
├── .vitepress/
│   └── config.mjs
├── index.md              # 中文首页
├── about.md              # 中文关于页
├── notes/
│   ├── data-structure.md
│   ├── discrete-math.md
│   └── computer-architecture.md
├── en/
│   ├── index.md          # 英文首页
│   ├── about.md
│   └── notes/
│       ├── data-structure.md
│       ├── discrete-math.md
│       └── computer-architecture.md
```

### 6.2 快速创建文件（PowerShell）

```powershell
mkdir docs
otes, docs\en
otes

echo "# 数据结构`n`n待补充" | Out-File -Encoding utf8 docs
otes\data-structure.md
echo "# 离散数学`n`n待补充" | Out-File -Encoding utf8 docs
otes\discrete-math.md
echo "# 计算机架构`n`n待补充" | Out-File -Encoding utf8 docs
otes\computer-architecture.md
echo "# 关于`n`n待补充" | Out-File -Encoding utf8 docsbout.md

echo "# Winged Thoughts`n`nWelcome" | Out-File -Encoding utf8 docs\en\index.md
echo "# Data Structure`n`nTBD" | Out-File -Encoding utf8 docs\en
otes\data-structure.md
echo "# Discrete Math`n`nTBD" | Out-File -Encoding utf8 docs\en
otes\discrete-math.md
echo "# Computer Architecture`n`nTBD" | Out-File -Encoding utf8 docs\en
otes\computer-architecture.md
echo "# About`n`nTBD" | Out-File -Encoding utf8 docs\enbout.md
```

### 6.3 验证本地效果

```powershell
npm run docs:dev
```

访问 `http://localhost:5173`，检查：

- 首页正常
- 顶部有 **中文 / English** 切换
- 导航链接不 404
- 侧边栏目录正确

---

## 七、提交代码到 GitHub

### 7.1 配置 Git 身份（首次使用需设置）

```powershell
git config --global user.email "你的GitHub注册邮箱"
git config --global user.name "你的GitHub用户名"
```

### 7.2 提交并推送

```powershell
git add .
git commit -m "init vitepress site"
git push origin main
```

---

## 八、配置 GitHub Actions 自动部署

### 8.1 创建工作流文件

创建 `.github\workflows\deploy.yml`：

```powershell
mkdir .github\workflows
New-Item .github\workflows\deploy.yml -ItemType File
```

写入以下内容：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 8.2 确保有 package-lock.json

如果没有，本地执行：

```powershell
npm install
git add package-lock.json
git commit -m "add lock file"
```

### 8.3 推送工作流

```powershell
git add .
git commit -m "add deploy workflow"
git push origin main
```

### 8.4 开启 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**

---

## 九、访问你的网站

部署成功后，访问地址：

```
https://你的用户名.github.io/仓库名/
```

例如：

```
https://Ink-SHEN.github.io/WingedThoughts/
```

---

## 十、后续更新

以后新增或修改笔记，只需三步：

```powershell
# 1. 编辑 docs/ 下的 .md 文件
# 2. 提交
git add .
git commit -m "update notes"
git push origin main
```

GitHub Actions 会自动重新构建并部署，约 1-2 分钟后网站更新。

---

## 附录：常见问题

### Q1：`git commit` 提示 "Author identity unknown"

执行：

```powershell
git config --global user.email "你的邮箱"
git config --global user.name "你的名字"
```

### Q2：`npm ci` 在 Actions 中报错

确保仓库中有 `package-lock.json`。没有则在本地执行 `npm install` 后提交。

### Q3：部署后页面白屏或资源 404

检查 `config.mjs` 中 `base` 是否填写正确：

```js
base: '/你的仓库名/',
```

### Q4：仓库名或用户名修改后怎么办

更新本地远程地址：

```powershell
git remote set-url origin https://github.com/新用户名/新仓库名.git
```

---

> **总成本：0 元。** GitHub Pages 对公开仓库完全免费。