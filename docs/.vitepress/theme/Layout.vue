<script setup>
// 自定义 Layout：
// 1. 滚动超过 50px 给 <html> 加 .scrolled，驱动导航栏 透明 → M3 surface
// 2. 通过 home-hero-before 插槽注入 <picture> 响应式背景图层（AVIF/WebP/JPEG）
//    + LQIP 渐进式占位 + 加载完成淡入
// 3. home-hero-actions-after 插槽注入向下滚动指示箭头
// 4. Material 涟漪：pointerdown 委托，向按钮/卡片注入 .md-ripple（样式在 custom.css §10）
// 5. 滚动入场：IntersectionObserver 给 Feature / note-card 加 .md-in（错落 stagger）
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import { buildSrcSet, FALLBACK_JPG, HERO_LQIP, WIDTHS } from './hero-bg.js'

const { Layout } = DefaultTheme
const route = useRoute()

const SCROLL_THRESHOLD = 50
const bgLoaded = ref(false)

const onScroll = () => {
  document.documentElement.classList.toggle(
    'scrolled',
    window.scrollY > SCROLL_THRESHOLD
  )
}

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---- Material 涟漪：document 级 pointerdown 委托 ----
   路由切换后无需重新绑定；JS 只创建/销毁 span，动画全部交给 CSS。 */
const RIPPLE_HOST =
  '.VPHome .VPHero .VPButton, .vp-doc a.note-card, .VPDocFooter .pager-link'

const onPointerDown = (e) => {
  if (reduceMotion()) return
  const el = e.target.closest?.(RIPPLE_HOST)
  if (!el) return
  const rect = el.getBoundingClientRect()
  const d = Math.max(rect.width, rect.height) * 2.2
  const ripple = document.createElement('span')
  ripple.className = 'md-ripple'
  ripple.style.width = ripple.style.height = `${d}px`
  ripple.style.left = `${e.clientX - rect.left - d / 2}px`
  ripple.style.top = `${e.clientY - rect.top - d / 2}px`
  el.appendChild(ripple)
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
}

/* ---- 滚动入场：进入视口播放 md-rise，按序号 stagger ----
   关于页（.vp-doc.about）自带入场动画，不参与，避免双重动效。 */
const REVEAL_SELECTOR = '.VPHome .VPFeature, .vp-doc:not(.about) .note-card'
let io = null

const setupReveal = () => {
  io?.disconnect()
  io = null
  if (reduceMotion()) return
  const targets = document.querySelectorAll(REVEAL_SELECTOR)
  if (!targets.length) return
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('md-in')
          io.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  )
  targets.forEach((el, i) => {
    el.classList.add('md-reveal')
    el.style.setProperty('--md-reveal-delay', `${Math.min(i * 70, 280)}ms`)
    io.observe(el)
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('pointerdown', onPointerDown, { passive: true })
  setupReveal()
})

/* VitePress 是 SPA：路由切换后新页面的卡片需要重新登记入场动画 */
watch(
  () => route.path,
  () => nextTick(setupReveal)
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('pointerdown', onPointerDown)
  io?.disconnect()
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
