<template>
  <section class="feed">
    <!-- Criador de post -->
    <ThePostCreator />

    <!-- Posts -->
    <!-- Só renderiza os posts se não estiver carregando -->
    <div v-if= "posts">
    <ThePost
      v-for="post in posts || []"
      :key="post.id"
      :post="post"
      :user="user"
      @like="handleLike(post.id)"
      @open-comments="openComments"
      @delete="deletePost"
      @report="reportPost"
    />
  </div>

  <div v-else class="text-center text-gray-400 p-4">
    Carregando posts...
  </div>

    <p v-if="!loading && posts.length === 0" class="empty">Nenhum post ainda 😢</p>

  </section>
  <!-- Modal -->
    <TheCommentModal
      v-if="selectedPost"
      :post="selectedPost"
      @close="closeComments"
    />
</template>

<script setup>
/* global defineExpose */
import ThePostCreator from '../components/ThePostCreator.vue'
//import { ref } from 'vue'
import { onMounted, computed, ref } from 'vue'
import TheCommentModal from '@/components/TheCommentModal.vue'

import { usePostStore as userPost } from '@/stores/postStore'
//import { useAuthStore } from '@/stores/loginStore'
import ThePost from '@/components/ThePost.vue'
import { useAuthStore } from '@/stores/loginStore'

const store = useAuthStore()
const user = store.user

//const store = useAuthStore()
//const user = store.user

const userPosts = userPost()
const loading = computed(() => userPosts.loading)
const posts = computed(() => userPosts.posts)

const selectedPost = ref(null)

async function reloadPosts() {
  await userPosts.postGetAllCp()
}

// Lista de posts reativa
//const posts = userPosts.posts
onMounted(async () => {
   if (posts.value.length === 0) {
    await userPosts.postGetAllCp()
  }

})
function openComments(posts) {
  selectedPost.value = posts
}

function closeComments() {
  selectedPost.value = null
}
//definir curtidas
async function handleLike(postId) {
  await userPosts.likePost(postId)
}
async function scrollToTop() {
  const feedElement = document.querySelector('.feed')
  if (feedElement) {
    feedElement.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
//deletar e reportar post
async function deletePost(id) {
  await userPosts.deletePost(id)
    alert("post excluido!")
}

async function reportPost({ postId, reason }) {
  alert("Denúncia enviada:"+ postId+ " denucia: " +reason)
}


// expõe a função para o componente pai (Home.vue) poder chamar
defineExpose({ reloadPosts, scrollToTop })
</script>


<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: calc(100vh - 60px);

  padding: 20px 0;
  background-color: #18191a; /* só pra deixar o fundo consistente */
}

/* Define um tamanho padrão e centralizado para todos os cards */
.feed > * {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

/* Espaçamento entre o criador e os posts */
.feed > * + * {
  margin-top: 20px; /* distância entre os cards */
}

/* Aparência dos cards de post */
.post {
  background-color: #242526;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* Estilo especial pro criador (opcional) */
.post-creator {
  background-color: #242526;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
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


/* Responsividade */
@media (max-width: 768px) {
  .feed > * {
    max-width: 95%;
  }
}
</style>
