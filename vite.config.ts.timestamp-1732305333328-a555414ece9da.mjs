// vite.config.ts
import path from "node:path";
import process from "node:process";
import vue from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/unocss@0.63.6_postcss@8.4.49_rollup@4.27.3_typescript@5.6.3_vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0_/node_modules/unocss/dist/vite.mjs";
import VueRouter from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/unplugin-vue-router@0.10.8_rollup@4.27.3_vue-router@4.4.5_vue@3.5.13_typescript@5.6.3___vue@3.5.13_typescript@5.6.3_/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import istanbul from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/vite-plugin-istanbul@6.0.2_vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0_/node_modules/vite-plugin-istanbul/dist/index.mjs";
import Layouts from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0__vue-_enc4gi5mzvfbafkn35rw6myoq4/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import webfontDownload from "file:///home/zeze/Documentos/personal/github/teste-andrew/node_modules/.pnpm/vite-plugin-webfont-dl@3.10.1_vite@5.4.11_@types+node@22.9.1_sass@1.81.0_terser@5.36.0_/node_modules/vite-plugin-webfont-dl/dist/index.mjs";
var __vite_injected_original_dirname = "/home/zeze/Documentos/personal/github/teste-andrew";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: [".vue"],
      dts: "src/typed-router.d.ts"
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    vue(),
    // https://github.com/feat-agency/vite-plugin-webfont-dl
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    ]),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
    istanbul({
      cypress: true,
      include: "src/*",
      exclude: ["node_modules"],
      extension: [".js", ".ts", ".vue"],
      requireEnv: false,
      forceBuildInstrument: Boolean(process.env.INSTRUMENT_BUILD)
    })
  ],
  build: {
    sourcemap: "inline"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS96ZXplL0RvY3VtZW50b3MvcGVyc29uYWwvZ2l0aHViL3Rlc3RlLWFuZHJld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvemV6ZS9Eb2N1bWVudG9zL3BlcnNvbmFsL2dpdGh1Yi90ZXN0ZS1hbmRyZXcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvemV6ZS9Eb2N1bWVudG9zL3BlcnNvbmFsL2dpdGh1Yi90ZXN0ZS1hbmRyZXcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcblxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbmltcG9ydCBpc3RhbmJ1bCBmcm9tICd2aXRlLXBsdWdpbi1pc3RhbmJ1bCdcblxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5cbmltcG9ydCB3ZWJmb250RG93bmxvYWQgZnJvbSAndml0ZS1wbHVnaW4td2ViZm9udC1kbCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9zdmEvdW5wbHVnaW4tdnVlLXJvdXRlclxuICAgIFZ1ZVJvdXRlcih7XG4gICAgICBleHRlbnNpb25zOiBbJy52dWUnXSxcbiAgICAgIGR0czogJ3NyYy90eXBlZC1yb3V0ZXIuZC50cycsXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSm9obkNhbXBpb25Kci92aXRlLXBsdWdpbi12dWUtbGF5b3V0c1xuICAgIExheW91dHMoKSxcblxuICAgIHZ1ZSgpLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZlYXQtYWdlbmN5L3ZpdGUtcGx1Z2luLXdlYmZvbnQtZGxcbiAgICB3ZWJmb250RG93bmxvYWQoW1xuICAgICAgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Tm90bytTYW5zOml0YWwsd2dodEAwLDEwMC4uOTAwOzEsMTAwLi45MDAmZGlzcGxheT1zd2FwJyxcbiAgICBdKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAvLyBzZWUgdW5vLmNvbmZpZy50cyBmb3IgY29uZmlnXG4gICAgVW5vQ1NTKCksXG4gICAgaXN0YW5idWwoe1xuICAgICAgY3lwcmVzczogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6ICdzcmMvKicsXG4gICAgICBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcyddLFxuICAgICAgZXh0ZW5zaW9uOiBbJy5qcycsICcudHMnLCAnLnZ1ZSddLFxuICAgICAgcmVxdWlyZUVudjogZmFsc2UsXG4gICAgICBmb3JjZUJ1aWxkSW5zdHJ1bWVudDogQm9vbGVhbihwcm9jZXNzLmVudi5JTlNUUlVNRU5UX0JVSUxEKSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6ICdpbmxpbmUnLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsT0FBTyxVQUFVO0FBQ3pWLE9BQU8sYUFBYTtBQUNwQixPQUFPLFNBQVM7QUFFaEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sZUFBZTtBQUV0QixTQUFTLG9CQUFvQjtBQUU3QixPQUFPLGNBQWM7QUFFckIsT0FBTyxhQUFhO0FBRXBCLE9BQU8scUJBQXFCO0FBZDVCLElBQU0sbUNBQW1DO0FBaUJ6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTO0FBQUE7QUFBQSxJQUVQLFVBQVU7QUFBQSxNQUNSLFlBQVksQ0FBQyxNQUFNO0FBQUEsTUFDbkIsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBO0FBQUEsSUFHRCxRQUFRO0FBQUEsSUFFUixJQUFJO0FBQUE7QUFBQSxJQUdKLGdCQUFnQjtBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFJRCxPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTLENBQUMsY0FBYztBQUFBLE1BQ3hCLFdBQVcsQ0FBQyxPQUFPLE9BQU8sTUFBTTtBQUFBLE1BQ2hDLFlBQVk7QUFBQSxNQUNaLHNCQUFzQixRQUFRLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLEVBQ2I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
