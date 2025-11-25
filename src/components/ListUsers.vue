<template>
  <div class="dropdown">
    <button @click="$emit('close')" class="close-button">&times; </button>
    <div v-if="store.loading" class="loading">Carregando usuários...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>

    <ul v-else class="user-list">
      <li v-for="user in users" :key="user.id">
        <div v-if="user.id !== userStore.user.id" class="card">
          <img :src="user.imageUrl" @error="tratarErroNaImagem($event, user.firstName, user.lastName)" alt="Avatar"
            width="75px" height="75px">
          <div class="userName">
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </div>
        </div>
        <span v-else>Nenhum usuário encontrado.</span>
      </li>
    </ul>

    <div v-if="!store.loading && users.length === 0" class="no-users">Nenhum usuário encontrado.</div>
  </div>

</template>

<script setup>
import { defineProps } from 'vue'
import { useStore } from '@/stores/signupStore'
import { useAuthStore } from '@/stores/loginStore';

const userStore = useAuthStore();

defineProps({
  users: {
    type: Array,
    required: true
  }
})
const store = useStore()

const tratarErroNaImagem = (event, firstName, lastName) => {
  event.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
  // event.target.src = `https://api.dicebear.com/8.x/bottts/svg?seed=${firstName}${lastName}`
}


</script>

<style scoped>
body {
  background-color: #18191a;
}
</style>
<style scoped>
.dropdown {
  position: fixed;
  left: 100px;
  top: 50px;
  background-color: #3a3b3c;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 12px;
  width: 25%;
  overflow: auto;
  z-index: 1001;
}

.close-button {
  /* Isso vai funcionar PERFEITAMENTE.
    O botão será absoluto em relação ao .dropdown (que é 'fixed').
  */
  position: absolute;
  top: 10px;
  /* 10px do topo do .dropdown */
  right: 15px;
  /* 15px da direita do .dropdown */

  /* Estilização para o 'X' (usando suas cores dark) */
  background: transparent;
  border: none;
  cursor: pointer;
  color: #E4E6EB;
  /* Cor clara do texto */
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  padding: 0;
}

.close-button:hover {
  color: #ff0000;
  /* Brilho ao passar o mouse */
}

li {
  padding-top: 10px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  background-color: #4E4F50;
  /* Cor de hover */
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
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
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

.loading,
.error,
.no-users {
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

.user-list::-webkit-scrollbar {
  width: 8px;
  /* <-- Altere aqui para diminuir ou aumentar */
}

/* 2. Definindo o "Trilho" (a barra de fundo) */
.user-list::-webkit-scrollbar-track {
  background: #3a3b3c;
  /* Cor de fundo do seu modal */
  border-radius: 4px;
}

/* 3. Definindo o "Polegar" (a parte que você arrasta) */
.user-list::-webkit-scrollbar-thumb {
  background-color: #6b6b6b;
  /* Uma cor cinza sutil */
  border-radius: 4px;
  /* Borda arredondada */
  border: 2px solid #3a3b3c;
  /* Cria um "espaçamento" com a cor da trilha */
}

/* 4. (Opcional) Cor do "Polegar" ao passar o mouse */
.user-list::-webkit-scrollbar-thumb:hover {
  background-color: #888;
  /* Um cinza mais claro no hover */
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
