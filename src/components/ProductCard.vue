<template>
  <q-card flat bordered class="product-card full-width">
    <!-- Etiqueta "Nuevo" (solo si isNew es true) -->
    <q-badge
      v-if="isNew"
      color="green"
      text-color="white"
      class="absolute-top-left"
      style="margin: 8px; z-index: 10"
    >
      Nuevo
    </q-badge>

    <!-- Imagen del producto -->
    <q-img
      :src="product.image"
      :alt="product.name"
      style="height: 300px; width: auto; max-width: 400px; object-fit: contain"
      class="q-pa-sm"
    />

    <!-- Contenido del producto -->
    <q-card-section>
      <div class="text-h6 q-mb-xs">{{ product.name }}</div>
      <div class="text-grey text-caption q-mb-sm">{{ product.specs }}</div>
      <div class="text-h6 text-secondary q-mb-md">{{ product.price }}</div>

      <!-- Botones de acción -->
      <div class="row q-gutter-sm">
        <q-btn
          outline
          color="secondary"
          size="sm"
          label="+Agregar al Carrito"
          class="col"
        />
        <q-btn
          color="secondary"
          size="sm"
          label="Comprar"
          class="col"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    validator(value) {
      return (
        typeof value.name === 'string' &&
        typeof value.specs === 'string' &&
        typeof value.price === 'string' &&
        typeof value.image === 'string'
      )
    }
  },
  isNew: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* Tarjeta principal */
.product-card {
  max-width: 300px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  background: white;
  flex-direction: column;
}

/* Contenedor de la imagen */
.image-wrapper {
  background: white;
  display: flex;
  justify-content: center;
  padding: 16px;
  min-height: 200px;
}

/* Imagen */
.product-image {
  height: 160px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
}

/* Contenido */
.content-wrapper {
  padding: 0 16px 16px 16px !important;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #2d3748;
}

.product-specs {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 12px;
}

.product-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 16px;
}

/* Grupo de botones */
.button-group {
  display: flex;
  gap: 8px;
}

.btn-add,
.btn-buy {
  flex: 1;
  font-size: 0.875rem;
  padding: 8px 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 8px;
  min-height: auto;
}

/* Estilo específico para botones */
.btn-add {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.btn-buy {
  background-color: #4c51bf;
  color: white;
}

/* Responsive: en móvil, botones apilados */
@media (max-width: 599px) {
  .button-group {
    flex-direction: column;
  }

  .btn-add,
  .btn-buy {
    width: 100%;
  }
}

/* Ajuste para evitar padding extra de Quasar */
.q-card-section {
  padding: 0 !important;
}
</style>