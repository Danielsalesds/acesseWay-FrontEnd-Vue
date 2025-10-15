<template>
  <div class="list-container" role="main">
    <div class="list-box" aria-labelledby="list-title">
      <h2 id="list-title">Lista de Usuários</h2>

      <div v-if="store.loading" class="loading">Carregando usuários...</div>
      <div v-else-if="store.error" class="error">{{ store.error }}</div>

      <ul v-else class="user-list">
        <li v-for="user in store.users" :key="user.id" class="user-item">
          <span class="user-id">ID: {{ user.id }}</span>
          <span class="user-name">Nome: {{ user.firstName }}</span>
        </li>
      </ul>

      <div v-if="!store.loading && store.users.length === 0" class="no-users">
        Nenhum usuário encontrado.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/signupStore'

const store = useStore()


onMounted(async () => {
  await store.getAllProfiles()
})
</script>

<style scoped>
.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.list-box {
  background-color: #fff;
  padding: 30px 35px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 100%;
  font-family: Arial, sans-serif;
}

.list-box h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1c1e21;
  margin-bottom: 20px;
}

.loading, .error, .no-users {
  text-align: center;
  margin-bottom: 15px;
  color: #606770;
}

.error {
  color: #d93025;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #ccd0d5;
  font-size: 15px;
  color: #1c1e21;
}

.user-item:last-child {
  border-bottom: none;
}
</style>
