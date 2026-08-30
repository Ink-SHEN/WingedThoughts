<script setup>
// 自定义 Layout：
// 1. 滚动超过 50px 给 <html> 加 .scrolled，驱动导航栏 透明 → Liquid Glass
// 2. 通过 home-hero-before 插槽注入 <picture> 响应式背景图层（AVIF/WebP/JPEG）
//    + LQIP 渐进式占位 + 加载完成淡入
// 3. home-hero-actions-after 插槽注入向下滚动指示箭头
import DefaultTheme from 'vitepress/theme'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { buildSrcSet, FALLBACK_JPG, HERO_LQIP, WIDTHS } from './hero-bg.js'

const { Layout } = DefaultTheme

const SCROLL_THRESHOLD = 50
const bgLoaded = ref(false)

const onScroll = () => {
  document.documentElement.classList.toggle(
    'scrolled',
    window.scrollY > SCROLL_THRESHOLD
  )
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Layout>
    <!-- 响应式背景图：AVIF → WebP → JPEG 回退，sizes=100vw，高优先级加载
         注意：必须挂在 home-hero-info-before（渲染在 .VPHero 内部），
         home-hero-before 会渲染成 .VPHero 的兄弟节点，inset:0 会锚错元素 -->
    <template #home-hero-info-before>
      <div class="hero-bg-layer" aria-hidden="true">
        <!-- LQIP 占位：内联 data URI，零额外请求，模糊放大作为淡入前的底 -->
        <div
          class="hero-bg-lqip"
          :style="{ backgroundImage: `url(${HERO_LQIP})` }"
        />
        <picture>
          <source
            type="image/avif"
            :srcset="buildSrcSet('avif')"
            sizes="100vw"
          >
          <source
            type="image/webp"
            :srcset="buildSrcSet('webp')"
            sizes="100vw"
          >
          <img
            :src="FALLBACK_JPG"
            :srcset="buildSrcSet('jpg')"
            sizes="100vw"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            alt=""
            :class="['hero-bg-img', { loaded: bgLoaded }]"
            @load="bgLoaded = true"
          >
        </picture>
        <!-- 渐变遮罩：绘制在图片之上、文字之下 -->
        <div class="hero-bg-overlay" />
      </div>
    </template>

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
