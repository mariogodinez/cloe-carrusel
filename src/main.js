// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import store from './store.js'
import App from './App.vue'
import Login from './components/Login.vue'
import ImgCarrusel from './components/ImgCarrusel.vue'

import Carousel3d from 'vue-carousel-3d'


window.axios = require('axios')
window.Is = require('is_js')

// window.onbeforeunload = function(){
//   localStorage.removeItem('tokenOrkestra')
// }

let prodApi = 'https://178.128.15.135'
let demoApi = 'https://democlientes.grupotenerife.com'
let devApi = 'https://270582c0.ngrok.io'

window.apiUrl =  demoApi

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.tokenCS;
axios.defaults.timeout                         = 8000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(Carousel3d)


function scrollTop (to,from,next){
  let body = document.querySelector('body')
  let html = document.querySelector('html')
  body.scrollTop = 0
  html.scrollTop = 0
  next()
}


let routes = [
  {path: '/login', component: Login, beforeEnter:scrollTop},
  {path: '/carrusel', component: ImgCarrusel, beforeEnter:scrollTop},

]

let router = new VueRouter({
	routes,
	//mode: 'history',
	//history: true
})



let VueApp = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components:{
    'carousel-3d': Carousel3d.Carousel3d,
    'slide': Carousel3d.Slide
  },
  render: (h) => h(App),
  created(){

    let numbers = this.$store.getters.cotizations.map(item => Number(item.quantity))
    let result = numbers.reduce(function(valorAnterior, valorActual, indice, vector){
      return valorAnterior + valorActual;
    });

    this.$store.dispatch('addNotifications', result)

    // localStorage.modify = 'false'

  }
})

  // Vue.component('pagination', require('laravel-vue-pagination'));

