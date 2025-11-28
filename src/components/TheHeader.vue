<template>
  <!-- <header class="header"> -->
  <!-- <Button v-if="showMenuButton" icon="pi pi-bars" @click="visible = true" />
    <Drawer v-model:visible="visible">
      <ul>
        <li @click="$emit('change-view', 'feed')">
          <i class="fas fa-home"></i> Feed
        </li>
        <div v-if="role === 'company'">
          <li @click="$emit('change-view', 'form')">
            <i class="fas fa-plus-square"></i> Novo Estabelecimento
          </li>
        </div>

        <li @click="$emit('change-view', 'map')">
          <i class="fas fa-map-marked-alt"></i> Mapa
        </li>
        <li @click="$emit('change-view', 'establishment-list')">
          <i class="fa-solid fa-location-dot"></i>
          Encontrar Locais
        </li>
        <div v-if="role === 'admin'">
          <li @click="$emit('change-view', 'request')">
            <i class="fa-solid fa-list-check"></i>
            Solicitações Pendentes
          </li>
        </div>
      </ul>
    </Drawer>
    <div class="header-left">
      <div class="logo">AccessWay</div>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Pesquisar na Way Plus" v-model="store.searchedName" @focus="openDropdown"
          @keydown.enter="search" />
      </div>
      <ListUsers v-show="isDropdownVisible" :users="store.users" @close="closeDropdown" />
    </div>

    <nav class="header-center">
      <button class="nav-btn" @click="$emit('show-home')">
        <i class="fas fa-home"></i>
      </button>
    </nav>

    <div class="header-right">

      <button class="icon-btn"><i class="fas fa-bell"></i></button>
      <button class="icon-btn"><i class="fas fa-comment-dots"></i></button>
      <UserMenu />
      <div>
      </div>
    </div> -->
  <!-- </header> -->
  <Toolbar style="background-color: #242526; border: none; border-bottom: 2px solid #333;">
    <template #start>
      <div style="display: flex; align-items: center; gap: 16px;">
        <Button v-if="showMenuButton" icon="pi pi-bars" @click="visible = true" text severity="secondary" />
        <div class="logo-container" @click="$emit('show-home')">
          <img v-if="!showMenuButton" src="/Icon.png" alt="Logo AccessWay" height="30" />
          <span class="logo-text">AccessWay</span>
          <!-- <Button icon="pi pi-home" aria-label="Home" variant="text" style="color: white;"/> -->
        </div>
        <IconField v-if="!showMenuButton">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Buscar" v-model="store.searchedName" @focus="toggle" @keydown.enter="search" />
        </IconField>
        <!-- <Popover ref="op" style="background-color: #3a3b3c;">
          <div class="list-container">

            <div v-if="store.loading" class="p-3 text-center">
              <i class="pi pi-spin pi-spinner"></i> Carregando...
            </div>

            <div v-else-if="store.users.length === 0" class="p-3 text-center text-gray-500">
              Nenhum usuário encontrado.
            </div>

            <Listbox v-else :options="store.users" optionLabel="firstName" class="listbox"
              listStyle="max-height: 300px">
              <template #option="slotProps">
                <div class="list-users">
                  <img :src="slotProps.option.imageUrl" class="border-circle"
                    style="width: 40px; height: 40px; object-fit: cover"
                    @error="$event.target.src = 'https://ui-avatars.com/api/?background=random&name=' + slotProps.option.firstName" />
                  <div class="flex flex-column">
                    <span class="font-bold">{{ slotProps.option.firstName }} {{ slotProps.option.lastName }}</span>
                  </div>
                </div>
              </template>
