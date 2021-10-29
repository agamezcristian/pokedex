import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },  
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "List" */ '../components/list/List.vue')
  },
  {
    path: '/favorites',
    name: 'Favorite',
    component: () => import(/* webpackChunkName: "List" */ '../components/favorites/Favorites.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
