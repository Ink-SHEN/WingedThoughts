<script setup>
/**
 * 关于页内容组件（中英双语共用）
 * -----------------------------------------------------------------------------
 * 用法：<AboutPage locale="zh" />  /  <AboutPage locale="en" />
 * 文案在 ./about-content.js，两套结构一一对应；本文件只负责结构 + 样式。
 *
 * 设计来源：完整复用 docs/.vitepress/theme/custom.css 中已建立的视觉体系
 *   · 字体     --font-serif / --font-sans / --font-cjk-display（首页 Hero 同款字阶）
 *   · 色彩     --vp-c-brand-1/2/3、--vp-c-accent、--vp-c-text-1/2/3、--vp-c-border
 *   · 圆角     12（事实卡）/ 14（图片、卡片）/ 18（按钮与字母组合）
 *   · 间距     8 / 12 / 16 / 24 / 32 / 48（与 .note-cards、.VPDocFooter 同源）
 *   · 动效     cubic-bezier(0.22, 1, 0.36, 1)，与首页 hero-rise、卡片 hover 一致
 *
 * 复用方式：根节点带 class="vp-doc"，直接继承站内已定义的
 *   .vp-doc p / h1 / h2 / blockquote / a 以及 .note-cards / .note-card /
 *   .note-card-glyph 等既有组件样式，本文件只写「关于页特有」的增量规则。
 *
 * 无障碍：单一 h1、section 用 aria-labelledby 关联标题、装饰元素 aria-hidden、
 *         外链 target=_blank 配 rel=noopener+noreferrer 与读屏提示、图片含 alt。
 */
import { computed } from 'vue'
import { withBase } from 'vitepress'
// 复用首页 Hero 背景图的响应式 srcset 构建器（AVIF/WebP/JPEG + withBase 前缀）
import { buildSrcSet, FALLBACK_JPG } from '../hero-bg.js'
import { aboutContent, GITHUB_URL } from './about-content.js'

const props = defineProps({
  /** 'zh'（默认）| 'en' —— 与 docs/ 下的 locale 目录保持一致 */
  locale: {
    type: String,
    default: 'zh',
    validator: (v) => v === 'zh' || v === 'en'
  }
})

const c = computed(() => aboutContent[props.locale])
</script>

<template>
  <article class="vp-doc about">
    <!-- 页头：眉标 + 字母组合 + 衬线主标题 + 导语（字阶与首页 Hero 同源） -->
    <header class="about-head">
      <p class="about-eyebrow" :class="{ 'about-eyebrow--cjk': c.eyebrowCjk }">{{ c.eyebrow }}</p>
      <div class="about-head-main">
        <span
          class="about-monogram"
          :class="{ 'about-monogram--latin': c.monogramLatin }"
          aria-hidden="true"
        >{{ c.monogram }}</span>
        <div class="about-head-text">
          <h1 class="about-title">{{ c.title }}</h1>
          <p class="about-lede">{{ c.lede }}</p>
        </div>
      </div>
    </header>

    <!-- 我 / Me -->
    <section class="about-section" :aria-labelledby="c.me.id">
      <h2 :id="c.me.id">{{ c.me.heading }}</h2>
      <p v-for="(para, i) in c.me.paragraphs" :key="i">{{ para }}</p>

      <dl class="about-facts">
        <div v-for="fact in c.me.facts" :key="fact.label" class="about-fact">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- 这个网站 / This Site -->
    <section class="about-section" :aria-labelledby="c.site.id">
      <h2 :id="c.site.id">{{ c.site.heading }}</h2>
      <p v-for="(para, i) in c.site.paragraphs" :key="i">{{ para }}</p>
      <blockquote>
        <p>{{ c.site.quote }}</p>
      </blockquote>

      <figure class="about-figure">
        <picture>
          <source type="image/avif" :srcset="buildSrcSet('avif')" sizes="(max-width: 768px) 100vw, 752px">
          <source type="image/webp" :srcset="buildSrcSet('webp')" sizes="(max-width: 768px) 100vw, 752px">
          <img
            :src="FALLBACK_JPG"
            :srcset="buildSrcSet('jpg')"
            sizes="(max-width: 768px) 100vw, 752px"
            loading="lazy"
            decoding="async"
            width="2560"
            height="1440"
            :alt="c.site.image.alt"
          >
        </picture>
        <figcaption>{{ c.site.image.caption }}</figcaption>
      </figure>
    </section>

    <!-- 正在写什么 / What I'm Writing：直接复用站内 .note-cards 卡片组件 -->
    <section class="about-section" :aria-labelledby="c.writing.id">
      <h2 :id="c.writing.id">{{ c.writing.heading }}</h2>
      <ul class="note-cards about-cards">
        <li v-for="note in c.writing.notes" :key="note.href">
          <a class="note-card" :href="withBase(note.href)">
            <span class="note-card-glyph" aria-hidden="true">{{ note.glyph }}</span>
            <span class="note-card-body">
              <span class="note-card-title">{{ note.title }}</span>
              <span class="note-card-desc">{{ note.desc }}</span>
            </span>
            <span class="note-card-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </section>

    <!-- 联系我 / Contact Me -->
    <section class="about-section" :aria-labelledby="c.contact.id">
      <h2 :id="c.contact.id">{{ c.contact.heading }}</h2>
      <ul class="note-cards about-cards">
        <li>
          <a
            class="note-card"
            :href="GITHUB_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="note-card-glyph note-card-glyph--icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" focusable="false">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </span>
            <span class="note-card-body">
              <span class="note-card-title">
                {{ c.contact.title }}
                <span class="sr-only">{{ c.contact.newWindowHint }}</span>
              </span>
              <span class="note-card-desc">{{ c.contact.handle }}</span>
            </span>
            <span class="note-card-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
