<template>
    <TheHeader />
    <div v-if="establishment" class="main">
        <img v-if="establishment.imageUrl != ''" :src="establishment.imageUrl" alt="Imagem do estabelecimento"
            class="banner-imagem">
        <img v-else src="https://placehold.net/default.png" alt="Estabelecimento sem imagem definida">
        <div class="header-hero">
            <h1>{{ establishment.name }}</h1>
            <div class="info-review">
                <StarRating :rating="establishment.averageRating * 5"
                    :style="{ color: getColor(establishment.averageRating) }"></StarRating>
                <p>({{ reviews.length }} avaliações)</p>
            </div>
            <p style="margin-top: 0px; font-weight: bold;">
                Nível de acessibilidade: {{ toPercent(establishment.averageRating) }}%
            </p>

        </div>
        <div class="columns">
            <main class="main-column">
                <h2>Avaliações</h2>
                <Button label="Deixe sua avaliação" @click="reviewOpen = !reviewOpen" class="btn-toggle-review" />
                <Dialog v-model:visible="reviewOpen" modal header="Avaliação" :style="{ width: '50rem' }">
                    <template #header>
                        <div class="card-form-header">
                            <Avatar v-if="userStore.user.imageUrl" :image="userStore.user.imageUrl" class="mr-2"
                                size="xlarge" shape="circle" ariaLabel="Avatar do usuário" />
                            <Avatar v-else icon="pi pi-user" size="xlarge" shape="circle" ariaLabel="Avatar do usuário"
                                style="background-color: #ece9fc; color: #2a1261" />
                            <p><strong>{{ userStore.user.firstName }}</strong> (Sua avaliação)</p>
                        </div>
                    </template>
                    <h3>{{ establishment.name }}</h3>
                    <p class="subtitle">Ajude a comunidade respondendo sobre a acessibilidade deste local.</p>
                    <Accordion value="0">
                        <AccordionPanel v-for="q in acessibilityQuestions" :key="q.questionKey" :value="q.questionKey">
                            <AccordionHeader>{{ editQuestionKey(q.questionKey) }}</AccordionHeader>
                            <AccordionContent>
                                <p>{{ q.question }}</p>
                                <SelectButton v-model="q.answer" :options="answerOptions" optionLabel="label"
                                    optionValue="value" />
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>

                    <IftaLabel style="margin-top: 20px;">
                        <Textarea id="comment" v-model="reviewComment" rows="5" cols="30" autoResize fluid />
                        <label for="comment">Comentários</label>
                    </IftaLabel>

                    <template #footer>
                        <Button label="Enviar" @click="createReview" severity="success" style="color: white;" />
                        <Button label="Cancelar" @click="reviewOpen = false" severity="danger" style="color: white;" />
                    </template>
                </Dialog>

                <li v-for="r in reviews" :key="r.id">
                    <div class="card">
                        <div class="card-header">
                            <Avatar v-if="r.userImageUrl" :image="r.userImageUrl" size="large" shape="circle"
                                :ariaLabel="getAriaLabelAvatar(r.firstName)" />
                            <Avatar v-else icon="pi pi-user" shape="circle" ariaLabel="Avatar do usuário" size="large"
                                style="background-color: #ece9fc; color: #2a1261" />
                            <span style="font-weight: bold;">{{ r.firstName }} {{ r.lastName }}</span>
                            <div class="comment-date">
                                <small>{{ formatDate(r.createdAt) }}</small>
                            </div>
                            <span :style="{ color: getColor(r.rating), }" class="percent-comment">{{ r.rating * 100 }}
                                %</span>
                        </div>
                        <Panel v-if="r.comment" class="review-panel" style="margin-top: 10px;">
                            <p class="comment-text">{{ r.comment }}</p>
                        </Panel>
                        <Button v-if="reviewExpanded & selectedReview===r.id " icon="pi pi-chevron-up" iconPos="right" label="Ocultar detalhes"
                            style="margin-left: auto;" class="btn-toggle-review"
                            @click="reviewExpanded = false, selectedReview = ''"  />
                        <Button v-else icon="pi pi-chevron-down" iconPos="right" label="Ver detalhes"
                            style="margin-left: auto;" class="btn-toggle-review"
                            @click="reviewExpanded = !reviewExpanded;selectedReview = r.id" />

                        <div v-if="reviewExpanded & r.id === selectedReview" class="tags-container">
                            <div v-for="q in r.questions" :key="q.questionKey" class="review-details">
                                <Tag v-if="q.answer === 'YES'" icon="pi pi-check" severity="success"
                                    :value="editQuestionKey(q.questionKey)" class="custom-tag" />
                                <Tag v-else-if="q.answer === 'PARTIALLY'" icon="pi pi-exclamation-triangle"
                                    severity="warn" :value="editQuestionKey(q.questionKey)" class="custom-tag" />
                                <Tag v-else icon="pi pi-times" severity="danger" :value="editQuestionKey(q.questionKey)"
                                    class="custom-tag" />
                            </div>
                        </div>
                    </div>
                </li>
            </main>

            <aside class="left-column">
                <h3>Informações</h3>
                <div class="info-section">
                    <h4>Contato</h4>
                    <div class="info-item">
                        <i class="pi pi-envelope icon-style" aria-hidden="true"></i>
                        <span>
                            <strong>Email: </strong>
                            <a href="mailto:{{establishment.email}}" class="link-acessivel">
                                {{ establishment.email }}
                            </a>
                        </span>
                    </div>
                    <div class="info-item">
                        <i class="pi pi-phone icon-style" aria-hidden="true"></i>
                        <span>
                            <strong>Telefone: </strong>
                            <a href="tel:{{ establishment.phone }}" class="link-acessivel">
                                {{ establishment.phone }}
                            </a>
                        </span>
                    </div>
                </div>

                <Divider />

                <div class="info-section">
                    <h4>Endereço</h4>

                    <address style="font-style: normal;">
                        <p class="m-0">{{ establishment.address.street }}, {{ establishment.address.number }}</p>
                        <p class="m-0">{{ establishment.address.neighborhood }}</p>
                        <p class="m-0 mb-2">{{ establishment.address.city }} - {{ establishment.address.state }}</p>
                    </address>
                </div>
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
import { defineProps, onMounted, ref} from 'vue'
import StarRating from './StarRating.vue';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Avatar from 'primevue/avatar';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';
import Divider from 'primevue/divider';
import Textarea from 'primevue/textarea';
import IftaLabel from 'primevue/iftalabel';
import Dialog from 'primevue/dialog';



