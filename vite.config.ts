import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "srcbook-error-reporter",

      transformIndexHtml(html) {
        // Skip watermark injection if SHOW_WATERMARK is false
        if (process.env.SHOW_WATERMARK === "false") {
          return html;  // Return HTML without watermark
        }

        // Original watermark injection logic
        if (process.env.NODE_ENV !== "development") {
          return [
            {
              tag: "style",
              attrs: { type: "text/css" },
              injectTo: "head",
              children: `
                .srcbook-watermark {
                  position: fixed;
                  bottom: 16px;
                  right: 16px;
                  background: white;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  display: flex;
                  align-items: center;
                  padding: 8px 12px;
                  z-index: 9999;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  font-size: 14px;
                  font-weight: bold;
                  color: #000;
                  gap: 8px;
                  border: 1px solid #e6e6e6;
                  background: linear-gradient(to bottom, #FFFFFF, #F9F9F9);
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                }
                .srcbook-watermark:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .srcbook-watermark:active {
                  transform: translateY(0);
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .srcbook-watermark img {
                  width: 16px;
                  height: 16px;
                }
              `,
            },
            {
              tag: "script",
              attrs: { type: "module" },
              injectTo: "body",
              children: `
                const watermark = document.createElement('a');
                watermark.href = 'https://www.srcbook.com?a_id=' + encodeURIComponent('0195a953-52cb-77e2-9547-2efc0ed8e166');
                watermark.target = '_blank';
                watermark.className = 'srcbook-watermark';
                watermark.innerHTML = \`
                  <img src="https://assets.srcbook.com/favicon.svg" alt="Srcbook Logo" />
                  Made in Srcbook
                \`;
                document.body.appendChild(watermark);
              `,
            },
          ];
        }

        return html;
      },

      // Keeping the transform for main.tsx in case you need it
      transform(src: string, id: string) {
        if (id === "/app/src/main.tsx") {
          return `
            ${src}
            if (process.env.NODE_ENV === 'development') {
              if (import.meta.hot) {
                import.meta.hot.on('vite:error', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:error', data }, '*');
                  }
                });
                import.meta.hot.on('vite:beforeUpdate', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:beforeUpdate', data }, '*');
                  }
                });
                import.meta.hot.on('vite:afterUpdate', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:afterUpdate', data }, '*');
                  }
                });
              }
            }
          `;
        }
      },
    },
  ],
  server: {
    allowedHosts: true,
  },
});
