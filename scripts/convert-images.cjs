const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const SRC = path.join(__dirname, '../public/images/products')
const OUT = path.join(__dirname, '../public/images/products')

// Card images: 800px wide is plenty for 300-400px CSS cards on HiDPI
// Hero/lifestyle: 1200px for full-width use
const CARD_W  = 800
const HERO_W  = 1200

const heroFiles = ['hero-lifestyle.jpg', 'hero-open.jpg', 'bundle-hero.jpg', 'old-vs-new.jpg']

async function convert(file) {
  const src  = path.join(SRC, file)
  const name = path.basename(file, path.extname(file))
  const isHero = heroFiles.includes(file)
  const w = isHero ? HERO_W : CARD_W
  const dest = path.join(OUT, `${name}.webp`)

  if (fs.existsSync(dest)) {
    const origStat = fs.statSync(src)
    const destStat = fs.statSync(dest)
    if (destStat.mtimeMs > origStat.mtimeMs) {
      console.log(`SKIP  ${file} (webp up-to-date)`)
      return
    }
  }

  const before = fs.statSync(src).size
  await sharp(src)
    .resize(w, null, { withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(dest)
  const after = fs.statSync(dest).size
  const pct   = Math.round((1 - after / before) * 100)
  console.log(`OK    ${name}.webp  ${(before/1e6).toFixed(1)}MB → ${(after/1e3).toFixed(0)}KB  (-${pct}%)`)
}

async function run() {
  const files = fs.readdirSync(SRC).filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  console.log(`Converting ${files.length} images...\n`)
  for (const f of files) await convert(f)
  console.log('\nDone.')
}

run().catch(console.error)
