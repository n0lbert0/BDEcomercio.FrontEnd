<template>
  <q-page padding>
    <!-- Producto principal (Hero) -->
    <q-card flat bordered class="q-mb-xl container">
      <q-card-section horizontal>
        <q-img
          src="https://picsum.photos/200/200?random=8"
          style="width: 300px; min-width: 250px;"
        />

        <q-card-section class="col">
          <div class="text-h5 q-mb-md">Audífonos Inalámbricos</div>
          <div class="q-mt-xl">
            <q-btn outline color="secondary" label="Agregar al carrito" class="q-mr-md" />
            <q-btn color="secondary" label="Comprar" />
          </div>
        </q-card-section>
        
      </q-card-section>
    </q-card>

    <!-- Sección de productos destacados -->
    <div class="text-h5 q-mb-lg text-center">Artículos destacados</div>

  <div class="q-pa-md">
      <div class="row q-col-gutter-md justify-center">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <ProductCard :product="product" :is-new="index === 0" />
        </div>
      </div>
  </div>    
  </q-page>
</template>

<script setup>
import ProductCard from 'components/ProductCard.vue'

const products = [
  {
    id: 1,
    name: 'Laptop Gamer XYZ',
    specs: '16GB RAM | SSD 512GB | RTX 3060',
    price: '$1,299',
    image: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 2,
    name: 'Móvil Pro Max',
    specs: '108MP | 128GB | Pantalla AMOLED',
    price: '$899',
    image: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 3,
    name: 'Audífonos Inalámbricos',
    specs: 'Cancelación de ruido | 30h batería',
    price: '$199',
    image: 'https://picsum.photos/200/200?random=3'
  },
  {
    id: 4,
    name: 'Teclado Mecánico RGB',
    specs: 'Switch Blue | Cable desmontable',
    price: '$129',
    image: 'https://picsum.photos/200/200?random=4'
  },
  {
    id: 5,
    name: 'Monitor 4K Ultra HD',
    specs: '27" | HDMI/DisplayPort | 60Hz',
    price: '$499',
    image: 'https://picsum.photos/200/200?random=5'
  },
  {
    id: 6,
    name: 'Mouse Gamer Pro',
    specs: '16000 DPI | RGB | Ergonómico',
    price: '$89',
    image: 'https://picsum.photos/200/200?random=6'
  }
]
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;  
}

@media (min-width: 600px) {
  .product-card {
    display: flex;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 599px) {
  .product-card {
    max-width: 100%;
  }
}
</style>