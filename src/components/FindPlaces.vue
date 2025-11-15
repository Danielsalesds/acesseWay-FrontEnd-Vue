<template>
    <div class="main">
        <div class="columns">
            <aside class="list-column">
                <!-- <EstablishmentList/> -->
                <h2 v-if="store.loading">Carregando...</h2>
                <ul v-else-if="store.establishments.length > 0" class="list">
                    <li v-for="e in store.establishments" :key="e.id">
                        <router-link :to="{ name: 'establishmentDetails', params: { id: e.id } }" class="card">
                            <div class="e-data">
                            <img v-if="e.imageUrl != ''" :src="e.imageUrl" alt="Imagem do estabelecimento" width="75px" height="75px">
                            <img v-else src="https://placehold.net/default.png" alt="Estabelecimento sem imagem definida" width="75px" height="75px">
                            <p>{{e.name}}</p> 
                            <span class="sr-only">Leia mais sobre {{e.name}}</span>
                            </div>
                            <StarRating :rating="e.averageRating" />
                        </router-link>
                    </li>
                </ul>
                <h2 v-else> Nenhum estabelecimento encontrado</h2>
            </aside>
            <main class="map-column">
                <EstablishmentMap/>
            </main>
        </div>
    </div>
</template>
<script setup>
    import EstablishmentMap from './EstablishmentMap.vue';
    import { useEstablishmentStore } from '@/stores/establishmentStore';
    import StarRating from './StarRating.vue';
    import { onMounted } from 'vue';
    const store = useEstablishmentStore();
    onMounted(()=>{
        store.getEstablishment();
    })
</script>

<style scoped>
    .main{
        /* padding: 16px; */
        color: #e4e6eb;
    }
    .list-column,
    .map-column {
        border-radius: 8px;
        background-color: #242424;
    }
    /* .list-column{
        display: flex;
        justify-content: center;
        width: 100%;
    } */
    .columns{
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px; /* Espaço entre as colunas no mobile */
    }
    .list {
        margin: 0;
        padding: 10px;
        max-width: 600px;
        width: 100%;      
        display: flex;
        flex-direction: column;
        background-color: #242424;
        box-sizing: border-box;
        gap: 10px;
    }  
    .card {
        display: block;
        color: inherit;
        text-decoration: none;
        justify-content: space-between;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 10px;
        border-bottom: 2px solid #4E4F50;
        padding: 10px;
        display: flex;
        align-items: center;
        background-color: transparent;
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
    @media (min-width: 768px) {
        .columns {
            grid-template-columns: 2fr 3fr;
            align-items: flex-start; /* Alinha o topo */
            height: calc(100vh - 100px);
        }
        .list-column {
            overflow-y: auto;
            height: 100%;
        }
        .map-column {
            height: 100%;
        }
    }
</style>