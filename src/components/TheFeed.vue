<template>
  <section class="feed">
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{ post.author }}</h3>
      <p>{{ post.content }}</p>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
     <h3>{{ post.author }}</h3>
     <p>{{ post.content }}</p>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
     <h3>{{ post.author }}</h3>
     <p>{{ post.content }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, author: "Daniel Sales", content: "Meu primeiro post!" },
        { id: 2, author: "João", content: "Olá, mundo!" },
      ]
    }
  }
}
</script>

<style scoped>
.feed {
  overflow-y: auto;
  height: calc(100vh - 60px);
  padding: 10px 20px;
}

.post {
  background-color: #242526;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}
</style>
