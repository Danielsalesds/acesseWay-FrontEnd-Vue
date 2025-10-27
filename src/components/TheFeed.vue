<template>
  <section class="feed">
    <!-- Criador de post -->
    <div class="post post-creator">
      <ThePostCreator />
    </div>

    <!-- Lista de posts -->
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{user.firstName}}</h3>
      <p>{{ post.conteudo }}</p>
    </div>
  </section>
</template>

<script setup>
import ThePostCreator from '../components/ThePostCreator.vue'
//import { ref } from 'vue'
import { onMounted } from 'vue'
import { usePostStore as userPost } from '@/stores/postStore'
import { useAuthStore } from '@/stores/loginStore'

const store = useAuthStore()
const user = store.user

const userPosts = userPost()
// Lista de posts reativa
const posts = userPosts.posts
onMounted(async () => {
  await userPosts.getAllPosts()
})
</script>


<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: calc(100vh - 60px);
  padding: 20px 0;
}

/* Todos os cards do feed (inclusive o criador) terão o mesmo tamanho */
.post {
  background-color: #242526;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 600px; /* controla a largura centralizada */
  box-sizing: border-box;
}

/* Deixa o criador sem margens internas extras */
.post-creator {
  padding: 0;
  background: none;
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
  .post {
    max-width: 95%;
  }
}
</style>