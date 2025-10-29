<template>
  <article class="post-card">
    <!-- Cabeçalho -->
    <header class="post-header">
      <div class="author-section">
        <img
          src="https://via.placeholder.com/40"
          alt="Foto do autor"
          class="author-avatar"
        />
        <div class="author-info">
          <h3 class="author-name">{{ post.autorNome }}</h3>
          <small class="post-date">{{ formatDate(post.dataCriacao) }}</small>
        </div>
      </div>
      <button class="menu-btn">⋯</button>
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
      <button  class="action-btn">👍 Curtir</button>
      <button class="action-btn">💬 Comentar</button>
      <button class="action-btn">↗️ Compartilhar</button>
    </footer>
  </article>
</template>

<script setup>

/* eslint-disable no-undef */
defineProps({ post: Object })

function formatDate(date) {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
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

/* --- Curtidas --- */
.post-likes {
  margin-top: 8px;
  color: #b0b3b8;
  font-size: 0.85rem;
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
  transition: background 0.2s;
}

.action-btn:hover {
  background: #3a3b3c;
  color: #e4e6eb;
}
</style>
