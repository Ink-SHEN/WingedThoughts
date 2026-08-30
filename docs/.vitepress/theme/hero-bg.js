/**
 * Hero 背景图响应式 srcset 构建器。
 *
 * 产物由 scripts/optimize-hero-bg.py 生成在 docs/public/images/hero/ 下，
 * 本模块负责组装 <picture> 所需的 srcset 字符串与 LQIP data URI。
 *
 * 路径通过 withBase() 注入 base 前缀（兼容 /WingedThoughts/ 部署路径），
 * 因此本文件不硬编码任何绝对 URL。
 */

import { withBase } from 'vitepress'
import { HERO_LQIP } from './hero-lqip.js'

/** 各档位宽度（必须与 optimize-hero-bg.py 的 WIDTHS 一致） */
export const WIDTHS = [640, 960, 1280, 1920, 2560]

/** 图片目录（相对于站点根） */
const DIR = '/images/hero/'

/**
 * 为指定格式构建 srcset 字符串，例如：
 *   "/WingedThoughts/images/hero/hero-640.avif 640w,
 *    /WingedThoughts/images/hero/hero-960.avif 960w, ..."
 */
export function buildSrcSet(format) {
  return WIDTHS.map((w) => `${withBase(`${DIR}hero-${w}.${format}`)} ${w}w`).join(', ')
}

/** 默认回退图（最大尺寸 JPEG） */
export const FALLBACK_JPG = withBase(`${DIR}hero-${WIDTHS[WIDTHS.length - 1]}.jpg`)

/** LQIP 内联占位图 data URI */
export { HERO_LQIP }
