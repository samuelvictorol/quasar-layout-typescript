// import { boot } from 'quasar/wrappers'
// import { BasaVuePlugin } from 'basa-vue';

// export default boot(async ({ app, router }) => {
//   return new Promise(resolve => {
//     app.use(BasaVuePlugin, {
//       router,
//       securityOptions: {
//         enabled: true,
//         seguOAuth2: {
//           realm: 'basa-realm',
//           providerUrl: 'https://sso-basa.hml.bancoamazonia.sa/auth/',
//           clientId: 'sigaf-web',
//           seguApplicationId: 'api-sigaf',
//           seguApiUrl: 'https://api-seguranca.hml.bancoamazonia.sa/pdsegu2/usuarios/',
//           onReady: (loginData: any) => {
//             resolve() // Conclui o promise, senão o plugin nunca finalizará
//           },
//           onTokenRefresh: (loginData: any) => {
//             // implementar caso necessite de ação ao dar refresh no access token
//           }
//         }
//       }
//     })
//   })
// })