<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-h6">
          EComercio
        </q-toolbar-title>

        <q-btn
          flat
          label="Perfil"
          @click="$router.push('/comprador-prefil')"
          class="btn-perfil q-mx-xs"
        />

        <q-btn
          flat
          label="Ver Carrito"
          class="bg-secondary text-white q-ml-xs"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white text-center q-py-md">
      © 2025 DPAGroup - Todos los derechos reservados
    </q-footer>
  </q-layout>
</template>

<script setup>



</script>

<style scoped>
.btn-perfil {
  background-color: white;
  color: #2d3748; /* Texto oscuro */
  border: 1px solid #cbd5e0; /* Borde gris claro */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.btn-perfil:hover {
  background-color: #f7fafc;
  border-color: #a0aec0;
}
</style>