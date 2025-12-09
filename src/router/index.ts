import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecepieView from '@/views/RecepieView.vue'
import SearchView from '@/views/SearchView.vue'
import MainRecepies from '@/views/MainRecepiesView.vue'
import DessertsView from '@/views/DessertRecepiesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recepie/:id',
      name: 'recepie',
      component: RecepieView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },{
      path: '/dishes',
      name: 'dishes',
      component: MainRecepies,
    },{
      path: '/desserts',
      name: 'desserts',
      component: DessertsView,
    }

  ],
})

export default router
