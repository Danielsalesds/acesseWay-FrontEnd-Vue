<template>
  <section class="feed">

    <!-- Área de criação de novo post -->
    <div class="new-post">
      <h3>Criar novo post</h3>
      <textarea
        v-model="novoPost"
        placeholder="Escreva algo..."
        class="new-post-textarea"
      ></textarea>
      <button @click="criarPost" class="btn">Postar</button>
    </div>

    <div 
      v-for="post in posts" 
      :key="post.id" 
      class="post-card"
    >
      <!-- Cabeçalho -->
      <div class="header">
        <h3 class="author">Autor #{{ post.autorId }}</h3>
        <small class="date">{{ formatDate(post.dataCriacao) }}</small>
      </div>

      <!-- Conteúdo do post -->
      <p class="content">{{ post.conteudo }}</p>

      <!-- Mídias -->
      <div v-if="post.imagemUrl || post.videoUrl" class="media">
        <img 
          v-if="post.imagemUrl" 
          :src="post.imagemUrl" 
          alt="Imagem do post"
          class="post-image"
        />
        <video 
          v-if="post.videoUrl" 
          :src="post.videoUrl" 
          controls 
          class="post-video"
        />
      </div>

      <!-- Botões -->
      <div class="acoes">
        <button @click="curtirPost(post.id)" class="btn-like">
          ❤️ Curtir ({{ post.curtidas }})
        </button>
      </div>

      <!-- Curtidas -->
      <div class="likes">
        <span>❤️ {{ post.curtidas }} curtida{{ post.curtidas !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Comentários -->
      <div v-if="post.comentario && post.comentario.length > 0" class="comments">
        <h4>Comentários:</h4>
        <ul>
          <li v-for="(c, i) in post.comentario" :key="i">
            <strong v-if="c.usuarioId">Usuário #{{ c.usuarioId }}:</strong>
            <span>{{ c.texto || "(comentário vazio)" }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Nenhum post -->
    <p v-if="posts.length === 0" class="empty">Nenhum post encontrado 😢</p>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FeedPosts',
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8082/api/posts')
      this.posts = response.data
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },

  async curtirPost(postId) {
      try {
        await axios.post(
          `http://localhost:8080/api/posts/${postId}/curtir?usuarioId=${this.usuarioId}`
        );
        await this.carregarPosts();
      } catch (error) {
        console.error("Erro ao curtir post:", error);
      }
    },
}
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #18191a;
}

.post-card {
  background-color: #242526;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.author {
  color: #e4e6eb;
  font-weight: 600;
  margin: 0;
}

.date {
  color: #a0a0a0;
  font-size: 0.8rem;
}

.content {
  color: #b0b3b8;
  line-height: 1.5;
  margin: 8px 0;
}

.media {
  margin-top: 10px;
}

.post-image {
  width: 100%;
  max-height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 8px;
}

.post-video {
  width: 100%;
  border-radius: 10px;
  margin-top: 8px;
}

.likes {
  color: #b0b3b8;
  margin-top: 8px;
  font-size: 0.9rem;
}

.comments {
  margin-top: 12px;
  background-color: #3a3b3c;
  border-radius: 8px;
  padding: 10px;
}

.comments h4 {
  color: #e4e6eb;
  margin-bottom: 6px;
}

.comments ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.comments li {
  color: #b0b3b8;
  margin-bottom: 6px;
}

.empty {
  color: #888;
  text-align: center;
  margin-top: 30px;
  font-style: italic;
}

/* Novo post */
.new-post {
  background-color: #242526;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.new-post-textarea {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  border: none;
  padding: 10px;
  resize: none;
  background: #3a3b3c;
  color: #e4e6eb;
  margin-bottom: 10px;
}
.btn {
  background-color: #2374e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
/* Responsividade */
@media (max-width: 1024px) {
  .feed {
    padding: 10px 15px;
  }
}

@media (max-width: 768px) {
  .feed {
    padding: 10px;
  }
}
</style>
