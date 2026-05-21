import {
  createAppleSplashScreens,
  defineConfig,
} from '@vite-pwa/assets-generator/config'
import type { Preset } from '@vite-pwa/assets-generator/config'

const preset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[48, 'favicon.ico'], [64, 'favicon-64x64.ico']],
  },
  maskable: {
    sizes: [512],
  },
  apple: {
    sizes: [180],
  },
  appleSplashScreens: createAppleSplashScreens({
    padding: 0.3,
    resizeOptions: { background: 'white', fit: 'contain' },
    linkMediaOptions: {
      log: true,
      addMediaScreen: true,
      basePath: '/pwa/',
      xhtml: false,
    },
    png: { compressionLevel: 9, quality: 60 },
  }),
}

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
    basePath: '/pwa/',
  },
  preset,
  images: ['public/pwa/favicon.svg'],
})
