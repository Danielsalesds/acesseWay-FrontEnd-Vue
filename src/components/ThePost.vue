<template>
  <article class="post-card">
    <!-- Cabeçalho -->
    <header class="post-header">
      <div class="author-section">
        <img
          :src="post.autorFoto "
          alt="Foto do autor"
          class="author-avatar"
        />
        <div class="author-info">
          <h3 class="author-name">{{ post.autorNome }}</h3>
          <small class="post-date">{{ formatDate(post.dataCriacao) }}</small>
        </div>
      </div>
      <button class="menu-btn" @click="toggleMenu">⋯</button>

      <div v-if="menuOpen" class="dropdown-menu">
        <button @click="handleDelete(post.id)">🗑 Excluir</button>
        <button @click="openReport">🚩 Denunciar</button>
      </div>
    </header>

    <!-- Texto do post -->
    <p class="post-content">{{ post.conteudo }}</p>

    <!-- Mídia (imagem ou vídeo) -->
    <div v-if="post.imagemUrl || post.videoUrl" class="post-media">
      <img
        v-if="post.imagemUrl"
        :src="post.imagemUrl"
        class="post-image"
        alt="Imagem do post"
      />
      <video
        v-if="post.videoUrl"
        :src="post.videoUrl"
        controls
        class="post-video"
      ></video>
    </div>

    <!-- Contagem de curtidas -->
    <div v-if="post.curtidas > 0" class="post-likes">
      ❤️ {{ post.curtidas }} {{ post.curtidas === 1 ? "curtida" : "curtidas" }}
    </div>

    <!-- Rodapé: Ações -->
    <footer class="post-actions">
      <button class="action-btn" @click="$emit('like', post.id)" :class="{ liked: post.curtido }">👍 Curtir</button>
      <button class="action-btn" @click="$emit('open-comments', post)">💬 Comentar</button>
      <button class="action-btn">↗️ Compartilhar</button>
    </footer>
  </article>

  <!--Modal-->
  <div v-if="reportOpen" class="report-overlay">
  <div class="report-modal">
    <h3>Denunciar publicação</h3>

    <div class="report-options">
      <label><input type="radio" value="conteudo_improprio" v-model="selectedReport" /> Conteúdo impróprio</label>
      <label><input type="radio" value="discurso_odio" v-model="selectedReport" /> Discurso de ódio</label>
      <label><input type="radio" value="spam" v-model="selectedReport" /> Spam</label>
    </div>

    <div class="report-actions">
      <button class="btn-cancel" @click="closeReport">Cancelar</button>
      <button class="btn-send" @click="sendReport(post.id)" :disabled="!selectedReport">Enviar</button>
    </div>
  </div>
</div>



</template>

<script setup>

/* eslint-disable no-undef */
defineProps({ post: Object, user: Object, })
const emit = defineEmits(["delete", "report"])


import { ref } from "vue"

//const defaultImage = 'https://via.placeholder.com/120?text=Perfil'

const menuOpen = ref(false)
const reportOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function handleDelete(id) {
  // dispara evento pro pai
  menuOpen.value = false
  
  emit('delete', id)

}

function openReport() {
  reportOpen.value = true
  menuOpen.value = false
}
function closeReport() {
  reportOpen.value = false
  selectedReport.value = ""
}



function formatDate(date) {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

//config do modal

const selectedReport = ref("")

function sendReport(idPost) {
  if (!selectedReport.value) return alert("Selecione um motivo")

  emit("report", {
    postId: idPost,
    reason: selectedReport.value
  })

  reportOpen.value = false
  selectedReport.value = ""
}


</script>

<style scoped>
.post-card {
  background: #242526;
  border-radius: 10px;
  padding: 12px 16px;
  width: 100%;
  max-width: 600px;
  color: #e4e6eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  margin: 0 auto 16px;
  font-family: "Segoe UI", sans-serif;
}

/* --- Cabeçalho --- */
.post-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0;
}

.post-date {
  color: #b0b3b8;
  font-size: 0.8rem;
}

.menu-btn {
  background: none;
  border: none;
  color: #b0b3b8;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 4px 8px;
}

/* --- Conteúdo --- */
.post-content {
  margin: 10px 0;
  color: #e4e6eb;
  line-height: 1.4;
  font-size: 0.95rem;
}

/* --- Mídia --- */
.post-media {
  margin-top: 10px;
}

.post-image,
.post-video {
  width: 100%;
  border-radius: 10px;
  margin-top: 8px;
  object-fit: cover;
  background: #000;
}

/* --- Curtidas (Facebook style) --- */
.post-likes {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  margin-left: 6px;
  color: #b0b3b8;
  font-size: 0.85rem;
}

.post-likes::before {
  content: "👍";
  background: #1877f2;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 50%;
  padding: 3px 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* --- Ações --- */
.post-actions {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #3a3b3c;
  margin-top: 10px;
  padding-top: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: #b0b3b8;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Efeito hover */
.action-btn:hover {
  background: #3a3b3c;
  color: #e4e6eb;
}

/* Quando curtido */
.action-btn.liked {
  color: #1877f2;
  font-weight: 600;
}

/* Ícone de curtida azul (Facebook style) */
.action-btn.liked::before {
  content: "";
}
/*Menu dos 3 potinhos*/ 
.dropdown-menu {
  position: absolute;
  right: 10px;
  top: 40px;
  background: #3a3b3c;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 6px 0;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 6px 14px;
  text-align: left;
  width: 100%;
  color: #e4e6eb;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: #4a4b4d;
}
/* overlay escuro com blur */
.report-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

/* container do modal */
.report-modal {
  background: #242526;
  padding: 24px;
  width: 360px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  color: #fff;
  animation: fadeInScale 0.2s ease;
}

/* animação elegante */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.report-modal h3 {
  font-size: 18px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
}

/* opções */
.report-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 22px;
}

.report-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.15s;
}

.report-options label:hover {
  background: #3a3b3c;
}

/* botoes */
.report-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

button {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #3a3b3c;
  color: #fff;
}

.btn-cancel:hover {
  background: #4d4d4d;
}

.btn-send {
  background: #1877F2;
  color: #fff;
}

.btn-send:hover:not(:disabled) {
  background: #0d62d7;
}

.btn-send:disabled {
  background: #4f709d;
  opacity: 0.6;
  cursor: not-allowed;
}



</style>