</Listbox>
</div>
</Popover> -->
        <Popover ref="op" class="search-popover">
          <div class="search-results-container">

            <div v-if="store.loading" class="state-message">
              <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
            </div>

            <div v-else-if="store.users.length === 0" class="state-message text-gray-400">
              Nenhum usuário encontrado.
            </div>

            <ul v-else class="result-list">
              <li v-for="user in store.users" :key="user.id" class="result-item" @click="goToProfile(user.id)">
                <img :src="user.imageUrl" class="user-avatar"
                  @error="$event.target.src = 'https://ui-avatars.com/api/?background=random&name=' + user.firstName" />

                <div class="user-info">
                  <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
                  <span class="user-subtitle">Ver perfil</span>
                </div>
              </li>
            </ul>

          </div>
        </Popover>
        <!-- <ListUsers v-show="isDropdownVisible & !showMenuButton" :users="store.users" @close="closeDropdown" /> -->
      </div>


    </template>

    <template #end>
      <Button v-if="showMenuButton" icon="pi pi-search" variant="text" style="color: white;"
        @click="searchView = !searchView" />
      <!-- <InputText v-if="searchView" placeholder="Search" v-model="store.searchedName" @focus="openDropdown" @keydown.enter="search" /> -->
      <UserMenu />
    </template>
  </Toolbar>

  <Drawer v-model:visible="searchView" header="Buscar" position="top" style="height: auto">
    <IconField>
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText placeholder="Buscar" v-model="store.searchedName" @focus="toggle" @keydown.enter="search" />
    </IconField>
    <!-- <Popover ref="op" style="background-color: #3a3b3c;">
      <div class="list-container">

        <div v-if="store.loading" class="p-3 text-center">
          <i class="pi pi-spin pi-spinner"></i> Carregando...
        </div>

        <div v-else-if="store.users.length === 0" class="p-3 text-center text-gray-500">
          Nenhum usuário encontrado.
        </div>

        <Listbox v-else :options="store.users" optionLabel="firstName" class="listbox" listStyle="max-height: 300px">
          <template #option="slotProps">
            <div class="list-users">
              <img :src="slotProps.option.imageUrl" class="border-circle"
                style="width: 40px; height: 40px; object-fit: cover"
                @error="$event.target.src = 'https://ui-avatars.com/api/?background=random&name=' + slotProps.option.firstName" />
              <div class="flex flex-column">
                <span class="font-bold">{{ slotProps.option.firstName }} {{ slotProps.option.lastName }}</span>
              </div>
            </div>
          </template>
        </Listbox>
      </div>
    </Popover> -->
    <Popover ref="op" class="search-popover">
      <div class="search-results-container">

        <div v-if="store.loading" class="state-message">
          <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
        </div>

        <div v-else-if="store.users.length === 0" class="state-message text-gray-400">
          Nenhum usuário encontrado.
        </div>

        <ul v-else class="result-list">
          <li v-for="user in store.users" :key="user.id" class="result-item" @click="goToProfile(user.id)">
            <img :src="user.imageUrl" class="user-avatar"
              @error="$event.target.src = 'https://ui-avatars.com/api/?background=random&name=' + user.firstName" />

            <div class="user-info">
              <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
              <span class="user-subtitle">Ver perfil</span>
            </div>
          </li>
        </ul>

      </div>
    </Popover>
    <!-- <ListUsers v-show="isDropdownVisible" :users="store.users" @close="closeDropdown" /> -->
  </Drawer>

  <Drawer v-model:visible="visible" class="hamburguer">
    <ul>
      <li @click="$emit('change-view', 'feed')">
        <i class="fas fa-home"></i> Feed
      </li>
      <div v-if="role === 'company'">
        <li @click="$emit('change-view', 'form')">
          <i class="fas fa-plus-square"></i> Novo Estabelecimento
        </li>
      </div>
      <li @click="$emit('change-view', 'map')">
        <i class="fas fa-map-marked-alt"></i> Mapa
      </li>
      <li @click="$emit('change-view', 'establishment-list')">
        <i class="fa-solid fa-location-dot"></i>
        Encontrar Locais
      </li>
      <div v-if="role === 'admin'">
        <li @click="$emit('change-view', 'request')">
          <i class="fa-solid fa-list-check"></i>
          Solicitações Pendentes
        </li>
      </div>
    </ul>
  </Drawer>
</template>

<script setup>
import UserMenu from '../components/TheDropdownProfile.vue'
import { useStore } from '@/stores/signupStore'
import { ref, defineProps } from 'vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Toolbar from 'primevue/toolbar';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon';
import Popover from 'primevue/popover';
import { useRouter } from 'vue-router';


const router = useRouter();
const store = useStore()

// const isDropdownVisible = ref(false);
const searchView = ref(false);
const visible = ref(false);
defineProps({
  showMenuButton: {
    type: Boolean,
    default: false
  }
});
// const openDropdown = () => {
//   isDropdownVisible.value = true
// }

// const closeDropdown = () => {
//   isDropdownVisible.value = false
//   store.users = []
//   store.searchedName = ''
// }

const search = async () => {
  await store.getAllProfiles()
  // openDropdown()
}

const op = ref();

const toggle = (event) => {
  op.value.toggle(event);
}
const goToProfile = (userId) => {
    op.value.hide();
    router.push({ name: 'UserProfile', params: { id: userId } });
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

:deep(.p-popover) {
  background: #242424;
  /* Fundo do menu */
  border: 1px solid #3E4042;
  padding: 0;
  /* Remove padding padrão do componente */
  border-radius: 8px;
  overflow: hidden;
  /* Garante que os itens não vazem as bordas arredondadas */
}

:deep(.p-popover-content) {
  padding: 0 !important;
  /* Remove padding interno do PrimeVue */
}

.search-results-container {
  width: 300px;
  /* Largura fixa ou min-width */
}

.state-message {
  padding: 20px;
  text-align: center;
  color: #b0b3b8;
}

/* A Lista */
.result-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  /* Scroll se tiver muitos usuários */
}

/* O Item Individual */
.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #2f3031;
  /* Divisor sutil */
}

/* Remove a borda do último item */
.result-item:last-child {
  border-bottom: none;
}

/* Efeito Hover (Parecido com Facebook/Instagram) */
.result-item:hover {
  background-color: #3a3b3c;
  /* Um pouco mais claro que o fundo */
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Textos */
.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: #e4e6eb;
  font-weight: 600;
  font-size: 0.95rem;
}

.user-subtitle {
  color: #b0b3b8;
  font-size: 0.8rem;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20rem;
}

.listbox {
  width: 100% !important;
  border: none !important;
  background-color: #3a3b3c !important;
}

.list-users {
  background-color: transparent;
  display: flex;
  width: 100%;
  border: none;
  gap: 5px;
  cursor: pointer;
  align-items: center;
}

.logo-container {
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 2px;
}

.hamburguer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hamburguer li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: #b0b3b8;
  cursor: pointer;
}

.hamburguer li:hover {
  background-color: #3a3b3c;
  border-radius: 8px;
}

/* ====== HEADER GERAL ====== */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
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

/* ===== Responsividade ===== */
@media (max-width: 1024px) {
  .search-bar input {
    width: 180px;
  }

  .header-center {
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .search-bar input {
    display: none;
    /* Oculta a barra de busca */
  }

  .header-center {
    gap: 15px;
  }

  .header-right p {
    display: none;
    /* Oculta nome do usuário */
  }
}
</style>
