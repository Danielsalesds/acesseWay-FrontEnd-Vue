<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <header class="modal-header">
        <h2>Comentários</h2>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <div class="comment-list">
        <div
          v-for="c in post?.comentario || []"
          :key="c.data"
          class="comment-item"
        >
          <strong>{{ c.autorNome }}:</strong> {{ c.texto }}
        </div>
      </div>

      <footer class="comment-footer">
        <input
          v-model="novoComentario"
          placeholder="Escreva um comentário..."
          @keyup.enter="addComentario"
        />
        <button @click="addComentario">Enviar</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePostStore } from '@/stores/postStore'

/* eslint-disable no-undef */
const props = defineProps({ post: Object })
const postStore = usePostStore()
const novoComentario = ref('')

// Pegamos o post da store de forma reativa:
const post = computed(() =>
  postStore.posts.find(p => p.id === props.post.id)
)

async function addComentario() {
  if (!novoComentario.value.trim()) return

  try {
    await postStore.comentarPost(props.post.id, novoComentario.value)
    novoComentario.value = ''
  } catch (err) {
    console.error('Erro ao comentar:', err)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0; /* substitui top:0; left:0; width:100%; height:100% */
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* bem alto para sobrepor tudo */
}


.modal {
  background: #242526;
  border-radius: 10px;
  width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px;
  border-bottom: 1px solid #3a3b3c;
}

.comment-list {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.comment-item {
  margin-bottom: 8px;
  line-height: 1.4;
}

.comment-footer {
  border-top: 1px solid #3a3b3c;
  display: flex;
  gap: 8px;
  padding: 10px;
}

.comment-footer input {
  flex: 1;
  background: #3a3b3c;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 6px;
}

.comment-footer button {
  background: #1877f2;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.close-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
