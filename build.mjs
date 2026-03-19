/**
 * TRADITIONAL RECORDS — Build Pipeline
 * ─────────────────────────────────────
 * 1. Convert all JPG/PNG images → WebP (60–80% smaller)
 * 2. Minify CSS (clean-css)
 * 3. Minify JS  (terser)
 * 4. Patch HTML  — update image src → .webp, add loading/fetchpriority attrs
 * 5. Copy everything else as-is → dist/
 */

import sharp from 'sharp';
import { minify as terserMinify } from 'terser';
import CleanCSS from 'clean-css';
import {
  readFileSync, writeFileSync, mkdirSync,
  copyFileSync, readdirSync, existsSync, rmSync
} from 'fs';
import { join, extname, basename } from 'path';

const SRC  = '.';
const DIST = './dist';

// ── Helpers ─────────────────────────────────────────────────────────────────
const log  = (emoji, msg) => console.log(`${emoji}  ${msg}`);
const read  = (p) => readFileSync(p, 'utf8');
const write = (p, c) => { mkdirSync(DIST, { recursive: true }); writeFileSync(p, c); };

// ── 1. Clean dist ────────────────────────────────────────────────────────────
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST);
log('🗑️', 'Cleaned dist/');

// ── 2. Image → WebP conversion ───────────────────────────────────────────────
const IMAGES = readdirSync(SRC).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

const imageMap = {}; // original → webp filename

for (const img of IMAGES) {
  const src  = join(SRC, img);
  const name = basename(img, extname(img));
  const dest = join(DIST, `${name}.webp`);

  try {
    const sharpImg = sharp(src);
    const meta = await sharpImg.metadata();
    const w = meta.width || 9999;

    // Hero images (>1200px wide) → resize to 1440px max, quality 82
    // Smaller images → quality 85, no resize
    if (w > 1200) {
      await sharp(src)
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(dest);
    } else {
      await sharp(src)
        .webp({ quality: 85, effort: 6 })
        .toFile(dest);
    }

    const srcKB  = Math.round(readFileSync(src).length   / 1024);
    const destKB = Math.round(readFileSync(dest).length  / 1024);
    const saved  = Math.round((1 - destKB / srcKB) * 100);
    log('🖼️', `${img} → ${name}.webp  ${srcKB}KB → ${destKB}KB  (${saved}% kleiner)`);

    imageMap[img] = `${name}.webp`;
  } catch (err) {
    log('⚠️', `Kon ${img} niet converteren: ${err.message}`);
    copyFileSync(src, join(DIST, img));
    imageMap[img] = img;
  }
}

// ── Keep WebP files already there ────────────────────────────────────────────
const WEBPS = readdirSync(SRC).filter(f => /\.webp$/i.test(f));
for (const w of WEBPS) {
  const src  = join(SRC, w);
  const dest = join(DIST, w);
  try {
    // Re-compress existing WebPs slightly
    await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dest);
    const srcKB  = Math.round(readFileSync(src).length  / 1024);
    const destKB = Math.round(readFileSync(dest).length / 1024);
    log('🖼️', `${w} → recompressed  ${srcKB}KB → ${destKB}KB`);
  } catch {
    copyFileSync(src, dest);
  }
}

// ── Optimize logo.png separately (keep as PNG for transparency) ──────────────
try {
  await sharp(join(SRC, 'logo.png'))
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(DIST, 'logo.png'));
  log('🏷️', 'logo.png → optimized PNG');
} catch {
  copyFileSync(join(SRC, 'logo.png'), join(DIST, 'logo.png'));
}

// ── 3. Minify CSS ────────────────────────────────────────────────────────────
const cssResult = new CleanCSS({
  level: { 1: { specialComments: 0 }, 2: { all: true } },
  sourceMap: false
}).minify(read(join(SRC, 'style.css')));

const cssOrigKB = Math.round(readFileSync(join(SRC, 'style.css')).length / 1024);
write(join(DIST, 'style.css'), cssResult.styles);
const cssMinKB  = Math.round(readFileSync(join(DIST, 'style.css')).length / 1024);
log('🎨', `style.css  ${cssOrigKB}KB → ${cssMinKB}KB`);

