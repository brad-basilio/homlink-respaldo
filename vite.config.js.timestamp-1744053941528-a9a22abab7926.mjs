// vite.config.js
import glob from "file:///C:/xampp/htdocs/projects/NoPain/nopain-app/node_modules/glob/glob.js";
import laravel from "file:///C:/xampp/htdocs/projects/NoPain/nopain-app/node_modules/laravel-vite-plugin/dist/index.js";
import path from "path";
import { defineConfig } from "file:///C:/xampp/htdocs/projects/NoPain/nopain-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/projects/NoPain/nopain-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\projects\\NoPain\\nopain-app";
var vite_config_default = defineConfig({
  server: {
    watch: {
      ignored: ["!**/node_modules/your-package-name/**"]
    }
  },
  plugins: [
    laravel({
      input: [
        ...glob.sync("resources/js/**/*.jsx"),
        "resources/css/app.css"
      ],
      refresh: true
    }),
    react()
  ],
  // resolve: name => {
  //     const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
  //     return pages[`./Pages/${name}.jsx`]
  // },
  resolve: {
    alias: {
      "@Adminto": path.resolve(
        __vite_injected_original_dirname,
        "resources/js/Components/Adminto"
      ),
      "@Tailwind": path.resolve(
        __vite_injected_original_dirname,
        "resources/js/Components/Tailwind"
      ),
      "@Utils": path.resolve(__vite_injected_original_dirname, "resources/js/Utils"),
      "@Rest": path.resolve(__vite_injected_original_dirname, "resources/js/Actions")
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "app-C6GHMxSp.css")
            return "app.css";
          return assetInfo.name;
        }
      }
    }
  },
  optimizeDeps: {
    include: ["translate"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccHJvamVjdHNcXFxcTm9QYWluXFxcXG5vcGFpbi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxwcm9qZWN0c1xcXFxOb1BhaW5cXFxcbm9wYWluLWFwcFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL3Byb2plY3RzL05vUGFpbi9ub3BhaW4tYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCBsYXJhdmVsIGZyb20gXCJsYXJhdmVsLXZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGlnbm9yZWQ6IFtcIiEqKi9ub2RlX21vZHVsZXMveW91ci1wYWNrYWdlLW5hbWUvKipcIl0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFtcbiAgICAgICAgICAgICAgICAuLi5nbG9iLnN5bmMoXCJyZXNvdXJjZXMvanMvKiovKi5qc3hcIiksXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvY3NzL2FwcC5jc3NcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICBdLFxuICAgIC8vIHJlc29sdmU6IG5hbWUgPT4ge1xuICAgIC8vICAgICBjb25zdCBwYWdlcyA9IGltcG9ydC5tZXRhLmdsb2IoJy4vUGFnZXMvKiovKi5qc3gnLCB7IGVhZ2VyOiB0cnVlIH0pXG4gICAgLy8gICAgIHJldHVybiBwYWdlc1tgLi9QYWdlcy8ke25hbWV9LmpzeGBdXG4gICAgLy8gfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBBZG1pbnRvXCI6IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvanMvQ29tcG9uZW50cy9BZG1pbnRvXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBcIkBUYWlsd2luZFwiOiBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL2pzL0NvbXBvbmVudHMvVGFpbHdpbmRcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFwiQFV0aWxzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwicmVzb3VyY2VzL2pzL1V0aWxzXCIpLFxuICAgICAgICAgICAgXCJAUmVzdFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInJlc291cmNlcy9qcy9BY3Rpb25zXCIpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09IFwiYXBwLUM2R0hNeFNwLmNzc1wiKSByZXR1cm4gXCJhcHAuY3NzXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICBpbmNsdWRlOiBbXCJ0cmFuc2xhdGVcIl0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxPQUFPLFVBQVU7QUFDN1UsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFKbEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gsU0FBUyxDQUFDLHVDQUF1QztBQUFBLElBQ3JEO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0gsR0FBRyxLQUFLLEtBQUssdUJBQXVCO0FBQUEsUUFDcEM7QUFBQSxNQUNKO0FBQUEsTUFDQSxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxZQUFZLEtBQUs7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLGFBQWEsS0FBSztBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLE1BQ0EsVUFBVSxLQUFLLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsTUFDdEQsU0FBUyxLQUFLLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsSUFDM0Q7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxlQUFlO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDSixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzNCLGNBQUksVUFBVSxRQUFRO0FBQW9CLG1CQUFPO0FBQ2pELGlCQUFPLFVBQVU7QUFBQSxRQUNyQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1YsU0FBUyxDQUFDLFdBQVc7QUFBQSxFQUN6QjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