const store = useEstablishmentStore();
const selectedReview = ref("")
const userStore = useAuthStore();
const reviewExpanded = ref(false);
const reviewOpen = ref(false);
const reviewComment = ref("");
const getAriaLabelAvatar = (firstName) => {
    return `Foto de ${firstName}`;
}
const getColor = (averageRating) => {
    if (averageRating >= 0.8) return '#22C55E';
    if (averageRating >= 0.5) return '#EAB308';
    return '#EF4444';
}
function formatDate(date) {
    return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
const editQuestionKey = (qk) => {
    const index = qk.indexOf('_');
    const type = qk.substr(index + 1);
    const text = type[0] + type.substr(1).toLowerCase();
    return text;
}
const answerOptions = ref([
    { label: 'Sim', value: 'YES' },
    { label: 'Parcialmente', value: 'PARTIALLY' },
    { label: 'Não', value: 'NO' }
]);
const acessibilityQuestions = ref([
    {
        question: "A entrada principal é acessível (em nível ou com rampa adequada)?",
        questionKey: "Q1_ENTRADA",
        answer: null
    },
    {
        question: "Existem vagas de estacionamento reservadas, próximas e adequadas?",
        questionKey: "Q2_VAGAS",
        answer: null
    },
    {
        question: "As portas (entrada e principais) são suficientemente largas?",
        questionKey: "Q3_PORTAS",
        answer: null
    },
    {
        question: "Os corredores permitem a manobra fácil de uma cadeira de rodas?",
        questionKey: "Q4_CIRCULACAO",
        answer: null
    },
    {
        question: "O local possui elevadores ou plataformas acessíveis para todos os pisos?",
        questionKey: "Q5_PISOS",
        answer: null
    },
    {
        question: "Existe um banheiro acessível, desbloqueado e devidamente equipado?",
        questionKey: "Q6_BANHEIRO",
        answer: null
    },
    {
        question: "A sinalização interna (banheiros, saídas) é clara e de fácil leitura?",
        questionKey: "Q7_SINALIZACAO",
        answer: null
    },
    {
        question: "Os balcões de atendimento ou caixas de pagamento têm uma seção rebaixada?",
        questionKey: "Q8_BALCOES",
        answer: null
    },
    {
        question: "Os funcionários parecem preparados para auxiliar pessoas com deficiência?",
        questionKey: "Q9_ATENDIMENTO",
        answer: null
    },
    {
        question: "O local oferece cardápios acessíveis ou outras formas de comunicação?",
        questionKey: "Q10_COMUNICACAO",
        answer: null
    }

]);
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const newReview = {
    userId: null,
    comment: "",
    imageUrl: "",
    questions: []
}
const establishment = ref(null)
const reviews = ref(Array)
// const mediaFormatada = computed(() => {
//     if (establishment.value?.averageRating) {
//         return establishment.value.averageRating.toFixed(1);
//     }
//     return '...';
// });
const toPercent = (averageRating) => {
    return averageRating * 100;
}
onMounted(async () => {
    console.log(props.id)
    establishment.value = await store.getEstablishmentById(props.id);
    console.log(establishment.value)
    reviews.value = await store.getReview(props.id)
    console.log(reviews)
});
function createReview() {
    newReview.comment = reviewComment.value;
    newReview.userId = userStore.user.id;
    newReview.questions = acessibilityQuestions.value

    store.sendReview(establishment.value.id, newReview);

    reviewComment.value = "";
    reviewOpen.value = false;
    store.getEstablishmentById(props.id);
}

</script>
<style>
:root {
    --column-color: #242526;
    --card-color: #3A3B3C;
}

body {
    background-color: #18191a;
    color: #e4e6eb;
}
</style>

<style scoped>
.percent-comment {
    font-weight: bold;
    margin-left: auto;
}
.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;             
    margin-top: 1rem;
}
 .custom-tag {
    background: transparent !important;
    border: 1px solid currentColor; 
}
.p-tag-success.custom-tag { color: #4ade80 !important; }
.p-tag-danger.custom-tag  { color: #f87171 !important; }
.p-tag-warn.custom-tag    { color: #facc15 !important; }

.review-panel {
    background: var(--card-color);
    border-radius: 12px;
    margin-bottom: 16px;
    border: none;
}

.review-panel :deep(.p-panel-header) {
    background: transparent;
    border: none;
    padding-bottom: 0;
}

.review-panel :deep(.p-panel-content) {
    background: transparent;
    border: none;
    padding-top: 0.5rem;
}

.comment-text {
    color: #e4e6eb;
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
    text-align: start;
    background-color: transparent;
    padding: 0;
}

.comment-text:empty {
    display: none;
}

.main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    color: #e4e6eb;
}

h4 {
    margin-bottom: 0px;
}

.info-section {
    align-items: center;
}

.info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
}

.link-acessivel {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.2s;
}

.link-acessivel:hover {
    text-decoration: underline;
    color: #ff9999;
}

.icon-style {
    color: #ff4d4d;
    margin-right: 10px;
    font-size: 1.2rem;
}

.header-hero h1 {
    margin-bottom: 0px;
}

.info-review {
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

.image-card {
    border-radius: 10px;
    padding: 5px;
}

.main-column,
.left-column {
    background-color: var(--column-color);
    border-radius: 8px;
    padding: 16px;
}

.columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    /* Espaço entre as colunas no mobile */
}

li {
    list-style-type: none;
    padding-top: 10px;
}

.card {
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
    color: #e4e6eb;
    /* Cor do seu texto principal */
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

.card-form {
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
        align-items: flex-start;
        /* Alinha o topo */
    }

    .left-column {
        position: sticky;
        top: 16px;
    }
}
</style>