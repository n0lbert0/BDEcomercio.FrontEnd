const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },      
    ],
  },

  {
    path: '/comprador-prefil',
    component: () => import('src/layouts/CompradorLayout.vue'),
    children: [      
      { path: '/comprador-prefil', component: () => import('pages/CompradorPrefilPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
