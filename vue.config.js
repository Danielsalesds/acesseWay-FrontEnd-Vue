const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://user-ms-yb1o.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/api' : ''} // opcional, remove /api ao mandar pro backend

      }
    },
    allowedHosts: 'all', // permite acessar de qualquer host externo, incluindo ngrok
    host: '0.0.0.0',    // deixa o servidor acessível externamente
   // https: false,           // deixa sem HTTPS (ngrok vai fornecer HTTPS)
   // hot: false, // desativa HMR
   // client: {
   //   webSocketURL: 'wss://0.0.0.0:3001/ws', // força WebSocket seguro
   // }
  },
})
