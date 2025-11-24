<template>
  <q-page padding>
    <!-- Título -->
    <div class="text-h5 text-center q-mb-xl">Detalle del Producto</div>

    <!-- Producto y vendedor -->
    <div class="row q-col-gutter-md items-start">
      <!-- Imagen del producto -->
      <div class="col-12 col-sm-4">
        <q-img
          src="https://picsum.photos/200/200?random=1"
          style="height: 250px; object-fit: contain"
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

        <!-- Botones de acción -->
        <div class="row q-gutter-sm">
          <q-btn
            outline
            color="secondary"
            size="sm"
            label="+Agregar al Carrito"
            no-caps
          />
          <q-btn
            color="secondary"
            size="sm"
            label="Comprar"
            no-caps
          />
        </div>
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

    <!-- Sección: Déjanos tus preguntas -->
    <div class="q-mt-xl">
      <div class="text-h6">Déjanos tus preguntas</div>
      <div class="q-mt-md">
        <q-input
          v-model="question"
          type="textarea"
          autogrow
          outlined
          placeholder="Escribe un comentario..."
          class="full-width"
          @keyup.enter="sendQuestion"
        >
          <template v-slot:before>
            <q-avatar size="30px">
              <div class="text-caption bg-grey-3 text-grey-8">Tú</div>
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-btn
              color="secondary"
              size="sm"
              label="Enviar"
              no-caps
              @click="sendQuestion"
            />
          </template>
        </q-input>
      </div>

      <!-- Mensaje de éxito -->
      <q-banner
        v-if="showQuestionSuccess"
        class="bg-green-1 text-green-8 q-pa-md rounded-borders q-mt-md"
        style="border: 1px solid #c6f6d5"
      >
        <q-icon name="check_circle" color="green" size="20px" class="q-mr-sm" />
        <span>Tu pregunta ha sido enviada</span>
      </q-banner>
    </div>

    <!-- Sección: Déjanos tus comentarios -->
    <div class="q-mt-xl">
      <div class="text-h6">Déjanos tus comentarios</div>
      <div class="q-mt-md">
        <q-input
          v-model="comment"
          type="textarea"
          autogrow
          outlined
          placeholder="Escribe un comentario..."
          class="full-width"
          @keyup.enter="sendComment"
        >
          <template v-slot:before>
            <q-avatar size="30px">
              <div class="text-caption bg-grey-3 text-grey-8">Tú</div>
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-btn
              color="secondary"
              size="sm"
              label="Enviar"
              no-caps
              @click="sendComment"
            />
          </template>
        </q-input>
      </div>

      <!-- Lista de comentarios -->
      <div class="q-mt-md">
        <div
          v-for="(item, index) in comments"
          :key="index"
          class="q-pa-md bg-white rounded-borders q-mb-sm"
        >
          <div class="row items-start">
            <q-avatar size="30px" class="q-mr-sm">
              <div class="text-caption bg-grey-3 text-grey-8">{{ item.avatar }}</div>
            </q-avatar>
            <div class="col">
              <div class="text-weight-bold">{{ item.name }}</div>
              <div class="text-caption text-grey-8">{{ item.date }}</div>
              <div class="text-body2 q-mt-sm">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado para preguntas
const question = ref('')
const showQuestionSuccess = ref(false)

// Estado para comentarios
const comment = ref('')
const comments = ref([
  {
    avatar: 'CR',
    name: 'Carlos Ruiz',
    date: '20/09/2025',
    text: 'Excelente producto, muy rápido en responder el vendedor. ¿Aceptan pago por transferencia?'
  },
  {
    avatar: 'AP',
    name: 'Ana Pérez',
    date: '19/09/2025',
    text: 'Llegó antes de lo esperado y en perfecto estado. Muy recomendable.'
  },
  {
    avatar: 'Tú',
    name: 'Tú',
    date: '18/09/2025',
    text: '¡Hola Carlos! Sí, aceptamos transferencia bancaria. Puedes contactarme por mensaje directo.'
  }
])

// Funciones
const sendQuestion = () => {
  if (!question.value.trim()) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, escribe tu pregunta.'
    })
    return
  }

  // Simulación de envío
  showQuestionSuccess.value = true
  question.value = '' // Limpiar campo

  // Opcional: mostrar notificación temporal
  setTimeout(() => {
    showQuestionSuccess.value = false
  }, 3000)
}

const sendComment = () => {
  if (!comment.value.trim()) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, escribe tu comentario.'
    })
    return
  }

  // Simulación de envío
  comments.value.unshift({
    avatar: 'Tú',
    name: 'Tú',
    date: new Date().toLocaleDateString(),
    text: comment.value
  })

  comment.value = '' // Limpiar campo
}
</script>

<style scoped>
/* Ajuste para avatares en comentarios */
.q-avatar {
  font-size: 12px;
}

/* Estilo del banner de éxito */
.q-banner--active {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive: en móvil, ajustar márgenes */
@media (max-width: 599px) {
  .q-input {
    font-size: 14px;
  }

  .q-btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>