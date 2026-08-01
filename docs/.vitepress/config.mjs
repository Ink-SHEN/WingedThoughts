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
          { text: '笔记', link: '/notes/' },
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
                    { text: '初步构建', link: '/notes/website/InitialConstuction' },
                    { text: '自定义主题', link: '/notes/website/CustomTheme' }
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
          {text: 'notes', link: '/en/notes/'},
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
                    { text: 'Initial Construction', link: '/en/notes/website/InitialConstuction' },
                    { text: 'Custom Theme', link: '/en/notes/website/CustomTheme' }
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
