import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' //추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: '앱 이름', //앱 설치 아이콘 밑에 출력할 앱의 이름
        short_name: '짧은 이름',
        description: '앱 설명',
        theme_color: '#ffffff',
        background_color: "#ffffff",
        icons: [ //앱 설치시 보여줄 아이콘
          {
            src: '/react.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/react.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: ".", //앱 누르면 처음 뜨는 경로
        display: "standalone" //앱을 켜면 브라우저 상단바 제거할지 말지 설정
      }
    })
  ]
})
