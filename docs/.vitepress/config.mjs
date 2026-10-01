import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/WingedThoughts/', //因为我的仓库名是WingedThoughts，所以要给所有URL加上这样一个前缀
  
  //默认语言
  lang: 'zh-CN',

  //代码高亮：深/浅色模式下统一使用 github-dark 主题（Stripe 风格深色代码块，
  //配色即设计稿中的 #FF7B72/#A5D6FF/#D2A8FF/#8B949E/#79C0FF）
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  },

  //国际化配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title:"Ink的浮思",
      description: '在这里记录我的知识和灵感，寻找知识的本质与生活的优雅',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          // activeMatch 走正则（VitePress 仅在提供该项时按前缀匹配）：
          // 「笔记」排除 reading 子树，避免与「读书笔记」两个项同时高亮
          { text: '笔记', link: '/notes/', activeMatch: '^/notes/(?!reading)' },
          { text: '读书笔记', link: '/notes/reading/', activeMatch: '^/notes/reading/' },
          { text: '关于', link: '/about' }
        ],
        sidebar: {
          '/notes/': [
            {
              text: '笔记',
              items: [
                { text: 'fds', link: '/notes/fds' },
                { text: '线性代数', link: '/notes/linear-algebra' },
                {
                  text: '个人网站搭建',
                  items: [
                    { text: '初步构建', link: '/notes/website/InitialConstruction' },
                    { text: '自定义主题', link: '/notes/website/CustomTheme' },
                    { text: '添加新笔记', link: '/notes/website/NewNote' }
                  ]
                },
                {
                  text: '读书笔记',
                  items: [
                    { text: '总目录', link: '/notes/reading/' },
                    {
                      text: '新教伦理与资本主义精神',
                      items: [
                        { text: '一、韦伯的问题', link: '/notes/reading/the-protestant-ethic/01-the-problem' },
                        { text: '二、路德的天职观', link: '/notes/reading/the-protestant-ethic/02-luther-and-beruf' },
                        { text: '三、加尔文宗与入世禁欲', link: '/notes/reading/the-protestant-ethic/03-calvinism-and-innerworldly-asceticism' },
                        { text: '四、从禁欲到铁笼', link: '/notes/reading/the-protestant-ethic/04-from-asceticism-to-iron-cage' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        } 
      },
    },
    'en': {
      label: 'English',
      lang: 'en-US',
      title: "Ink's Winged Thoughts",
      description: 'Here I store my knowledge and ideas, in search of knowledge’s heart and life’s elegance',
      link: '/en/',
      themeConfig: {
        nav: [
          {text: 'home', link: '/en/'},
          {text: 'notes', link: '/en/notes/', activeMatch: '^/en/notes/(?!reading)'},
          {text: 'reading notes', link: '/en/notes/reading/', activeMatch: '^/en/notes/reading/'},
          {text: 'about', link: '/en/about'}
        ],
        sidebar: {
          '/en/notes/': [
            {
              text: 'Notes',
              items: [
                { text: 'fds', link: '/en/notes/fds' },
                { text: 'Linear Algebra', link: '/en/notes/linear-algebra' },
                {
                  text: 'Personal Website Construction',
                  items: [
                    { text: 'Initial Construction', link: '/en/notes/website/InitialConstruction' },
                    { text: 'Custom Theme', link: '/en/notes/website/CustomTheme' },
                    { text: 'Adding a New Note', link: '/en/notes/website/NewNote' }
                  ]
                },
                {
                  text: 'Reading Notes',
                  items: [
                    { text: 'Index', link: '/en/notes/reading/' },
                    {
                      text: 'The Protestant Ethic and the Spirit of Capitalism',
                      items: [
                        { text: 'I. Weber\u2019s Question', link: '/en/notes/reading/the-protestant-ethic/01-the-problem' },
                        { text: 'II. Luther and the Calling', link: '/en/notes/reading/the-protestant-ethic/02-luther-and-beruf' },
                        { text: 'III. Calvinism and Innerworldly Asceticism', link: '/en/notes/reading/the-protestant-ethic/03-calvinism-and-innerworldly-asceticism' },
                        { text: 'IV. From Asceticism to the Iron Cage', link: '/en/notes/reading/the-protestant-ethic/04-from-asceticism-to-iron-cage' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ink-SHEN/WingedThoughts'}
    ],
    search: {
      provider: 'local'
    }
  }

})
