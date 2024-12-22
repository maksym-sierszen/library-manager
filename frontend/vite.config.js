import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000", // redirect all req to localhost:3000
				changeOrigin: true, //change all headings of source
				secure: false, // http
			},
		},
	},
})
