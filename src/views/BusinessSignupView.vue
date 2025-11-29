<template>
    <div class="business-signup-container">
        <div class="wizard-card">
            <h2>Parceiro AcessWay</h2>

            <Stepper v-model:value="activeStep" class="stepper-custom">
                <StepList>
                    <Step value="1">Seus Dados</Step>
                    <Step value="2">A Empresa</Step>
                    <Step value="3">Localização</Step>
                </StepList>

                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1" style="background-color: #242424 !important;">
                        <div class="step-body">
                            <h3>Quem é o responsável?</h3>
                            <div class="form-grid">
                                <FloatLabel class="input-wrapper">
                                    <InputText id="firstName" v-model="accountForm.firstName" class="input-text" />
                                    <label for="firstName">Nome</label>
                                </FloatLabel>
                                <FloatLabel class="input-wrapper">
                                    <InputText id="lastName" v-model="accountForm.lastName" class="input-text" />
                                    <label for="lastName">Sobrenome</label>
                                </FloatLabel>
                                <FloatLabel class="input-wrapper">
                                    <InputText id="email" v-model="accountForm.email" class="input-text" />
                                    <label for="email">Email de Acesso</label>
                                </FloatLabel>
                                <FloatLabel class="input-wrapper">
                                    <InputText id="pass" type="password" v-model="accountForm.password"
                                        class="input-text" />
                                    <label for="pass">Senha</label>
                                </FloatLabel>
                            </div>
                        </div>
                        <div class="step-actions between">
                            <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                @click="router.push({ name: 'login' })" />
                            <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" class="btn"
                                @click="activateCallback('2')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="2" style="background-color: #242424 !important;">
                        <div class="step-body">
                            <h3>Sobre o Local</h3>
                            <div class="form-grid">

                                <FloatLabel class="mt-4">
                                    <InputText id="companyName" v-model="form.name" class="input-text" />
                                    <label for="companyName">Nome do Estabelecimento</label>
                                </FloatLabel>
                                <FloatLabel class="input-wrapper">
                                    <InputText id="email-e" v-model="form.email" class="input-text" />
                                    <label for="email-e">Email da empresa</label>
                                </FloatLabel>

                                <div style="display: flex; justify-content: center; gap: 10px;">
                                    <FloatLabel style="width: 100%">
                                        <InputMask id="cnpj" v-model="form.cnpj" mask="99.999.999/9999-99"
                                            class="input-text" />
                                        <label for="cnpj">CNPJ</label>
                                    </FloatLabel>
                                    <FloatLabel style="width: 100%">
                                        <InputMask id="phone" v-model="form.phone" mask="(99) 99999-9999"
                                            class="input-text" />
                                        <label for="phone">Telefone</label>
                                    </FloatLabel>
                                </div>
                            </div>
                        </div>
                        <div class="step-actions between">
                            <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('1')" />
                            <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right"
                                @click="activateCallback('3')" class="btn" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="3" style="background-color: #242424 !important;">
                        <div class="step-body">
                            <h3>Onde Fica?</h3>
                            <div class="map-container-wrapper">
                                <div id="map-step" class="mini-map"></div>
                                <p>
                                    Arraste o pino para a localização exata.
                                </p>
                            </div>
                            <div class="form-grid">
                                <div style="display: flex;gap: 5px; align-items: center; width: 100%;">
                                    <!-- <FloatLabel style="flex: 1;">
                                        <InputMask id="cep" v-model="form.address.cep" mask="99999-999"
                                            @blur="buscarCep" style="width: 100%;" />
                                        <label for="cep">CEP (Preenchimento automático)</label>
                                    </FloatLabel>
                                    <Button icon="pi pi-search" @click="buscarCep" :loading="loadingCep" /> -->

                                    <InputGroup>
                                        <FloatLabel style="flex: 1;">
                                            <InputMask id="cep" v-model="form.address.zipCode" mask="99999-999"
                                                @blur="buscarCep" style="width: 100%;" />
                                            <label for="cep">CEP (Preenchimento automático)</label>
                                        </FloatLabel>
                                        <Button icon="pi pi-search" @click="buscarCep" :loading="loadingCep"
                                            class="btn" />
                                    </InputGroup>
                                </div>

                                <div class="form-grid">
                                    <div style="display: flex;gap: 5px; align-items: center; width: 100%;">
                                        <FloatLabel style="flex: 1;">
                                            <InputText id="city" v-model="form.address.city" class="input-text" />
                                            <label for="city">Cidade</label>
                                        </FloatLabel>
                                        <FloatLabel style="width: 8rem;">
                                            <InputText id="state" v-model="form.address.state" class="input-text" />
                                            <label for="state">Estado</label>
                                        </FloatLabel>
                                    </div>
                                    <FloatLabel>
                                        <InputText id="rua" v-model="form.address.street" class="input-text" />
                                        <label for="rua">Rua</label>
                                    </FloatLabel>
                                    <div style="display: flex;gap: 5px; align-items: center; width: 100%;">
                                        <FloatLabel style="width: 5rem;">
                                            <InputText id="num" v-model="form.address.number" class="input-text" />
                                            <label for="num">Nº</label>
                                        </FloatLabel>
                                        <FloatLabel style="flex: 1;">
                                            <InputText id="bairro" v-model="form.address.neighborhood"
                                                class="input-text" />
                                            <label for="bairro">Bairro</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="step-actions between">
                            <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('2')" />
                            <Button label="Concluir" icon="pi pi-check" iconPos="right" @click="submit" class="btn" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
    <div v-if="loading" class="loader-overlay">
        <ProgressSpinner aria-label="Loading" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'
