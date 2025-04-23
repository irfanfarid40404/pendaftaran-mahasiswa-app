import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import MahasiswaListView from '@/views/MahasiswaListView.vue'
import MahasiswaAddView from '@/views/MahasiswaAddView.vue'
import MahasiswaEditView from '@/views/MahasiswaEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: MahasiswaListView,
    },
    {
      path: '/mahasiswa/tambah',
      name: 'mahasiswa-add',
      component: MahasiswaAddView,
    },
    {
      path: '/mahasiswa/edit/:id',
      name: 'mahasiswa-edit',
      component: MahasiswaEditView,
      props: true,
    },
  ],
})

export default router
