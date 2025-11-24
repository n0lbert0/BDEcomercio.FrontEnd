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

  {
  path: '/comprador-calificacion',
  component: () => import('layouts/CompradorLayout.vue'),
  children: [
    { path: '', component: () => import('pages/CompradorCalificacionPage.vue') }
  ]
},

  {
  path: '/catalogo',
  component: () => import('layouts/CompradorLayout.vue'),
  children: [
    { path: '', component: () => import('pages/CatalogoPage.vue') }
  ]
},

{
  path: '/producto/:id',
  component: () => import('layouts/CompradorLayout.vue'),
  children: [
    { path: '', component: () => import('pages/ProductoDetallePage.vue') }
  ]
},

{
  path: '/carrito',
  component: () => import('layouts/CompradorLayout.vue'),
  children: [
    { path: '', component: () => import('pages/CarritoPage.vue') }
  ]
},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
