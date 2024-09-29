import { defineConfig } from "@solidjs/start/config";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  vite: {
    plugins: [
      AutoImport({
        include: [/\.[tj]sx$/],
        imports: [
          {
            "~/i18n": ["$t"],
          },
        ],
      }),
    ],
  },
});
