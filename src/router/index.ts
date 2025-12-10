import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecepieView from '@/views/RecepieView.vue'
import SearchView from '@/views/SearchView.vue'
import MainRecepies from '@/views/MainRecepiesView.vue'
import DessertsView from '@/views/DessertRecepiesView.vue'
import RecepieEditView from '@/views/RecepieEditView.vue'
import InspectionView from '@/views/InspectionView.vue'
import UploadView from '@/views/UploadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecepieView,
    },
    {
      path: '/recipe/:id/edit',
      name: 'recipe-edit',
      component: RecepieEditView,
    },
    {
      path: '/inspection',
      name: 'inspection',
      component: InspectionView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: MainRecepies,
    },
    {
      path: '/desserts',
      name: 'desserts',
      component: DessertsView,
    },
  ],
})

export default router
