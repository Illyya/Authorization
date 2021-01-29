import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Authorization from '@/components/Authorization'
import Analytics from "@/components/Analytics"

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Authorization,
  },
  {
    path: "/analytics",
    component: Analytics,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
