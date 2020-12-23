module.exports = {
 "transpileDependencies": [
  "vuetify"
 ],

  devServer: {
  	proxy: "https://chat.stopcovid.kz/"
  },

 pwa: {
  name: 'WebDesign',
  themeColor: '#4DBA87',
  msTileColor: '#fff',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black',

  // настройки манифеста
  manifestOptions: {
   short_name:"Chat",
   theme_color:"#4DBA87",
   icons:[
    {src:"./img/icons/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
    {src:"./img/icons/android-chrome-512x512.png","sizes":"512x512","type":"image/png"},
    {src:"./img/icons/android-chrome-maskable-192x192.png","sizes":"192x192","type":"image/png","purpose":"maskable"},
    {src:"./img/icons/android-chrome-maskable-512x512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}
   ],
   start_url:".",
   display:"standalone",
   background_color:"#4dba87"
  },


  workboxPluginMode: 'InjectManifest',
  workboxOptions: {
   // swSrc необходимо в режиме InjectManifest
   swSrc: 'src/service-worker.js',
   // ...другие настройки Workbox...
  }

 }


}