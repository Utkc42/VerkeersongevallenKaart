import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_MAPBOX_TOKEN: `"${process.env.REACT_APP_MAPBOX_TOKEN}"`,
      REACT_APP_MAP_STYLE: `"${process.env.REACT_APP_MAP_STYLE}"`,
    },
  },
});
