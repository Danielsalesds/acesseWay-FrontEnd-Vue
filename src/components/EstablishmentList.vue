<template>
    <section>
        <h1>Estabelecimento</h1>
        <h2 v-if="store.loading">Carregando...</h2>
        <ul v-else-if="store.establishments.length > 0" class="list">
            <li v-for="e in store.establishments" :key="e.id">
                <div class="card">
                    <img :src="e.imageUrl" alt="Imagem do estabelecimento" width="75px" height="75px">
                    <div class="name">
                        <p>{{e.name}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <h2 v-else> Nenhum estabelecimento encontrado</h2>
    </section>
</template>
<script setup>
import { useEstablishmentStore } from '@/stores/establishmentStore';
import StarRating from './StarRating.vue';
import { onMounted } from 'vue';
const store = useEstablishmentStore();
onMounted(()=>{
    store.getEstablishment();
})
</script>
<style>
.list {
  /* Propriedades de centralização */
  margin-left: auto;
  margin-right: auto;
  max-width: 600px; /* Você já tinha */
  width: 100%;      /* Você já tinha */

  /* Suas outras propriedades */
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 50px;
  background-color: #18191a;
  box-sizing: border-box;
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
li {
  list-style-type: none; /* Adicionado para remover bolinhas */
  padding-top: 10px;
}
img {
  border-radius: 10px;
  padding: 5px;
}
</style>