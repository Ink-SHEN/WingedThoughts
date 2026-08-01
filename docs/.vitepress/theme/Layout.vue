<script setup>
// 自定义 Layout：
// 1. 滚动超过 50px 给 <html> 加 .scrolled，驱动导航栏 透明 → Liquid Glass
// 2. 通过 withBase() 注入 hero 背景图路径（兼容 base: '/WingedThoughts/' 前缀）
// 3. home-hero-actions-after 插槽注入向下滚动指示箭头
import DefaultTheme from 'vitepress/theme'
import { withBase } from 'vitepress'
import { onMounted, onBeforeUnmount } from 'vue'

const { Layout } = DefaultTheme

const SCROLL_THRESHOLD = 50

const onScroll = () => {
  document.documentElement.classList.toggle(
    'scrolled',
    window.scrollY > SCROLL_THRESHOLD
  )
}

onMounted(() => {
  // 把带 base 前缀的背景图路径写入 CSS 变量，custom.css 中通过 var(--hero-bg-image) 使用
  document.documentElement.style.setProperty(
    '--hero-bg-image',
    `url("${withBase('/images/hero-bg.jpg')}")`
  )
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Layout>
    <!-- 渲染在首页 hero 按钮组之后，仅 home 布局生效 -->
    <template #home-hero-actions-after>
      <div class="scroll-indicator" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </template>
  </Layout>
</template>
