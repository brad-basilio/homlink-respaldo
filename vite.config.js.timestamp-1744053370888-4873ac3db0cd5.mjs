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
  define: {
    global: "window"
  },
  resolve: {
    alias: {
      global: "globalThis"
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccHJvamVjdHNcXFxcTm9QYWluXFxcXG5vcGFpbi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxwcm9qZWN0c1xcXFxOb1BhaW5cXFxcbm9wYWluLWFwcFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveGFtcHAvaHRkb2NzL3Byb2plY3RzL05vUGFpbi9ub3BhaW4tYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCBsYXJhdmVsIGZyb20gXCJsYXJhdmVsLXZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGlnbm9yZWQ6IFtcIiEqKi9ub2RlX21vZHVsZXMveW91ci1wYWNrYWdlLW5hbWUvKipcIl0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFtcbiAgICAgICAgICAgICAgICAuLi5nbG9iLnN5bmMoXCJyZXNvdXJjZXMvanMvKiovKi5qc3hcIiksXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvY3NzL2FwcC5jc3NcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICBdLFxuICAgIC8vIHJlc29sdmU6IG5hbWUgPT4ge1xuICAgIC8vICAgICBjb25zdCBwYWdlcyA9IGltcG9ydC5tZXRhLmdsb2IoJy4vUGFnZXMvKiovKi5qc3gnLCB7IGVhZ2VyOiB0cnVlIH0pXG4gICAgLy8gICAgIHJldHVybiBwYWdlc1tgLi9QYWdlcy8ke25hbWV9LmpzeGBdXG4gICAgLy8gfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBBZG1pbnRvXCI6IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvanMvQ29tcG9uZW50cy9BZG1pbnRvXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBcIkBUYWlsd2luZFwiOiBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL2pzL0NvbXBvbmVudHMvVGFpbHdpbmRcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFwiQFV0aWxzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwicmVzb3VyY2VzL2pzL1V0aWxzXCIpLFxuICAgICAgICAgICAgXCJAUmVzdFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInJlc291cmNlcy9qcy9BY3Rpb25zXCIpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09IFwiYXBwLUM2R0hNeFNwLmNzc1wiKSByZXR1cm4gXCJhcHAuY3NzXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgICBnbG9iYWw6IFwid2luZG93XCIsXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICAgICAgICBkZWZpbmU6IHtcbiAgICAgICAgICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULE9BQU8sVUFBVTtBQUM3VSxPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUpsQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDSixPQUFPO0FBQUEsTUFDSCxTQUFTLENBQUMsdUNBQXVDO0FBQUEsSUFDckQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDSCxHQUFHLEtBQUssS0FBSyx1QkFBdUI7QUFBQSxRQUNwQztBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILFlBQVksS0FBSztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLE1BQ0EsYUFBYSxLQUFLO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFDQSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUN0RCxTQUFTLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxJQUMzRDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDM0IsY0FBSSxVQUFVLFFBQVE7QUFBb0IsbUJBQU87QUFDakQsaUJBQU8sVUFBVTtBQUFBLFFBQ3JCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsUUFBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxNQUNaLFFBQVE7QUFBQSxRQUNKLFFBQVE7QUFBQSxNQUNaO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
