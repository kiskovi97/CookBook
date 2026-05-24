import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecipeView from '@/views/RecipeView.vue'
import SearchView from '@/views/SearchView.vue'
import RecipeEditView from '@/views/RecipeEditView.vue'
import InspectionView from '@/views/InspectionView.vue'
import UploadView from '@/views/UploadView.vue'
import WineListView from '@/views/WineListView.vue'
import UploadWineView from '@/views/UploadWineView.vue'
import WineEditView from '@/views/WineEditView.vue'

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
      component: RecipeView,
    },
    {
      path: '/recipe/:id/edit',
      name: 'recipe-edit',
      component: RecipeEditView,
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
      path: '/recipes',
      name: 'recipes',
      component: SearchView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/wines',
      name: 'wines',
      component: WineListView,
    },
    {
      path: '/upload-wine',
      name: 'upload-wine',
      component: UploadWineView,
    },
    {
      path: '/wine/:id/edit',
      name: 'wine-edit',
      component: WineEditView,
    },
  ],
})

export default router
