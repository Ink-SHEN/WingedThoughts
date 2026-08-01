// 自定义主题入口：继承 VitePress 默认主题，叠加自定义 Layout 与全局样式
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout
}
