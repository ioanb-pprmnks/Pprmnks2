// ─── CART BADGES ───
import('/src/cart.js').then(m => m.cart.updateBadges()).catch(() => {})

// ─── PAGE TRANSITIONS ───
;(function () {
  // Fade out → navigate
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || link.target === '_blank') return
    try {
      const url = new URL(href, window.location.href)
      if (url.hostname !== window.location.hostname) return
    } catch { return }

    link.addEventListener('click', e => {
      e.preventDefault()
      const dest = link.href
      document.body.classList.add('pm-leaving')
      setTimeout(() => { window.location.href = dest }, 330)
    })
  })

  // Back/forward cache — restore without flash
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      document.body.classList.remove('pm-leaving')
      document.body.classList.add('pm-restored')
    }
  })
})()

// ─── NAV SCROLL SHRINK ───
;(function () {
  const nav = document.querySelector('nav, header')
  if (!nav) return
  const onScroll = () => nav.classList.toggle('pm-scrolled', window.scrollY > 40)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})()

// ─── SCROLL REVEAL ───
;(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
    return
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
    })
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})()
