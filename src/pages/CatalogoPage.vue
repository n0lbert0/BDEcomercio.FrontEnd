<template>
  <q-page padding>
    <!-- Título -->
    <div class="text-h5 text-center q-mb-xl">Catálogo de Productos</div>

    <!-- Barra de búsqueda y filtros -->
    <div class="q-mb-xl">
      <!-- Buscar por nombre -->
      <div class="q-mb-md">
        <div class="text-caption text-grey-8">Buscar por nombre</div>
        <q-input
          v-model="searchQuery"
          outlined
          rounded
          placeholder="¿Qué estás buscando?"
          class="full-width"
          @keyup.enter="applyFilters"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Filtros: Categoría + Precio -->
      <div class="row q-col-gutter-md q-mb-md">
        <!-- Categoría -->
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-8">Categoría</div>
          <q-select
            v-model="selectedCategory"
            :options="categories"
            outlined
            rounded
            placeholder="Selecciona una categoría"
            emit-value
            map-options
            dense
          />
        </div>

        <!-- Precio -->
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-8">Precio</div>
          <q-select
            v-model="selectedPriceRange"
            :options="priceRanges"
            outlined
            rounded
            placeholder="Seleccione el precio"
            emit-value
            map-options
            dense
          />
        </div>
      </div>

      <!-- Botones Filtrar y Limpiar -->
      <div class="row q-gutter-md">
        <q-btn
          color="primary"
          label="Filtrar"
          no-caps
          @click="applyFilters"
        />
        <q-btn
          outline
          color="grey-8"
          label="Limpiar"
          no-caps
          @click="resetFilters"
        />
      </div>
    </div>

    <!-- Grid de productos -->
    <div v-if="filteredProducts.length > 0" class="q-mb-xl">
      <div class="row q-col-gutter-md justify-center">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <ProductCard
            :product="product"
            :is-new="product.isNew"
          />
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay productos -->
    <div v-else class="q-pa-md bg-orange-1 text-orange-8 text-center rounded-borders">
      NO SE ENCONTRARON PRODUCTOS
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from 'components/ProductCard.vue'

// Datos duros (simulación de productos)
const products = ref([
  {
    id: 1,
    name: 'Laptop Gamer XYZ',
    specs: '16GB RAM | SSD 512GB | RTX 3060',
    price: '$1,299',
    image: 'https://picsum.photos/200/200?random=8',
    isNew: true,
    category: 'Electrónica',
    priceRange: 'high'
  },
  {
    id: 2,
    name: 'Móvil Pro Max',
    specs: '108MP | 128GB | Pantalla AMOLED',
    price: '$899',
    image: 'https://picsum.photos/200/200?random=7',
    isNew: false,
    category: 'Electrónica',
    priceRange: 'medium'
  },
  {
    id: 3,
    name: 'Audífonos Inalámbricos',
    specs: 'Cancelación de ruido | 30h batería',
    price: '$199',
    image: 'https://picsum.photos/200/200?random=6',
    isNew: false,
    category: 'Audio',
    priceRange: 'low'
  },
  {
    id: 4,
    name: 'Teclado Mecánico RGB',
    specs: 'Switch Blue | Cable desmontable',
    price: '$129',
    image: 'https://picsum.photos/200/200?random=5',
    isNew: false,
    category: 'Periféricos',
    priceRange: 'low'
  },
  {
    id: 5,
    name: 'Monitor 4K Ultra HD',
    specs: '27" | HDMI/DisplayPort | 60Hz',
    price: '$499',
    image: 'https://picsum.photos/200/200?random=4',
    isNew: false,
    category: 'Electrónica',
    priceRange: 'medium'
  },
  {
    id: 6,
    name: 'Mouse Gamer Pro',
    specs: '16000 DPI | RGB | Ergonómico',
    price: '$89',
    image: 'https://picsum.photos/200/200?random=3',
    isNew: false,
    category: 'Periféricos',
    priceRange: 'low'
  }
])

// Filtros
const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedPriceRange = ref(null)

// Opciones de filtro
const categories = [
  { value: 'Electrónica', label: 'Electrónica' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Periféricos', label: 'Periféricos' }
]

const priceRanges = [
  { value: 'low', label: 'Bajo ($0 - $200)' },
  { value: 'medium', label: 'Medio ($201 - $800)' },
  { value: 'high', label: 'Alto ($801+)' }
]

// Productos filtrados
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // Filtro por búsqueda
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          product.specs.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Filtro por categoría
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value

    // Filtro por precio
    const matchesPrice = !selectedPriceRange.value || product.priceRange === selectedPriceRange.value

    return matchesSearch && matchesCategory && matchesPrice
  })
})

// Funciones
const applyFilters = () => {
  console.log('Aplicando filtros...')
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedPriceRange.value = null
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.q-input,
.q-select {
  background: white;
}

@media (max-width: 599px) {
  .q-btn {
    width: 100%;
  }
}
</style>