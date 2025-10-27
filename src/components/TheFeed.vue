<template>
  <section class="feed">
    <!-- Criador de post -->
    <ThePostCreator />

    <!-- Posts -->
    <ThePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="handleLike(post.id)"
    />

    <p v-if="!loading && posts.length === 0" class="empty">Nenhum post ainda 😢</p>
  </section>
</template>

<script setup>
import ThePostCreator from '../components/ThePostCreator.vue'
//import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import { usePostStore as userPost } from '@/stores/postStore'
//import { useAuthStore } from '@/stores/loginStore'
import ThePost from '@/components/ThePost.vue'


//const store = useAuthStore()
//const user = store.user

const userPosts = userPost()
const loading = computed(() => userPosts.loading)
const posts = computed(() => userPosts.posts)


// Lista de posts reativa
//const posts = userPosts.posts
onMounted(async () => {
  await userPosts.getAllPosts()
})
function handleLike(postId) {
  userPosts.likePost(postId)
}
</script>


<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
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

/* Ajuste de rolagem suave */
.feed::-webkit-scrollbar {
  width: 8px;
}
.feed::-webkit-scrollbar-thumb {
  background: #3a3b3c;
  border-radius: 4px;
}

/* Responsividade */
@media (max-width: 768px) {
  .feed > * {
    max-width: 95%;
  }
}
</style>
