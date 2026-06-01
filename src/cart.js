const CART_KEY = 'pm_cart'

export const cart = {
  getItems() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]') }
    catch { return [] }
  },

  addItem(product, qty = 1) {
    const items = this.getItems()
    const existing = items.find(i => i.id === product.id)
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 99)
    } else {
      items.push({
        id: product.id,
        name: product.name,
        artist: product.artist,
        price: product.price,
        edition: product.edition,
        image: product.image,
        qty
      })
    }
    this._save(items)
    this.updateBadges()
    this._showToast(`${product.name} added to cart`)
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id)
    this._save(items)
    this.updateBadges()
  },

  updateQty(id, qty) {
    const items = this.getItems()
    const item = items.find(i => i.id === id)
    if (item) {
      item.qty = Math.max(1, Math.min(qty, 99))
      this._save(items)
      this.updateBadges()
    }
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.qty, 0)
  },

  clear() {
    localStorage.removeItem(CART_KEY)
    this.updateBadges()
  },

  _save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  },

  updateBadges() {
    const count = this.getCount()
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count
      if (count > 0) {
        el.classList.remove('hidden')
      } else {
        el.classList.add('hidden')
      }
    })
  },

  _showToast(message) {
    const existing = document.getElementById('pm-toast')
    if (existing) existing.remove()
    const toast = document.createElement('div')
    toast.id = 'pm-toast'
    toast.style.cssText = `
      position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(20px);
      z-index:9999; background:#1e1f25; border:1px solid rgba(217,194,144,0.3);
      color:#f6deaa; padding:14px 32px; border-radius:9999px;
      font-family:'Geist',sans-serif; font-size:11px; letter-spacing:0.2em;
      text-transform:uppercase; box-shadow:0 20px 60px rgba(0,0,0,0.5);
      opacity:0; transition:all 0.4s cubic-bezier(0.23,1,0.32,1);
    `
    toast.textContent = message
    document.body.appendChild(toast)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1'
        toast.style.transform = 'translateX(-50%) translateY(0)'
      })
    })
    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transform = 'translateX(-50%) translateY(20px)'
      setTimeout(() => toast.remove(), 400)
    }, 2200)
  }
}

document.addEventListener('DOMContentLoaded', () => cart.updateBadges())
