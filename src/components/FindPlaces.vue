<template>
    <div class="main">
        <Splitter style="height: 300px" :gutterSize="8" class="container-splitter">
            <SplitterPanel class="list-panel" :size="40" :minSize="30">
                <h2 v-if="store.loading">Carregando...</h2>
                <ul v-else-if="store.establishments.length > 0" class="list">
                    <h2>Explorando a Região</h2>
                    <IconField>
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="value1" placeholder="Buscar por nome..." style="width: 100%" />
                    </IconField>


                    <li v-for="e in store.establishments" :key="e.id"
                        @mouseenter="store.focusOnEstablishment(e.id)"
                        @mouseleave="store.focusOnEstablishment(null)">
                        <router-link :to="{ name: 'establishmentDetails', params: { id: e.id } }" class="card">
                            <div class="e-data">
                                <img v-if="e.imageUrl != ''" :src="e.imageUrl" alt="Imagem do estabelecimento"
                                    width="75px" height="75px">
                                <img v-else src="https://placehold.net/default.png"
                                    alt="Estabelecimento sem imagem definida" width="75px" height="75px">
                                <p>{{ e.name }}</p>
                                <span class="sr-only">Leia mais sobre {{ e.name }}</span>
                            </div>
                            <!-- <StarRating :rating="e.averageRating" /> -->
                        </router-link>
                    </li>
                </ul>
                <h2 v-else> Nenhum estabelecimento encontrado</h2>
            </SplitterPanel>
            <SplitterPanel class="map-panel" :size="60">
                <EstablishmentMap />
            </SplitterPanel>
        </Splitter>

    </div>
</template>
<script setup>
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext'
import EstablishmentMap from './EstablishmentMap.vue';
import { useEstablishmentStore } from '@/stores/establishmentStore';
// import StarRating from './StarRating.vue';
import { onMounted} from 'vue';
const store = useEstablishmentStore();
onMounted(() => {
    store.getEstablishment();
})
</script>

<style scoped>
.main {
    padding: 0;
    color: #e4e6eb;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.container-splitter {
    flex-grow: 1;
    /* Ocupa todo o espaço vertical disponível */
    width: 100%;
    border: none;
}

.list {
    margin: 0;
    padding: 10px;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 10px;
}

.card {
    display: block;
    color: inherit;
    text-decoration: none;
    justify-content: space-between;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 10px;
    border-bottom: 2px solid #4E4F50;
    padding: 10px;
    display: flex;
    align-items: center;
    /* background-color: transparent; */
    background-color: #242424;
}

.card:last-child {
    border-bottom: none;
}

.card:hover {
    background-color: #4E4F50;
}

.e-data {
    display: flex;
    align-items: center;
}

li {
    list-style-type: none;
}

img {
    border-radius: 10px;
    padding: 5px;
}

/* .container-splitter {
    height: calc(100vh - 64px); 
    border: none;
  } */
.list-panel,
.map-panel {
    padding: 8px;
    box-sizing: border-box;
    overflow: hidden;
}

.list-panel {
    overflow-y: auto;
}


@media (max-width: 767px) {
    .container-splitter {
        height: auto;
        layout: vertical;
    }
}
</style>