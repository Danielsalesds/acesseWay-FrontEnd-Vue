<template>
  <aside class="left-sidebar">
    <ul>
      <li @click="$emit('change-view', 'feed')">
        <i class="fas fa-home"></i> Feed
      </li>
      <div v-if="role==='company'">
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
      <div v-if="role==='admin'">
        <li @click="$emit('change-view', 'request')">
        <i class="fa-solid fa-list-check"></i>
        Solicitações Pendentes
        </li>
      </div>
    </ul>
  </aside>
</template>
<script setup>
import { computed } from 'vue';
import { useAuthStore as userProfileStore } from '@/stores/loginStore'

const store = userProfileStore()
const role = computed(() => store.role?.toLowerCase())


</script>


<style scoped>
.left-sidebar {
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 10px 15px;
}

.left-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.left-sidebar li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: #b0b3b8;
  cursor: pointer;
}

.left-sidebar li:hover {
  background-color: #3a3b3c;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .left-sidebar {
    display: none;
  }
}
</style>
