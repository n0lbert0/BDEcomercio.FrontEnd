<template>
  <q-page padding>
    <!-- Título -->
    <div class="text-h5 text-center q-mb-xl">Califica a tu vendedor</div>

    <!-- Producto y vendedor -->
    <div class="row q-col-gutter-md items-start">
      <!-- Imagen del producto -->
      <div class="col-12 col-sm-4">
        <q-img
          src="https://picsum.photos/200/200?random=8"
          style="height: 200px; object-fit: contain"
          class="rounded-borders"
        />
      </div>

      <!-- Detalles del producto -->
      <div class="col-12 col-sm-5">
        <div class="text-h6 text-weight-bold">Laptop Gamer XYZ</div>
        <div class="text-grey-8 text-caption q-mb-md">
          Laptop potente con 16GB RAM, SSD 512GB, ideal para diseño y juegos.
        </div>
        <div class="text-h6 text-primary q-mb-lg">$1,299</div>
      </div>

      <!-- Información del vendedor -->
      <div class="col-12 col-sm-3">
        <div class="text-h6 text-weight-bold">Información del Vendedor</div>
        <div class="row items-center q-mt-sm">
          <q-avatar size="40px" class="q-mr-sm">
            <div class="text-caption bg-grey-3 text-grey-8">ML</div>
          </q-avatar>
          <div>
            <div class="text-body1">María López</div>
            <div class="text-caption text-grey-8">Reputación</div>
            <div class="text-caption text-yellow-8">
              4.9
              <q-icon name="star" size="16px" class="text-yellow-8" />
              <q-icon name="star" size="16px" class="text-yellow-8" />
              <q-icon name="star" size="16px" class="text-yellow-8" />
              <q-icon name="star" size="16px" class="text-yellow-8" />
              <q-icon name="star_half" size="16px" class="text-yellow-8" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Calificar experiencia -->
    <div class="q-mt-xl">
      <div class="text-h6">Califica tu experiencia</div>
      <div class="text-grey-8 text-caption q-mb-sm">¿Cómo fue tu trato con María López?</div>

      <!-- Estrellas -->
      <div class="q-mt-md">
        <q-rating
          v-model="rating"
          size="24px"
          color="yellow"
          icon="star"
          icon-selected="star"
          icon-half="star_half"
          :max="5"
          @update:model-value="onRatingChange"
        />
        <div class="text-caption text-grey-8 q-mt-xs">{{ rating }} de 5 estrellas</div>
      </div>
    </div>

    <!-- Comentario opcional -->
    <div class="q-mt-xl">
      <div class="text-h6">Comentario (opcional)</div>
      <q-input
        v-model="comment"
        type="textarea"
        autogrow
        outlined
        placeholder="El vendedor fue muy amable y rápido en responder. El producto llegó en perfectas condiciones y antes de lo esperado. Muy recomendable."
        class="q-mt-sm"
        style="min-height: 100px"
      />
    </div>

    <!-- Botón Enviar Calificación -->
    <div class="q-mt-xl">
      <q-btn
        color="secondary"
        label="Enviar Calificación"
        icon="send"
        no-caps
        class="q-mb-md"
        @click="submitRating"
      />

      <!-- Mensaje de éxito (oculto por defecto) -->
      <q-banner
        v-if="showSuccess"
        class="bg-green-1 text-green-8 q-pa-md rounded-borders"
        style="border: 1px solid #c6f6d5"
      >
        <q-icon name="check_circle" color="green" size="20px" class="q-mr-sm" />
        <span><strong>Gracias por tu calificación</strong></span>
        <div class="text-caption q-mt-sm">Tu opinión ayuda a mejorar la comunidad.</div>
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado de la calificación
const rating = ref(4.5)
const comment = ref('')
const showSuccess = ref(false)

// Función para manejar el cambio de estrellas
const onRatingChange = (value) => {
  console.log('Calificación seleccionada:', value)
}

// Función para enviar la calificación
const submitRating = () => {
  if (rating.value === 0) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, selecciona una calificación.'
    })
    return
  }

  // Simulación de envío
  showSuccess.value = true

  // Opcional: limpiar formulario después de enviar
  // comment.value = ''
  // rating.value = 0
}
</script>

<style scoped>
/* Ajuste para centrar estrellas en móvil */
@media (max-width: 599px) {
  .q-rating {
    justify-content: center;
  }
}

/* Estilo del botón "Enviar Calificación" */
.q-btn--active {
  box-shadow: 0 4px 12px rgba(76, 81, 191, 0.2);
}
</style>