import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        login: resolve(__dirname, 'admin/login.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
  plugins: [
    {
      name: 'admin-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0]
          if (url === '/admin/login' || url === '/admin/login/') {
            req.url = '/admin/login.html'
          } else if (url === '/admin' || url === '/admin/' || (url.startsWith('/admin/') && !url.includes('.'))) {
            req.url = '/admin/index.html'
          }
          next()
        })
      },
    },
  ],
})
