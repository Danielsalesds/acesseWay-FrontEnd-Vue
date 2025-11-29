<template>
  <aside class="left-sidebar">
    <ul>
      <li @click="goToHome">
        <i class="fas fa-home"></i> Feed
      </li>
      <!-- <div v-if="role === 'company'">
        <li @click="goToNewEstablishment">
          <i class="fas fa-plus-square"></i> Novo Estabelecimento
        </li>
      </div> -->

      <li @click="goToMap">
        <i class="fas fa-map-marked-alt"></i> Mapa
      </li>
      <li @click="goToFindPlaces">
        <i class="fa-solid fa-location-dot"></i>
        Encontrar Locais
      </li>
      <div v-if="role === 'admin'">
        <li @click="goToRequest">
          <i class="fa-solid fa-list-check"></i>
          Solicitações Pendentes
        </li>
      </div>
    </ul>
  </aside>
</template>
<script setup>
import { computed} from 'vue';
import { useAuthStore as userProfileStore } from '@/stores/loginStore'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = userProfileStore()
const role = computed(() => store.role?.toLowerCase())

function goToFindPlaces(){
  router.push({name: 'findPlaces'})
}
function goToHome(){
  router.push({name: 'home'})
}
function goToMap(){
  router.push({name: 'map'})
}
// function goToNewEstablishment(){
//   router.push({name:'newEstablishment'})
// }
function goToRequest(){
  router.push({name:'Request'})
}
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

.fixed-btn {
  /* Posicionamento */
  /* top: 10px; 
  left: 10px; */
  margin: 5px;
  /* Limitando o tamanho */
  width: 40px !important; 
  height: 40px !important;
  padding: 0 !important; /* Remove preenchimento interno para não engordar */
  
  /* Garante que fique acima de outros elementos se necessário */
  z-index: 10; 
}
@media (max-width: 768px) {
  .left-sidebar {
    display: none;
  }
}
</style>
