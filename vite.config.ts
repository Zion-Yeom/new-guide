import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    },
    plugins: [
        vue(),
    ],
    server: {
        port: 8080
    }
});