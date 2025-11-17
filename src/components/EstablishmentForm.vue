<template>
  <div class="container">
    <h2>Cadastro de Estabelecimento</h2>

    <form @submit.prevent="submit" class="form-body">
      <input v-model="form.name" placeholder="Nome *" required minlength="3" />
      <input v-model="form.cnpj" placeholder="CNPJ *" required />
      <input v-model="form.email" type="email" placeholder="Email *" required />
      <input v-model="form.phone" placeholder="Telefone *" required />

      <AddressSelector />

      <div class="row-inline">
        <input v-model="form.address.number" placeholder="Número *" required />
        <button type="button" class="btn btn-map" @click="openMapModal">Abrir mapa</button>
      </div>

      <input v-model="form.address.zipCode" placeholder="CEP" readonly />
      <input v-model="form.imageUrl" type="url" placeholder="URL da Imagem" />
      
      <button type="button" class="btn btn-secondary" @click="reset">Limpar</button>
      <button type="submit" class="btn btn-primary" :disabled="load" @click="submit">
        {{ load ? 'Salvando...' : 'Cadastrar' }}
      </button>
    
    </form>

   

    <MapModal v-if="showMapModal" />
  </div>
</template>

<script setup>
import { reactive, ref, provide } from 'vue'
import axios from 'axios'
import AddressSelector from './AddressSelector.vue'
import MapModal from './MapModal.vue'

const form = reactive({
  name: '', cnpj: '', email: '', phone: '', latitude: '', longitude: '', imageUrl: '',
  address: { number: '', street: '', city: '', state: '', zipCode: '', neighborhood: '' }
})
const load = ref(false), showMapModal = ref(false)
provide('form', form); provide('showMapModal', showMapModal)

const openMapModal = () => (showMapModal.value = true)
const reset = () => Object.assign(form, {
  name: '', cnpj: '', email: '', phone: '', latitude: '', longitude: '', imageUrl: '',
  address: { number: '', street: '', city: '', state: '', zipCode: '', neighborhood: '' }
})

async function submit() {
  load.value = true
  if (!form.latitude || !form.longitude) { alert('Informe a localização ou use o botão "Abrir mapa".'); load.value = false; return }
  try {
    const response = await axios.post('https://acessway.onrender.com/establishment-request', {
      ...form,
      cnpj: form.cnpj.replace(/\D/g, ''),
      phone: form.phone.replace(/\D/g, ''),
      address: { ...form.address, zipCode: (form.address.zipCode || '').replace(/\D/g, '') }
    })
    console.log('Resposta da API:', response.data)
    alert('Cadastrado com sucesso!'); reset()

  } catch (e) { alert('Erro: ' + (e.response?.data?.message || e.message)) }
  finally { load.value = false }
}
</script>
<style>
  body{
    background-color: #18191a;
  }
</style>
<style scoped>
/* CONTAINER PRINCIPAL */
.container {
  max-width: 750px;
  margin: 1.5rem auto;
  padding: 2rem;
  background: #1f2022;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(0,0,0,0.25);
  color: #e4e6eb;
  font-family: "Inter", sans-serif;
}

/* TÍTULO */
h2 {
  text-align: center;
  font-weight: 600;
  margin-bottom: 1.6rem;
  font-size: 1.6rem;
  color: #ffffff;
}

/* INPUTS */
input {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background: #2a2b2e;
  border: 1px solid #3a3b3c;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: 0.15s;
  outline: none;
}

input::placeholder {
  color: #999;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,.25);
}

/* LINHA INLINE */
.row-inline {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* BOTÕES */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: 0.18s ease-in-out;
  font-weight: 500;
  margin-right: 10px;
}

/* BOTÃO PRINCIPAL (tipo PrimeVue Primary) */
.btn-primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 15px rgba(59,130,246,0.3);
}
.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 6px 18px rgba(59,130,246,0.45);
  transform: translateY(-1px);
}

/* BOTÃO SECUNDÁRIO */
.btn-secondary {
  background: #3a3b3c;
  color: #e4e6eb;
}
.btn-secondary:hover {
  background: #4b4c4e;
}

/* BOTÃO MAPA */
.btn-map {
  background: #2a2b2e;
  border: 1px solid #3b82f6;
  color: #3b82f6;
}
.btn-map:hover {
  background: rgba(59,130,246,0.12);
}

/* DISABLED */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* RESPONSIVIDADE */
@media (max-width: 520px) {
  .row-inline {
    flex-direction: column;
    gap: 0;
  }
  .btn {
    width: 100%;
  }
}

</style>
