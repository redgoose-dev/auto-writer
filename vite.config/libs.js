import { defineConfig } from 'vite'

const { VITE_PROJECT_NAME, VITE_FILE_NAME } = Bun.env

const config = defineConfig(() => {
  return {
    publicDir: false,
    base: './',
    build: {
      minify: true,
      outDir: 'libs',
      assetsDir: '',
      lib: {
        entry: 'src/auto-writer/index.js',
        name: VITE_PROJECT_NAME,
        formats: [ 'es', 'umd' ],
        fileName: (format, _a, _b) => {
          return `${VITE_FILE_NAME}.${format}.js`
        },
      },
    },
  }
})

export default config
