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

/* ---- Liquid Glass 按钮：镜面高光跟随指针 ----
   用 document 级委托，路由切换后无需重新绑定。
   只写 CSS 变量，动画交给 CSS，避免每帧操作样式引起的额外回流。 */
const HERO_BUTTON = '.VPHome .VPHero .VPButton'
let rafId = 0
let pending = null

const flushPointer = () => {
  rafId = 0
  if (!pending) return
  const { el, x, y } = pending
  pending = null
  el.style.setProperty('--lg-gx', `${x}%`)
  el.style.setProperty('--lg-gy', `${y}%`)
}

const trackPointer = (el, clientX, clientY) => {
  const r = el.getBoundingClientRect()
  pending = {
    el,
    x: ((clientX - r.left) / r.width) * 100,
    y: ((clientY - r.top) / r.height) * 100
  }
  if (!rafId) rafId = requestAnimationFrame(flushPointer)
}

const onPointerMove = (e) => {
  // 触摸设备没有"悬停"，且高光会跟着手指乱跳，只对鼠标/触控笔生效
  if (e.pointerType === 'touch') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.target.closest?.(HERO_BUTTON)
  if (el) trackPointer(el, e.clientX, e.clientY)
}

// 指针进入时先定位，避免光斑从上一位置飘过来
const onPointerOver = (e) => {
  if (e.pointerType === 'touch') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.target.closest?.(HERO_BUTTON)
  if (el) trackPointer(el, e.clientX, e.clientY)
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerover', onPointerOver, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerover', onPointerOver)
  if (rafId) cancelAnimationFrame(rafId)
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
