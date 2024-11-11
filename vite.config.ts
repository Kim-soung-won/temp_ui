import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    ...(mode !== "test" && {
      plugins: [
        react(),
        eslint({
          overrideConfigFile: ".eslintrc.cjs",
          cache: false,
          fix: true,
        }),
      ],
    }),
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BASE_SERVER_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  })
}