/* ==========================================================================
   关于页增量样式（中英共用）
   只写「.vp-doc 里没有」的规则：页头、事实卡、图片说明、列表重置、入场动效。
   颜色 / 字体 / 圆角 / 间距全部走 custom.css 的设计 token，不新增色值。
   ========================================================================== */

/* ---------- 页头 ---------- */
.about-eyebrow {
  margin: 0 0 20px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* 汉字眉标（英文页）：不加 uppercase，改用楷体 + 更宽的字距。
   与首页 Hero 中文装饰行（0.18em）同一档。 */
.about-eyebrow--cjk {
  font-family: var(--font-cjk-display);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.32em;
  text-transform: none;
}

.about-head-main {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 字母组合：把 .note-card-glyph 的圆角方形放大到 72px，
   圆角 18px 与首页 Hero 按钮一致，配色沿用品牌蓝描边语言 */
.about-monogram {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  font-family: var(--font-cjk-display);
  font-size: 32px;
  line-height: 1;
  color: var(--vp-c-brand-2);
  background: rgba(107, 141, 212, 0.06);
  border: 1px solid rgba(107, 141, 212, 0.22);
  border-radius: 18px;
}

/* 浅色模式：字形换用 brand-3（与首页 h1 在 light 下的深色品牌色同档）。
   brand-2(#6b8dd4) 在淡底加 6% 同色底上实测 ~2.96:1，刚好低于
   WCAG 1.4.11 图形对象 3:1 阈值；brand-3(#3a5a8c) 实测 ~6.25:1 通过。
   装饰元素 aria-hidden=true 严格说不强制，但字形承担「作者识别」语义，
   仍按 3:1 兜底。 */
html:not(.dark) .about-monogram {
  color: var(--vp-c-brand-3);
}

/* 拉丁字母组合（英文页的 "Ink"）：三字符较宽，字号下调一档 */
.about-monogram--latin {
  font-size: 24px;
  letter-spacing: -0.01em;
}

/* 主标题：首页 Hero .name 的字阶缩小版（Hero 为 clamp(2.6,6vw,4.6)） */
.about-title {
  margin: 0;
  font-size: clamp(2rem, 4.4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.15;
}

/* 导语：与首页 Hero .tagline 同源 —— 霞鹜文楷 + 0.05em 字距 */
.about-lede {
  margin: 12px 0 0;
  font-family: var(--font-cjk-display);
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
}

/* ---------- 事实卡（学校 / 专业 / 届别） ---------- */
.about-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 32px 0 0;
  padding: 0;
}

.about-fact {
  padding: 16px 18px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
}

.about-fact dt {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.about-fact dd {
  margin: 6px 0 0;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

/* ---------- 图片与图注 ---------- */
.about-figure {
  margin: 32px 0 0;
}

.about-figure img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
}

.about-figure figcaption {
  margin-top: 12px;
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.6;
  /* 取 text-2 而非站点通用的 text-3：图注是对图片的语义补充（非纯元信息），
     在 light 下 text-3 实测 ~2.45:1 不达 AA 4.5:1；text-2 实测 ~7.25:1 通过。
     dark 下 text-3 已 ~4.02:1，保留站点通用色。 */
  color: var(--vp-c-text-2);
}
html.dark .about-figure figcaption {
  color: var(--vp-c-text-3);
}

/* ---------- 卡片列表：复用 .note-cards，仅重置 ul 默认样式 ---------- */
.about-cards {
  list-style: none;
  padding: 0;
  margin: 32px 0;
}

.about-cards > li {
  display: flex;
}

.about-cards > li > .note-card {
  width: 100%;
}

/* SVG 图标型字形（GitHub）：与 .note-card-glyph 同尺寸同质感 */
.note-card-glyph--icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- 焦点可见：键盘可达（沿用站内品牌色双环语言） ---------- */
.about a:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--vp-c-bg),
    0 0 0 4px var(--vp-c-brand-1);
}

/* ---------- 仅供读屏的补充说明 ---------- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---------- 入场动效：与首页 hero-rise 同缓动，逐级 stagger ---------- */
@keyframes about-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-eyebrow,
.about-head-main,
.about-section {
  animation: about-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.about-eyebrow { animation-delay: 0.05s; }
.about-head-main { animation-delay: 0.12s; }
.about-section:nth-of-type(1) { animation-delay: 0.2s; }
.about-section:nth-of-type(2) { animation-delay: 0.28s; }
.about-section:nth-of-type(3) { animation-delay: 0.36s; }
.about-section:nth-of-type(4) { animation-delay: 0.44s; }

/* ---------- 响应式：留白与尺寸收敛 ---------- */
@media (max-width: 640px) {
  .about-head-main {
    gap: 16px;
  }
  .about-monogram {
    width: 60px;
    height: 60px;
    font-size: 26px;
    border-radius: 16px;
  }
  .about-monogram--latin {
    font-size: 20px;
  }
  .about-eyebrow--cjk {
    letter-spacing: 0.24em;
  }
  .about-lede {
    font-size: 1rem;
  }
  /* 单列堆叠，保持 8px 基线节奏 */
  .about-facts {
    grid-template-columns: 1fr;
  }
}

/* 减少动效：直接呈现终态，不做位移 */
@media (prefers-reduced-motion: reduce) {
  .about-eyebrow,
  .about-head-main,
  .about-section,
  .about a {
    animation: none;
    transition: none;
  }
}
</style>
