import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
       
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        
    ],
    resolve: {
        alias: {
            '$': 'jQuery'
        },
    },
    build: {
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
                if (assetInfo.name == 'app-C6GHMxSp.css')
                  return 'app.css';
                return assetInfo.name;
              },           
          },
        },
      },
});
