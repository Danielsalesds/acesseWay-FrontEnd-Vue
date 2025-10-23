<template>
  <div>
    <div class="ac">
      <input v-model="stateInput" @input="onStateInput" placeholder="Estado (UF) *" required />
      <div v-if="lists.state.length" class="list">
        <div v-for="s in lists.state" :key="s.id" @click="selState(s)">{{ s.nome }} ({{ s.sigla }})</div>
      </div>
    </div>

    <div class="ac">
      <input v-model="cityInput" @input="onCityInput" placeholder="Cidade *" :disabled="!form.address.state" required />
      <div v-if="lists.city.length" class="list">
        <div v-for="c in lists.city" :key="c.id" @click="selCity(c)">{{ c.nome }}</div>
      </div>
    </div>

    <div class="ac">
      <input v-model="neighborhoodInput" @input="onNeighborhoodInput" placeholder="Bairro" :disabled="!form.address.city" />
      <div v-if="lists.neighborhood.length" class="list">
        <div v-for="n in lists.neighborhood" :key="n" @click="selNeighborhood(n)">{{ n }}</div>
      </div>
    </div>

    <div class="ac">
      <input v-model="streetInput" @input="onStreetInput" placeholder="Rua *" :disabled="!form.address.city" required />
      <div v-if="lists.street.length" class="list">
        <div v-for="s in lists.street" :key="s" @click="selStreet(s)">{{ s }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, reactive, watch } from 'vue'
import axios from 'axios'

const form = inject('form')

const stateInput = ref('')
const cityInput = ref('')
const neighborhoodInput = ref('')
const streetInput = ref('')

const lists = reactive({ state: [], city: [], neighborhood: [], street: [] })
const ibgeStates = ref([])
const ibgeCitiesByState = ref({})

;(async () => {
  try {
    const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    ibgeStates.value = data
  } catch (e) { console.error(e) }
})()

watch(() => form.address.state, v => (stateInput.value = v || ''), { immediate: true })
watch(() => form.address.city, v => (cityInput.value = v || ''), { immediate: true })
watch(() => form.address.neighborhood, v => (neighborhoodInput.value = v || ''), { immediate: true })
watch(() => form.address.street, v => (streetInput.value = v || ''), { immediate: true })

function onStateInput() {
  const q = stateInput.value.trim().toLowerCase()
  lists.state = !q ? ibgeStates.value.slice() : ibgeStates.value.filter(s =>
    s.nome.toLowerCase().startsWith(q) || s.sigla.toLowerCase().startsWith(q)
  )
}

async function selState(st) {
  form.address.state = st.sigla
  stateInput.value = st.sigla
  form.address.city = ''
  lists.state = []
  if (!ibgeCitiesByState.value[st.sigla]) {
    try {
      const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${st.id}/municipios`)
      ibgeCitiesByState.value[st.sigla] = data
    } catch (e) { ibgeCitiesByState.value[st.sigla] = []; console.error(e) }
  }
}

function onCityInput() {
  const cities = ibgeCitiesByState.value[form.address.state] || []
  const q = cityInput.value.trim().toLowerCase()
  lists.city = !q ? cities.slice(0, 50) : cities.filter(c => c.nome.toLowerCase().startsWith(q))
}

function selCity(c) {
  form.address.city = c.nome
  cityInput.value = c.nome
  lists.city = []
}

let t1 = 0, t2 = 0
function debounce(cb, ms, tokenRef) {
  clearTimeout(tokenRef.value)
  tokenRef.value = setTimeout(cb, ms)
}

async function onNeighborhoodInput() {
  lists.neighborhood = []
  const q = neighborhoodInput.value.trim()
  if (q.length < 3 || !form.address.city) return
  debounce(async () => {
    try {
      const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: `${q}, ${form.address.city}, ${form.address.state || ''}, Brasil`, format: 'jsonv2', addressdetails: 1, limit: 7 },
        headers: { 'Accept-Language': 'pt-BR' }
      })
      lists.neighborhood = [...new Set(data.map(d => d.address?.suburb || d.address?.neighbourhood || d.address?.quarter).filter(Boolean))]
    } catch (e) { console.error(e); lists.neighborhood = [] }
  }, 260, { value: t1 })
}

async function onStreetInput() {
  lists.street = []
  const q = streetInput.value.trim()
  if (q.length < 3 || !form.address.city) return
  debounce(async () => {
    try {
      const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: `${q}, ${form.address.city}, ${form.address.state || ''}, Brasil`, format: 'jsonv2', addressdetails: 1, limit: 7 },
        headers: { 'Accept-Language': 'pt-BR' }
      })
      lists.street = [...new Set(data.map(d => d.address?.road || d.address?.pedestrian || d.address?.footway).filter(Boolean))]
    } catch (e) { console.error(e); lists.street = [] }
  }, 260, { value: t2 })
}

function selNeighborhood(n) { form.address.neighborhood = n; neighborhoodInput.value = n; lists.neighborhood = [] }
function selStreet(s) { form.address.street = s; streetInput.value = s; lists.street = [] }
</script>

<style scoped>
/* matched to global form styles */
input {
  width: 100%;
  padding: .6rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}
.ac { position: relative; }
.list {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.list div {
  padding: .6rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}
.list div:hover { background: #f5f5f5; }
</style>