import axios from 'axios';
import InputGroup from 'primevue/inputgroup';
import { useStore } from '@/stores/signupStore'
import { watch, nextTick, toRaw } from 'vue';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import { ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const loading = ref(false)
const store = useStore();
const activeStep = ref('1');
const mapInstance = ref(null);
const markerInstance = ref(null);
const router = useRouter();
const loadingCep = ref(false);
const accountForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'COMPANY',
    gender: 'OTHER',
    birthDate: { day: 1, month: 1, year: 2000 },
    imageUrl: ''
});
const form = ref({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
    address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        neighborhood: ''
    }
})
const initMap = () => {
    if (mapInstance.value) return;

    const initialLat = -14.2350;
    const initialLng = -51.9253;

    mapInstance.value = L.map('map-step').setView([initialLat, initialLng], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(mapInstance.value);

    const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    markerInstance.value = L.marker([initialLat, initialLng], { draggable: true, icon: icon })
        .addTo(mapInstance.value);

    markerInstance.value.on('dragend', (event) => {
        const position = event.target.getLatLng();
        form.value.address.latitude = position.lat.toFixed(6);
        form.value.address.longitude = position.lng.toFixed(6);
    });
};
const buscarCep = async () => {
    const cep = form.value.address.zipCode.replace(/\D/g, '');
    if (cep.length !== 8) return;

    loadingCep.value = true;
    try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!data.erro) {
            form.value.address.street = data.logradouro;
            form.value.address.neighborhood = data.bairro;
            form.value.address.city = data.localidade;
            form.value.address.state = data.uf;
            const query = `${data.logradouro}, ${data.bairro}, ${data.localidade}, Brasil`;
            await geocodeAddress(query);
        }
    } catch (e) {
        alert('Erro ao buscar CEP');
    } finally {
        loadingCep.value = false;
    }
};

