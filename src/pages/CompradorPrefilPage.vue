<template>
  <q-page padding>
    <!-- Título -->
    <div class="text-h5 text-center q-mb-xl">Mi Perfil - Comprador</div>

    <!-- Tarjeta de usuario -->
    <div class="user-card q-pa-md q-mb-xl">
      <div class="row items-center">
        <q-avatar size="60px" class="q-mr-md">
          <div class="text-h6 bg-grey-3 text-grey-8">CR</div>
        </q-avatar>
        <div>
          <div class="text-h6">Carlos Ruiz</div>
          <div class="text-grey-8 text-caption">carlos.ruiz@example.com</div>
        </div>
      </div>
    </div>

    <!-- Historial de Transacciones -->
    <div class="q-mb-lg">
      <div class="text-h6 q-mb-md">Historial de Transacciones</div>

      <!-- Filtros -->
      <div class="q-gutter-sm q-mb-md">
        <q-btn
          outline
          color="grey-8"
          size="sm"
          label="Por Fecha"
          icon="event"
          no-caps
        />
        <q-btn
          outline
          color="grey-8"
          size="sm"
          label="Por Categoría"
          icon="folder_open"
          no-caps
        />
      </div>

      <!-- Lista de transacciones -->
      <div v-if="transactions.length > 0">
        <!-- Encabezado de tabla -->
        <div class="transaction-header q-pa-md bg-grey-2 rounded-borders q-mb-sm">
          <div class="row items-center q-col-gutter-md">
            <div class="col-12 col-sm-4 text-weight-bold">Producto</div>
            <div class="col-12 col-sm-3 text-weight-bold">Vendedor</div>
            <div class="col-12 col-sm-2 text-weight-bold">Fecha</div>
            <div class="col-12 col-sm-2 text-weight-bold">Tipo</div>
            <div class="col-12 col-sm-1"></div> <!-- Para el botón Calificar -->
          </div>
        </div>

        <!-- Filas de transacciones -->
        <div
          v-for="(txn, index) in transactions"
          :key="index"
          class="transaction-row q-pa-md q-mb-sm bg-white rounded-borders"
        >
          <div class="row items-center q-col-gutter-md">
            <!-- Producto -->
            <div class="col-12 col-sm-4">
              <div class="text-weight-bold">{{ txn.product.name }}</div>
              <div class="text-grey-8 text-caption">{{ txn.product.price }} | {{ txn.product.category }}</div>
            </div>

            <!-- Vendedor -->
            <div class="col-12 col-sm-3">
              <div>{{ txn.seller }}</div>
            </div>

            <!-- Fecha -->
            <div class="col-12 col-sm-2">
              <div>{{ txn.date }}</div>
            </div>

            <!-- Tipo -->
            <div class="col-12 col-sm-2">
              <span
                :class="{
                  'text-green': txn.type === 'Comprado',
                  'text-red': txn.type === 'Donado'
                }"
                class="text-weight-bold"
              >
                {{ txn.type }}
              </span>
            </div>

            <!-- Botón Calificar -->
            <div class="col-12 col-sm-1">
              <q-btn
                color="secondary"
                size="sm"
                label="Calificar"
                no-caps
                class="full-width"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay transacciones -->
      <div v-else class="q-pa-md bg-orange-1 text-orange-8 text-center rounded-borders">
        No tiene interacciones registradas
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Datos duros para demo
const transactions = [
  {
    product: {
      name: 'Laptop Gamer XYZ',
      price: '$1,299',
      category: 'Electrónica'
    },
    seller: 'María López',
    date: '05/04/2025',
    type: 'Comprado'
  },
  {
    product: {
      name: 'Audífonos Inalámbricos',
      price: '$199',
      category: 'Audio'
    },
    seller: 'TechStore MX',
    date: '01/04/2025',
    type: 'Donado'
  },
  {
    product: {
      name: 'Móvil Pro Max',
      price: '$899',
      category: 'Electrónica'
    },
    seller: 'Ana Gómez',
    date: '28/03/2025',
    type: 'Comprado'
  }
]
</script>

<style scoped>
.user-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.transaction-row {
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s;
}

.transaction-row:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Estilos responsivos */
@media (max-width: 599px) {
  .transaction-row {
    flex-direction: column;
  }

  .col-12.col-sm-4,
  .col-12.col-sm-3,
  .col-12.col-sm-2,
  .col-12.col-sm-1 {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>