<template>
  <div class="modal-bg">
    <div class="modal-box">
      <h3>Denunciar Post</h3>

      <ul>
        <li v-for="op in options" :key="op">
          <label>
            <input type="radio" :value="op" v-model="selected" />
            {{ op }}
          </label>
        </li>
      </ul>

      <div class="actions">
        <button @click="$emit('close')">Cancelar</button>
        <button :disabled="!selected" @click="send">Enviar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selected = ref("")
const options = [
  "Conteúdo inadequado",
  "Spam / promoção",
  "Discurso de ódio"
]

function send() {
  if (!selected.value) return
  emit('send', selected.value)
}
</script>
<style scoped>
.report-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #242526;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
}
</style>