// ── 4. Minify JS ─────────────────────────────────────────────────────────────
const jsResult = await terserMinify(read(join(SRC, 'script.js')), {
  compress: { drop_console: false, passes: 2 },
  mangle: true,
  format: { comments: false }
});

const jsOrigKB = Math.round(readFileSync(join(SRC, 'script.js')).length / 1024);
write(join(DIST, 'script.js'), jsResult.code);
const jsMinKB  = Math.round(readFileSync(join(DIST, 'script.js')).length / 1024);
log('⚙️', `script.js  ${jsOrigKB}KB → ${jsMinKB}KB`);

// ── sw.js minify ─────────────────────────────────────────────────────────────
const swResult = await terserMinify(read(join(SRC, 'sw.js')), {
  compress: true, mangle: true, format: { comments: false }
});
write(join(DIST, 'sw.js'), swResult.code);
log('⚙️', 'sw.js → minified');

// ── 5. Process HTML files ─────────────────────────────────────────────────────
const HTML_FILES = readdirSync(SRC).filter(f => f.endsWith('.html'));

for (const file of HTML_FILES) {
  let html = read(join(SRC, file));

  // Replace image references .jpg/.jpeg/.png → .webp (where converted)
  for (const [orig, webp] of Object.entries(imageMap)) {
    // Use regex to replace only in src/srcset/content attrs, not in text
    html = html.replaceAll(orig, webp);
  }

  // Add loading="lazy" to images that don't have it and aren't above-fold heroes
  html = html.replace(/<img(?![^>]*loading=)([^>]*)(src="(?!https?:\/\/)([^"]+))"/g,
    (match, before, srcAttr) => {
      // Skip slide hero images (they should eager-load)
      if (match.includes('slide') || match.includes('hero-img') || match.includes('first.webp')) return match;
      return match.replace('<img', '<img loading="lazy"');
    }
  );

  // Add fetchpriority="high" to first hero slide image
  html = html.replace(
    /(<img[^>]*)(first\.webp|first\.jpg)([^>]*>)/,
    '$1$2$3'.replace('$2', 'first.webp').replace('<img', '<img fetchpriority="high"')
  );

  // Add resource hints before </head>
  const HINTS = `
  <!-- Performance: resource hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://is1-ssl.mzstatic.com">
  <link rel="dns-prefetch" href="https://itunes.apple.com">`;

  if (!html.includes('dns-prefetch')) {
    html = html.replace('</head>', HINTS + '\n</head>');
  }

  write(join(DIST, file), html);
}
log('📄', `${HTML_FILES.length} HTML bestanden verwerkt`);

// ── 6. Copy remaining static files ───────────────────────────────────────────
const COPY_EXTS = ['.svg', '.css', '.txt', '.xml', '.json', '.ico', '.webmanifest'];
const COPY_FILES = ['google-fonts.css', 'favicon.svg', 'CNAME'].filter(f => existsSync(join(SRC, f)));

// Also copy .github workflows etc aren't needed in dist
for (const f of COPY_FILES) {
  copyFileSync(join(SRC, f), join(DIST, f));
}
log('📁', 'Statische bestanden gekopieerd');

// ── 7. Generate webmanifest ───────────────────────────────────────────────────
const manifest = {
  name: "Traditional Records",
  short_name: "Trad. Records",
  description: "Surinaamse heritage muziek — vinyl, CD & digitaal",
  start_url: "/",
  display: "standalone",
  background_color: "#050505",
  theme_color: "#ff4500",
  icons: [
    { src: "logo.png", sizes: "192x192", type: "image/png" },
    { src: "logo.png", sizes: "512x512", type: "image/png" }
  ]
};
write(join(DIST, 'site.webmanifest'), JSON.stringify(manifest));
log('📱', 'site.webmanifest aangemaakt');

// ── 8. Summary ────────────────────────────────────────────────────────────────
const totalSrc  = IMAGES.reduce((s, f) => s + readFileSync(join(SRC, f)).length, 0);
const totalDist = readdirSync(DIST).reduce((s, f) => {
  try { return s + readFileSync(join(DIST, f)).length; } catch { return s; }
}, 0);

console.log('\n═══════════════════════════════════════════');
log('✅', `Build klaar!`);
log('📦', `dist/ totaal: ~${Math.round(totalDist / 1024)}KB`);
console.log('═══════════════════════════════════════════\n');
