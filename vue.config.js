module.exports = {
 "transpileDependencies": [
  "vuetify"
 ],

  devServer: {
  	proxy: "https://chat.stopcovid.kz/"
  }

  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://chat.stopcovid.kz/api',
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }

  // devServer: {
  // 	proxy: {
  //    "/api": {
  //      target: "http://chat.stopcovid.kz/",
  //      changeOrigin: true,
  //    }
  // 	}
  // }
}