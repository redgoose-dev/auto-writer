import { defineConfig } from 'vite'

const { VITE_HOST, VITE_PORT, VITE_OPEN_BROWSER } = Bun.env

const config = defineConfig(() => {
  const path = process.cwd()
  return {
    root: './src/demo',
    base: './',
    server: {
      host: VITE_HOST,
      port: Number(VITE_PORT),
      open: VITE_OPEN_BROWSER.toLowerCase() === 'true',
    },
    build: {
      outDir: `${path}/docs`,
      assetsDir: '',
    },
    preview: {
      host: VITE_HOST,
      port: Number(VITE_PORT),
    },
  }
})

export default config
