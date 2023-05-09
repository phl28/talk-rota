/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

const mode = process.env.APP_ENV
const isUiDev = mode == 'ui-dev'
const isProd = !mode?.includes('dev')

export default defineConfig({
  plugins: [
    Vue({
      isProduction: isProd
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      all: true,
      reporter: ['text', 'json', 'html', 'lcov'],
      lines: 79,
      functions: 69,
      branches: 69,
      statements: 75,
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/tests/**', '**/*.test.ts', '**/*.test.tsx', '**/*.d.ts']
    },
    // setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cambridgekineticsltd/kinetic-ui': path.resolve(
        __dirname,
        './node_modules/@cambridgekineticsltd/kinetic-ui/dist/kinetic-ui.mjs'
      )
    }
  }
})
