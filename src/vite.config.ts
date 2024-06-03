import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), "")
  return {
    server: {
      proxy: {
        "/api": {
          target: "https://youtu.be",
          changeOrigin: true,
          secure: false,
          rewrite: path => {
            const retPath = path.replace(/^\/api/, "")
            console.log(`rewriting ${path} to ${retPath}`)
            return retPath
          },
        },
      },
    },
    plugins: [vue()],
  }
})

