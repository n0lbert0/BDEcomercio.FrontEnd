<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-h6">
          EComercio
        </q-toolbar-title>

        <q-input
          v-model="search"
          dense
          outlined
          rounded
          bg-color="white"
          color="primary"
          input-class="text-black"
          placeholder="Buscar productos, marcas o categorías..."
          class="q-mx-md"
          style="min-width: 250px; max-width: 500px;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          label="Iniciar sesión"
          class="text-white q-mx-xs"
        />

        <q-btn-dropdown
          flat
          label="Crear cuenta"
          class="text-white bg-secondary q-ml-xs"
          no-caps
        >
          <q-list dense>
            <q-item clickable v-close-popup>
              <q-item-section>Para Comprar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Para Vender</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
import { ref } from 'vue'

const search = ref('')
</script>