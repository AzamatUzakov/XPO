// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel"; // Импортируем адаптер для Vercel

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  output: "server",
  
  adapter: isVercel 
    ? vercel() 
    : node({ mode: "standalone" }),

  integrations: [react()],
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: true
        }
      },
      // Поднимаем лимит до 800кб, чтобы сборщик не ругался на тяжелые UI/карты
      chunkSizeWarningLimit: 800
    }
  },
});