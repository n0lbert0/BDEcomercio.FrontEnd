<template>
  <q-page padding>
    <!-- Título -->
    <div class="text-h5 text-center q-mb-md">Carrito de Compras</div>
    <div class="text-caption text-grey-8 text-center q-mb-xl">
      Revisa tu pedido antes de finalizar la compra
    </div>

    <!-- Contenedor principal: Productos + Resumen -->
    <div class="row q-col-gutter-md">
      <!-- Columna izquierda: Productos -->
      <div class="col-8 col-lg-8">
        <div v-if="cartItems.length > 0">
          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="q-pa-md bg-white rounded-borders q-mb-sm"
          >
            <div class="row items-center">
              <!-- Imagen -->
              <div class="col-auto">
                <q-img
                  :src="item.image"
                  style="width: 80px; height: 80px; object-fit: contain"
                  class="rounded-borders"
                />
              </div>

              <!-- Detalles -->
              <div class="col q-pl-md">
                <div class="text-h6 text-weight-bold">{{ item.name }}</div>
                <div class="text-caption text-grey-8">
                  {{ item.category }} | {{ item.tag }}
                </div>
                <div class="row items-center q-mt-sm">
                  <div class="text-caption text-grey-8 q-mr-sm">Cantidad:</div>
                  <q-input
                    v-model.number="item.quantity"
                    type="number"
                    dense
                    outlined
                    min="1"
                    style="max-width: 80px"
                    @update:model-value="() => updateCart()"
                  />
                  <q-btn
                    flat
                    size="sm"
                    icon="delete"
                    color="red"
                    label="Eliminar"
                    class="q-ml-sm"
                    @click="removeItem(index)"
                  />
                </div>
              </div>

              <!-- Precio total por producto -->
              <div class="col-auto text-h6 text-primary">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <!-- Botones: Cancelar Todo y Pagar -->
          <div class="q-mt-xl row q-gutter-md justify-center">
            <q-btn
              outline
              color="secondary"
              label="Cancelar Todo"
              no-caps
              @click="clearCart"
            />
            <q-btn
              color="secondary"
              label="Pagar"
              no-caps
              @click="showPaymentSection = true"
            />
          </div>
        </div>

        <!-- Mensaje si el carrito está vacío -->
        <div v-else class="q-pa-md bg-orange-1 text-orange-8 text-center rounded-borders">
          Tu carrito está vacío.
        </div>
      </div>

      <!-- Columna derecha: Resumen del pedido -->
      <div class="col-4 col-lg-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-h6 q-mb-md">Resumen del Pedido</div>

          <div class="row justify-between q-mb-sm">
            <div>Subtotal ({{ totalItems }} artículos)</div>
            <div>{{ formatPrice(subtotal) }}</div>
          </div>

          <div class="row justify-between q-mb-sm">
            <div>Envío</div>
            <div>Gratis</div>
          </div>

          <div class="row justify-between q-mb-sm">
            <div class="text-h6">Total</div>
            <div class="text-h6 text-primary">{{ formatPrice(total) }}</div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Sección de pago (mostrada al clic en "Pagar") -->
    <div v-if="showPaymentSection" class="q-mt-xl">
      <!-- Información de envío -->
      <q-card flat bordered class="q-pa-md q-mb-xl col-8">
        <div class="text-h6 q-mb-md">Información de Envío</div>
        <q-input
          v-model="shipping.fullName"
          outlined
          label="Nombre completo"
          class="q-mb-md"
        />
        <q-input
          v-model="shipping.address"
          outlined
          label="Dirección de entrega"
          class="q-mb-md"
        />
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-4">
            <q-input
              v-model="shipping.department"
              outlined
              label="Departamento"
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-input
              v-model="shipping.province"
              outlined
              label="Provincia"
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-input
              v-model="shipping.district"
              outlined
              label="Distrito"
            />
          </div>
        </div>
      </q-card>

      <!-- Pago -->
      <q-card flat bordered class="q-pa-md col-8">
        <div class="text-h6 q-mb-md">Pago con Tarjeta de Crédito</div>
        <q-input
          v-model="payment.cardNumber"
          outlined
          label="Número de tarjeta"
          mask="#### #### #### ####"
          unmask
          class="q-mb-md"
        />
        <q-input
          v-model="payment.cardHolder"
          outlined
          label="Nombre del titular"
          class="q-mb-md"
        />
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="payment.expiryDate"
              outlined
              label="Fecha de expiración"
              mask="##/##"
              unmask
              class="q-mb-md"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="payment.cvv"
              outlined
              label="Código CVV"
              mask="###"
              unmask
              class="q-mb-md"
            />
          </div>
        </div>

        <q-btn
          color="secondary"
          label="Finalizar Compra"
          icon="check"
          no-caps
          class="q-mt-md"
          @click="finalizePurchase"
        />
      </q-card>

      <!-- Mensaje de éxito -->
      <q-banner
        v-if="purchaseSuccess"
        class="bg-green-1 text-green-8 q-pa-md rounded-borders q-mt-xl"
        style="border: 1px solid #c6f6d5"
      >
        <q-icon name="check_circle" color="green" size="20px" class="q-mr-sm" />
        <span>Su compra ha sido procesada exitosamente</span>
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Carrito reactivos
const cartItems = ref([
  {
    id: 1,
    name: 'Laptop Gamer XYZ',
    category: 'Electrónica',
    tag: 'Nuevo',
    price: 1299,
    image: 'https://picsum.photos/200/200?random=8',
    quantity: 1
  },
  {
    id: 2,
    name: 'Audífonos Inalámbricos',
    category: 'Audio',
    tag: 'Cancelación de ruido',
    price: 199,
    image: 'https://picsum.photos/200/200?random=7',
    quantity: 1
  }
])

// Estado de pago
const showPaymentSection = ref(false)
const purchaseSuccess = ref(false)

// Información de envío y pago
const shipping = ref({
  fullName: '',
  address: '',
  department: '',
  province: '',
  district: ''
})

const payment = ref({
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
})

// Cálculos reactivos
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const total = computed(() => subtotal.value)

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Función para formatear precio
const formatPrice = (value) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

// Actualiza el carrito (opcional: persistir en localStorage)
const updateCart = () => {
  // Puedes guardar en localStorage aquí si lo deseas
}

// Eliminar un producto
const removeItem = (index) => {
  cartItems.value.splice(index, 1)
  if (cartItems.value.length === 0) {
    showPaymentSection.value = false
  }
}

// Vaciar todo el carrito
const clearCart = () => {
  cartItems.value = []
  showPaymentSection.value = false
}

// Finalizar compra
const finalizePurchase = () => {
  // Validación básica
  const required = [
    shipping.value.fullName,
    shipping.value.address,
    shipping.value.department,
    shipping.value.province,
    shipping.value.district,
    payment.value.cardNumber,
    payment.value.cardHolder,
    payment.value.expiryDate,
    payment.value.cvv
  ]

  if (required.some(field => !field.trim())) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, complete todos los campos.'
    })
    return
  }

  // Éxito
  purchaseSuccess.value = true

  // Opcional: reiniciar carrito y redirigir
  // setTimeout(() => {
  //   cartItems.value = []
  //   showPaymentSection.value = false
  //   purchaseSuccess.value = false
  //   // $router.push('/')
  // }, 3000)
}
</script>

<style scoped>
/* Estilos de respaldo */
@media (max-width: 599px) {
  .q-input {
    font-size: 14px;
  }

  .q-btn {
    width: 100%;
  }
}
</style>