const geocodeAddress = async (queryAddress) => {
    try {
        // API Gratuita do OpenStreetMap (Nominatim)
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryAddress)}`;
        console.log(url)
        const { data } = await axios.get(url);

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            // Atualiza o formulário
            form.value.latitude = lat;
            form.value.longitude = lon;
            console.log(form.value)
            // Atualiza o Mapa
            if (mapInstance.value && markerInstance.value) {
                const newLatLng = new L.LatLng(lat, lon);
                markerInstance.value.setLatLng(newLatLng);
                mapInstance.value.setView(newLatLng, 16); // Zoom perto
            }
        }
    } catch (error) {
        console.log("Não foi possível encontrar as coordenadas automaticamente.");
    }
}
async function submit() {
    loading.value = true
    try {
        const formattedDate = `${accountForm.value.birthDate.year}-${String(accountForm.value.birthDate.month).padStart(2, '0')}-${String(accountForm.value.birthDate.day).padStart(2, '0')}`;
        const userData = {
            ...accountForm.value,
            birthDate: formattedDate
        };
        await store.createProfile(userData);
        await createRequest();

        alert('Cadastro realizado com sucesso! Aguarde a aprovação.');
    } catch (e) {
        console.log(e.error)
    } finally {
        loading.value = false
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 1500);
    }
}
async function createRequest() {
    const requestPayload = toRaw(form.value);
    const response = await axios.post('https://acessway.onrender.com/establishment-request', requestPayload);
    console.log('Solicitação criada:', response.data);
    return response.data;
}
watch(activeStep, (newStep) => {
    if (newStep === '3') {
        nextTick(() => {
            initMap();
            setTimeout(() => {
                if (mapInstance.value) {
                    mapInstance.value.invalidateSize();
                }
            }, 1000);
        });
    }
});
</script>

<style scoped>
.mini-map {
    height: 350px !important;
    width: 100%;
    border-radius: 8px;
    border: 2px solid #3E4042;
    z-index: 1;
    margin-bottom: 1rem;
}

.map-container-wrapper {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

/* --- Layout Geral --- */
.business-signup-container {
    background-color: #18191a;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.wizard-card {
    background-color: #242424;
    border: 1px solid #333;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

h2 {
    text-align: center;
    color: #e4e6eb;
    margin-bottom: 2rem;
    font-weight: 700;
}

.step-body {
    display: flex;
    flex-direction: column;
    min-height: 12rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.form-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-wrapper {
    width: 100%;
}

.input-text {
    width: 100%;
}

.placeholder-box {
    border: 2px dashed #3E4042;
    background-color: #1e1e1e;
    border-radius: 8px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b0b3b8;
    font-weight: 500;
    min-height: 150px;
}

.step-actions {
    display: flex;
    padding-top: 1.5rem;
    margin-top: auto;
}

.step-actions.right {
    justify-content: flex-end;
}

.step-actions.between {
    justify-content: space-between;
}

.step-actions.left {
    justify-content: flex-start;
}

.btn {
    color: white;
    background-color: #0d47a1;
    font-weight: bold;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
    transition: background-color 0.2s;
}

.btn:hover {
    background-color: #adc3e6;
}

/* Inputs */
:deep(.p-inputtext) {
    background-color: #18191a;
    border: 1px solid #3E4042;
    color: #e4e6eb;
    padding: 1rem;
    border-radius: 8px;
}

:deep(.p-inputtext:focus) {
    border-color: #0d47a1;
    box-shadow: 0 0 0 1px #0d47a1;
}

:deep(.p-float-label label) {
    color: #b0b3b8;
    margin-top: -0.5rem;
}

/* Stepper - Títulos e Números */
:deep(.p-stepper-title) {
    color: #b0b3b8;
    font-weight: 500;
}

:deep(.p-stepper-number) {
    background-color: #18191a;
    border: 2px solid #3E4042;
    color: #b0b3b8;
    font-size: 1.1rem;
}

/* Stepper Ativo */
:deep(.p-stepper-step.p-highlight .p-stepper-number) {
    background-color: #0d47a1;
    border-color: #0d47a1;
    color: #ffffff;
    box-shadow: 0 0 15px rgba(13, 71, 161, 0.4);
}

:deep(.p-stepper-step.p-highlight .p-stepper-title) {
    color: #e4e6eb;
    font-weight: 700;
}

:deep(.p-stepper-separator) {
    background-color: #3E4042;
}

/* Botões */
:deep(.p-button) {
    background-color: #0d47a1;
    border: none;
    font-weight: 600;
}

:deep(.p-button-secondary) {
    background-color: transparent;
    border: 1px solid #3E4042;
    color: #e4e6eb;
}

:deep(.p-button-secondary:hover) {
    background-color: rgba(255, 255, 255, 0.05);
}

/* Responsividade */
@media (max-width: 640px) {
    .wizard-card {
        padding: 1.5rem;
    }

    :deep(.p-stepper-title) {
        display: none;
        /* Esconde texto do passo no celular */
    }
}

.loader-overlay {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>