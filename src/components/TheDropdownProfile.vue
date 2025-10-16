<template>
    <div class="user-menu">
    <button class="icon-btn" @click="toggleMenu">
        <i class="fas fa-user"></i>
    </button>

    <div v-if="menuOpen" class="dropdown">
        <p class="user-name">teste</p>
        <p class="user-email">teste</p>
        <hr />
        <button @click="goToEditProfile">Editar perfil</button>
        <button @click="logout">Sair</button>
    </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/loginStore'

const store = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function goToEditProfile() {
  menuOpen.value = false
  router.push('/update')
}

function logout() {
  store.logout()
  router.push('/')
}
</script>
<style scoped>
    .user-menu {
  position: relative;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: #3a3b3c;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  padding: 12px;
  width: 180px;
  z-index: 1001;
}

.dropdown p {
  margin: 4px 0;
  font-size: 14px;
}

.dropdown hr {
  border: none;
  border-top: 1px solid #555;
  margin: 8px 0;
}

.dropdown button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: #b0b3b8;
  padding: 6px 0;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}

.dropdown button:hover {
  color: #2d88ff;
}
.icon-btn {
  background-color: #3a3b3c;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: #4e4f50;
}

</style>

