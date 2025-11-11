<template>
    <TheHeader/>
    <div v-if="establishment" class="main">
        <img v-if="establishment.imageUrl != ''" :src="establishment.imageUrl" alt="Imagem do estabelecimento" class="banner-imagem">
        <img v-else src="https://placehold.net/default.png" alt="Estabelecimento sem imagem definida">
        <div class="header-hero">
            <h1>{{ establishment.name }}</h1>
            <div class="info-review">
                <StarRating :rating="establishment.averageRating"></StarRating>
                <p>({{ mediaFormatada }}) ({{ reviews.length }} avaliações) </p>
            </div>
        </div>
        <div class="columns">
            <main class="main-column">
                <h2>Avaliações</h2>
                <button @click="reviewOpen = !reviewOpen" class="btn-toggle-review">Deixe sua avaliação</button>
                <div v-if="reviewOpen" class="card-form" >
                    <div class="card-form-header">
                        <img :src="userStore.user.imageUrl" alt="" width="50px" height="50px" class="image-card">
                        <p><strong>{{ userStore.user.firstName }}</strong> (Sua avaliação)</p>
                    </div>
                    
                    <div class="card-form-body">
                        <label for="comment">Comentário:</label>
                        <textarea id="comment" v-model="reviewComment" rows="4"></textarea>
                        <label>Nota:</label>
                        <StarRatingButton v-model="reviewRating" />
                        <button @click="createReview" class="btn-submit">Enviar</button>
                    </div>
                    
                    
                </div>
                <li v-for="r in reviews" :key="r.id">
                    <div class="card">
                        <div class="card-header">
                            <img src="https://placehold.net/default.png" alt="Usuário sem imagem" width="50px" height="50px" class="image-card">
                            <p><strong>Name</strong></p>
                        </div>
                        <div class="card-body">
                            <StarRating :rating="r.rating"/>
                            <p>{{ r.comment }}</p>
                        </div>
                    </div>
                </li>    
            </main>
            <aside class="left-column">
                <h3>Informações</h3>
                <h4><i class="fa-solid fa-map-pin" style="color: #ff0000;"></i> Endereço: </h4>
                <!-- <p> {{ establishment.address.city }} - {{ establishment.address.state }}</p>
                <p> {{ establishment.address.neighborhood }}</p> -->
                <p> {{ establishment.address.street }} - {{ establishment.address.number }}</p>
                <p>
                    <i class="fa-solid fa-phone" style="color: #ff0000;"></i> 
                    <strong>Telefone: </strong> {{ establishment.phone }}
                </p>
            </aside>
        </div>  
    </div>
    <div v-else>
        Carregando detalhes...
    </div>
</template>

<script setup>
    import TheHeader from '@/components/TheHeader.vue'
    import { useEstablishmentStore } from '@/stores/establishmentStore';
    import { useAuthStore } from '@/stores/loginStore';
    import {defineProps, onMounted, ref, computed} from 'vue'
    import StarRating from './StarRating.vue';
    import StarRatingButton from './StarRatingButton.vue';
    const store = useEstablishmentStore();
    const userStore = useAuthStore();
    const reviewOpen = ref(false)
    const reviewRating = ref(0);
    const reviewComment = ref("");
    const props = defineProps({
        id:{
            type: String, 
            required: true
        }
    })
    const newReview = {
        comment: "",
        rating: 0,
        imageUrl: "",
        userId: null,
    }
    const establishment = ref(null)
    const reviews = ref(Array)
    const mediaFormatada = computed(() => {
        if (establishment.value?.averageRating) {
            return establishment.value.averageRating.toFixed(1);
        }
        return '...';
    });
    onMounted(async()=>{
        console.log(props.id)
        establishment.value = await store.getEstablishmentById(props.id);
        console.log(establishment.value)
        reviews.value = await store.getReview(props.id)
        console.log(reviews)
    });
    function createReview(){
        newReview.comment = reviewComment.value;
        newReview.rating = reviewRating.value;
        newReview.userId = userStore.user.id;
        store.sendReview(establishment.value.id, newReview);
        reviewComment.value = "";
        reviewRating.value = 0;
        reviewOpen.value = false;
    }
    
</script>
<style>
  :root{
    --column-color: #242526;
    --card-color: #3A3B3C;
  }

  body {
    background-color: #18191a;
    color: #e4e6eb;
  }
</style>

<style scoped>
    .main{
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
        color: #e4e6eb;
    }
    h4{
        margin-bottom: 0px;
    }
    .header-hero h1 {
        margin-bottom: 0px;
    }
    .info-review{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .banner-imagem {
        width: 100%;
        height: 400px;
        object-fit: cover;
        object-position: center;
        display: block; 
    }
    .image-card{
        border-radius: 10px;
        padding: 5px;
    }
    .main-column,
    .left-column {
        background-color: var(--column-color);
        border-radius: 8px; 
        padding: 16px;
    }
    .columns{
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px; /* Espaço entre as colunas no mobile */
    }
    li{
        list-style-type: none;
        padding-top: 10px;
    }
    .card{
        display: flex;
        flex-direction: column;
        background-color: var(--card-color);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
    }
    .card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;           
    }
    .card-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
        padding: 10px;
        gap: 8px;
    }

    .card p {
        margin: 0;
    }

    .card:hover {
        background-color: #4E4F50;
    }
    .btn-toggle-review {
        background-color: var(--card-color);
        color: #e4e6eb; /* Cor do seu texto principal */
        border: 1px solid #4E4F50;
        border-radius: 6px;
        padding: 10px 16px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-bottom: 16px;
    }
    .btn-toggle-review:hover {
        background-color: #4E4F50;
    }
    .card-form{
        background-color: var(--card-color);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .card-form-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px; 
    }
    .card-form-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
    }
    .card-form-body label {
        font-weight: bold;
        font-size: 0.9rem;
        color: #B0B3B8;
        margin-bottom: -8px;
    }

    .card-form-body textarea {
        width: 100%;
        background-color: #4E4F50; 
        color: #e4e6eb;
        border: 1px solid #5f6061;
        border-radius: 6px;
        /* margin: 0 auto; */
        font-size: 1rem;
        font-family: inherit; 
        resize: vertical; 
        min-height: 80px;
    }
    .btn-submit {
        border: none;
        border-radius: 6px;
        padding: 10px 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        background-color: #007bff;
        color: white;
    }
    .btn-submit:hover {
        background-color: #0056b3;
    }
@media (min-width: 768px) {
  
  .columns {
    grid-template-columns: 2fr 1fr;
    align-items: flex-start; /* Alinha o topo */
  }
  .left-column {
    position: sticky;
    top: 16px;
  }
}
</style>