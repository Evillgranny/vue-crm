import Vue from 'vue'
import Vuelidate from "vuelidate"
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import dateFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter"
import tooltipDirective from '@/directives/tooltip.directive'
import currencyFilter from "@/filters/currency.filter"
import Loader from "@/components/app/Loader"
import messagePlugin from "@/utils/message.plugin"
import titlePlugin from "@/utils/title.plugin"
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyAeBYQVj2mjg_QLLdSbrP95EZBFpwVzdqc",
  authDomain: "vue-7ec01.firebaseapp.com",
  databaseURL: "https://vue-7ec01.firebaseio.com",
  projectId: "vue-7ec01",
  storageBucket: "vue-7ec01.appspot.com",
  messagingSenderId: "981385112191",
  appId: "1:981385112191:web:b49ec37de51e821cbf6d4a",
  measurementId: "G-9997P1PYFM"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


