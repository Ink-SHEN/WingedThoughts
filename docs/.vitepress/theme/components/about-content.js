/**
 * 关于页双语文案
 * -----------------------------------------------------------------------------
 * 中英两套文案结构完全一致，字段一一对应，由 AboutPage.vue 按 locale 取值渲染。
 * 新增字段时务必两套同时补 —— 否则渲染会静默缺内容。
 *
 * 双语手法：每个语种都用「另一种语言」做眉标与字母组合，
 * 与首页「中文站用英文大标题、英文站保留中文装饰」的镜像关系保持一致。
 */

/** GitHub 主页（两个语种共用） */
export const GITHUB_URL = 'https://github.com/Ink-SHEN'

export const aboutContent = {
  zh: {
    /* 眉标用英文、字母组合用汉字「墨」 */
    eyebrow: 'About',
    eyebrowCjk: false,
    monogram: '墨',
    monogramLatin: false,
    title: '关于',
    lede: '记录知识、灵感与思考的个人空间',

    me: {
      id: 'about-me',
      heading: '我',
      paragraphs: [
        '浙江大学的某个人，25 届人工智能专业。脑子里的想法总是跑得比手快，想找个地方把它们按下来 —— 这个站点就是这么来的。',
        '目前主要在学习机器学习与数学基础，也在慢慢摸索怎么把学到的东西讲明白。讲不明白的地方，通常就是还没真懂的地方。'
      ],
      facts: [
        { label: '学校', value: '浙江大学' },
        { label: '专业', value: '人工智能' },
        { label: '届别', value: '2025 届' }
      ]
    },

    site: {
      id: 'about-site',
      heading: '这个网站',
      paragraphs: [
        '这儿是我的公共笔记本：想到什么就写什么，所以会很杂。内容尽量中英双语并行 —— 逼自己把同一个概念用两种语言各讲一遍。'
      ],
      quote: '首页的设计私心，是想让每次打开网站都先看见自己拍的照片。',
      image: {
        alt: '日落时分的跨海大桥：暖橙色的天光压在靛蓝的海面上，桥塔与缆索呈深色剪影',
        caption: '首页的全屏背景，也是我拍的照片 —— 跨海大桥的日落。'
      }
    },

    writing: {
      id: 'about-writing',
      heading: '正在写什么',
      notes: [
        { glyph: '{ }', title: 'fds', desc: '数据结构与算法基础', href: '/notes/fds' },
        { glyph: '∑', title: '线性代数', desc: '向量、矩阵与空间的语言', href: '/notes/linear-algebra' },
        {
          glyph: 'W',
          title: '个人网站搭建',
          desc: '从 VitePress 到 GitHub Pages 的全过程',
          href: '/notes/website/InitialConstruction'
        }
      ]
    },

    contact: {
      id: 'about-contact',
      heading: '联系我',
      title: 'GitHub',
      handle: 'Ink-SHEN',
      newWindowHint: '（在新窗口打开）'
    }
  },

  en: {
    /* 镜像：眉标用汉字、字母组合用拉丁文「Ink」 */
    eyebrow: '关于',
    eyebrowCjk: true,
    monogram: 'Ink',
    monogramLatin: true,
    title: 'About',
    lede: 'A personal space for knowledge, ideas and reflections',

    me: {
      id: 'about-me',
      heading: 'Me',
      paragraphs: [
        'Someone at Zhejiang University, class of 2025, majoring in artificial intelligence. My thoughts tend to run faster than my hands, so I wanted somewhere to pin them down — that is how this site came to be.',
        "Right now I am mostly working through machine learning and the mathematics underneath it, slowly figuring out how to explain what I have learned. The parts I cannot explain are usually the parts I have not really understood."
      ],
      facts: [
        { label: 'University', value: 'Zhejiang University' },
        { label: 'Major', value: 'Artificial Intelligence' },
        { label: 'Class', value: '2025' }
      ]
    },

    site: {
      id: 'about-site',
      heading: 'This Site',
      paragraphs: [
        'A public notebook: I write whatever comes to mind, so expect it to be messy. Posts aim for Chinese–English bilingual parity — forcing myself to explain the same concept once in each language.'
      ],
      quote: 'The home page is designed, selfishly, so that I get to see a photo I took every single time I open the site.',
      image: {
        alt: 'A sea-crossing bridge at sunset: warm orange light pressing down on an indigo sea, the pylons and cables rendered in dark silhouette',
        caption: 'The full-bleed background of the home page — a photo I took of the sea-crossing bridge at sunset.'
      }
    },

    writing: {
      id: 'about-writing',
      heading: "What I'm Writing",
      notes: [
        { glyph: '{ }', title: 'fds', desc: 'Data structures and algorithms fundamentals', href: '/en/notes/fds' },
        { glyph: '∑', title: 'Linear Algebra', desc: 'The language of vectors, matrices and space', href: '/en/notes/linear-algebra' },
        {
          glyph: 'W',
          title: 'Personal Website Construction',
          desc: 'From VitePress to GitHub Pages, end to end',
          href: '/en/notes/website/InitialConstruction'
        }
      ]
    },

    contact: {
      id: 'about-contact',
      heading: 'Contact Me',
      title: 'GitHub',
      handle: 'Ink-SHEN',
      newWindowHint: '(opens in a new window)'
    }
  }
}
