<template>
    <div class="main">
        <Splitter style="height: 300px" :gutterSize="8" :layout="splitterLayout" class="container-splitter">
            <SplitterPanel class="list-panel" :size="40" :minSize="30">
                <h2>Explorando a Região</h2>
                <InputGroup>
                    <InputText id="input-search" v-model="searchedName" placeholder="Buscar por nome..."
                        @keyup.enter="search" />
                    <InputGroupAddon v-if="!searched">
                        <Button icon="pi pi-search" severity="secondary" variant="text" @click="search" />
                    </InputGroupAddon>
                    <InputGroupAddon v-else>
                        <Button icon="pi pi-times" severity="secondary" variant="text" @click="clear" />
                    </InputGroupAddon>
                </InputGroup>
                <h2 v-if="store.loading">Carregando...</h2>
                <ul v-else-if="store.establishments.length > 0" class="list">
                    <li v-for="e in store.establishments" :key="e.id" @mouseenter="store.focusOnEstablishment(e.id)"
                        @mouseleave="store.focusOnEstablishment(null)">
                        <div class="card">
                            <div class="e-data" @click="goToDetails(e.id)">
                                <img v-if="e.imageUrl != ''" :src="e.imageUrl" alt="Imagem do estabelecimento"
                                    width="75px" height="75px">
                                <img v-else src="https://placehold.net/default.png"
                                    alt="Estabelecimento sem imagem definida" width="75px" height="75px">
                                <p>{{ e.name }}</p>
                                <Button v-if="splitterLayout == 'vertical'" icon="pi pi-map-marker" rounded text
                                    severity="secondary" aria-label="Ver no mapa"
                                    @click.stop="store.focusOnEstablishment(e.id)" class="btn-map-mobile" />
                            </div>
                        </div>
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
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import EstablishmentMap from './EstablishmentMap.vue';
import { useEstablishmentStore } from '@/stores/establishmentStore';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useEstablishmentStore();
const searchedName = ref("");
const searched = ref(false);
const splitterLayout = ref('horizontal');
onMounted(() => {
    store.getEstablishment();
})
const search = () => {
    store.getEstablishment(searchedName.value);
    searched.value = true;
}
const clear = () => {
    store.getEstablishment()
    searchedName.value = ''
    searched.value = false;
}
const checkScreenSize = () => {
    splitterLayout.value = window.innerWidth < 768 ? 'vertical' : 'horizontal';
};

onMounted(() => {
    checkScreenSize(); // Checa na hora que abre
    window.addEventListener('resize', checkScreenSize); // Checa se redimensionar
});
onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});
const goToDetails = (id) => {
    router.push({ name: 'establishmentDetails', params: { id: id } });
};
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
    cursor: pointer;
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

.btn-map-mobile {
    flex-shrink: 0;
    margin-left: 10px;
    color: #0d47a1 !important;
    background-color: grey;
}


@media (max-width: 767px) {
    .map-panel {
        min-height: 400px;
        height: 40vh;
    }
    .list-panel {
        height: 50vh;
    }
}
</style>