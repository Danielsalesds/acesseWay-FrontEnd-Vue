<template>
  <header class="header">
    <!-- ESQUERDA: Logo + busca -->
    <div class="header-left">
      <div class="logo">Way Plus</div>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Pesquisar na Way Plus" />
      </div>
    </div>

    <!-- CENTRO: Ícones de navegação -->
    <nav class="header-center">
      <button class="nav-btn active"><i class="fas fa-home"></i></button>
      <button class="nav-btn"><i class="fas fa-users"></i></button>
      <button class="nav-btn"><i class="fas fa-briefcase"></i></button>
    </nav>

    <!-- DIREITA: Ações do usuário -->
    <div class="header-right">
      
      <button class="icon-btn"><i class="fas fa-bell"></i></button>
      <button class="icon-btn"><i class="fas fa-comment-dots"></i></button>
      <button class="icon-btn"><i class="fas fa-user"></i></button>
      <div>
        <p v-if="userStore.email">{{ userStore.firstName }} {{ userStore.lastName }}</p>
        <p v-else>Visitante</p>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: "TheHeader",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* ====== HEADER GERAL ====== */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 98%;
  height: 60px;
  background-color: #242526;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  
}

/* ====== LOGO + BUSCA ====== */
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.search-bar {
  position: relative;
}

.search-bar i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b3b8;
  font-size: 14px;
}

.search-bar input {
  background-color: #3a3b3c;
  border: none;
  border-radius: 25px;
  padding: 8px 12px 8px 36px;
  color: white;
  width: 230px;
  font-size: 14px;
}

.search-bar input::placeholder {
  color: #b0b3b8;
}

/* ====== CENTRO: NAVEGAÇÃO ====== */
.header-center {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-btn {
  background: none;
  border: none;
  color: #b0b3b8;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
  padding-bottom: 4px;
}

.nav-btn:hover {
  color: #2d88ff;
}

/* ====== DIREITA: ÍCONES ====== */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
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
