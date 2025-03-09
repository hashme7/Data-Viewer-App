import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "G-Synergy Data Viewer",
        short_name: "G-Synergy",
        description: "A Progressive Web App for viewing G-Synergy data",
        theme_color: "#007bff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globDirectory: "dist/",
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        // runtimeCaching: [
        //   {
        //     urlPattern: /^https:\/\/your-api-endpoint\.com\/.*/,
        //     handler: "NetworkFirst",
        //     options: {
        //       cacheName: "api-cache",
        //       expiration: {
        //         maxEntries: 50,
        //         maxAgeSeconds: 60 * 60 * 24,
        //       },
        //     },
        //   },
        // ],
      },
    }),
  ],
});
