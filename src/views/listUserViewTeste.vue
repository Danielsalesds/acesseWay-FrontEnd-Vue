<template>
  <div class="list-container" role="main">
    <div class="list-box" aria-labelledby="list-title">
      <h2 id="list-title">Lista de Usuários</h2>
      <button class="icon-btn" @click="toggleMenu">
        Search
      </button>
      <div v-if="menuOpen" class="dropdown">
        <input type="text" v-model="searchedName" placeholder="Digite um nome">
        <button type="submit" @click="handleSearch">Buscar</button>
        <div v-if="store.loading" class="loading">Carregando usuários...</div>
        <div v-else-if="store.error" class="error">{{ store.error }}</div>

        <ul v-else class="user-list">
          <li v-for="user in store.users" :key="user.id">
            <div class="card">
              <img :src="user.imageUrl" @error="tratarErroNaImagem($event,user.firstName, user.lastName)" alt="Avatar" width="75px" height="75px">
              <div class="userName">
                <p>{{ user.firstName }} {{ user.lastName }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="!store.loading && store.users.length === 0" class="no-users">
        Nenhum usuário encontrado.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/signupStore'
const store = useStore()
const searchedName = ref("")
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const tratarErroNaImagem = (event, firstName, lastName) => {
  event.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
  // event.target.src = `https://api.dicebear.com/8.x/bottts/svg?seed=${firstName}${lastName}`
}

// onMounted(async () => {
//   await store.getAllProfiles(name)
// })
const handleSearch = (async()=>{
  await store.getAllProfiles(searchedName.value)
})

</script>
<style>
  body{
    background-color: #18191a;
  }
</style>
<style scoped>
.dropdown {
  position: fixed;
  left: 0;
  top: 50px;
  background-color: #3a3b3c;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  padding: 12px;
  width: 25%;
  overflow: auto;
  z-index: 1001;
}
li{
  padding-top: 10px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
  border-bottom: 2px solid #4E4F50;
  display: flex;
  align-items: center;
  background-color: transparent;
}
.card:last-child {
  border-bottom: none;
}
.card:hover {
  background-color: #4E4F50; /* Cor de hover */
}
img {
  border-radius: 10px;
  padding: 5px;
}
.userName {
  font-weight: bold;
  padding-left: 10px;
}
.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f0f2f5; */
  background-color: #18191a;
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
  max-height: 400px; 
  overflow-y: auto; 
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #ccd0d5;
  font-size: 15px;
  color: #3a3b3c;
}

.user-item:last-child {
  border-bottom: none;
}

</style>
