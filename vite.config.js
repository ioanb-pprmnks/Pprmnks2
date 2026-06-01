import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        product: resolve(__dirname, 'product.html'),
        cart: resolve(__dirname, 'cart.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        story: resolve(__dirname, 'story.html'),
        contact: resolve(__dirname, 'contact.html'),
        artists: resolve(__dirname, 'artists.html'),
        adminLogin: resolve(__dirname, 'admin/login.html'),
        adminDashboard: resolve(__dirname, 'admin/index.html'),
        adminProducts: resolve(__dirname, 'admin/products.html'),
        adminOrders: resolve(__dirname, 'admin/orders.html'),
        adminEditProduct: resolve(__dirname, 'admin/edit-product.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
