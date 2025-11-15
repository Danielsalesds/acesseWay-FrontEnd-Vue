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
    </form>

    <div class="actions-fixed">
      <button type="button" class="btn btn-secondary" @click="reset">Limpar</button>
      <button type="submit" class="btn btn-primary" :disabled="load" @click="submit">
        {{ load ? 'Salvando...' : 'Cadastrar' }}
      </button>
    </div>

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
.container{
  max-width:800px;
  margin:1.5rem auto;
  padding:1rem;
  background-color: #18191a;
  border-radius:8px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  overflow-y:auto
}

.form-body{padding-bottom:5rem}
h2{margin:0 0 .75rem;font-weight:600;font-size:1.3rem;text-align:center}
input{width:100%;padding:.6rem;margin-bottom:1rem;border:1px solid #ddd;border-radius:4px;font-size:1rem;box-sizing:border-box}
.row-inline{display:flex;gap:8px;align-items:center}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:.5rem .85rem;border-radius:6px;font-size:.95rem;cursor:pointer;transition:.1s;border:1px solid transparent}
.btn-primary{background:#1976d2;color:#fff;border-color:rgba(0,0,0,.08);box-shadow:0 6px 18px rgba(25,118,210,.08)}
.btn-primary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 24px rgba(25,118,210,.12)}
.btn-secondary{background:#fff;color:#333;border:1px solid #ddd;box-shadow:0 6px 18px rgba(0,0,0,.03)}
.btn-map{padding:.45rem .7rem;border:1px solid #ccc;background:#fff;cursor:pointer}
button:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}

.actions-fixed{
  position:fixed;bottom:0;left:0;right:0;z-index:1000;
  display:flex;justify-content:flex-end;gap:.5rem;
  padding:.75rem 1rem;background:#fff;
  border-top:1px solid #eee;box-shadow:0 -4px 12px rgba(0,0,0,.08)
}

@media(max-width:520px){
  .row-inline{flex-direction:column}
  .actions-fixed{flex-direction:column-reverse;gap:8px}
  .actions-fixed .btn{width:100%}
}
</style>
