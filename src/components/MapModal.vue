<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Escolha a posição (clique ou arraste o marcador)</h3>
      <div ref="mapEl" class="map"></div>
      <div class="modal-actions">
        <div class="coords">Lat: {{ previewLat }} — Lng: {{ previewLng }}</div>
        <button @click="closeMapModal" class="btn-light">Cancelar</button>
        <button @click="confirmFromMap" class="btn-primary">Confirmar e preencher</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, nextTick, onUnmounted } from 'vue'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

const form = inject('form'), showMapModal = inject('showMapModal')
const mapEl = ref(null), previewLat = ref(''), previewLng = ref('')
let map = null, marker = null

nextTick(() => {
  map = L.map(mapEl.value, { center: [-15.78, -47.93], zoom: 4 })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
  map.on('click', e => {
    if (marker) marker.setLatLng(e.latlng)
    else { marker = L.marker(e.latlng, { draggable: true }).addTo(map); marker.on('dragend', updatePreview) }
    updatePreview()
  })
})

const updatePreview = () => {
  if (!marker) return
  const p = marker.getLatLng()
  previewLat.value = p.lat.toFixed(6)
  previewLng.value = p.lng.toFixed(6)
}
const closeMapModal = () => (showMapModal.value = false)
const estadosMap = { 'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM', 'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES', 'Goiás': 'GO', 'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS', 'Minas Gerais': 'MG', 'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR', 'Pernambuco': 'PE', 'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN', 'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC', 'São Paulo': 'SP', 'Sergipe': 'SE', 'Tocantins': 'TO' }

async function confirmFromMap() {
  if (!marker) return alert('Clique no mapa para posicionar o marcador.')
  const p = marker.getLatLng(); form.latitude = String(p.lat); form.longitude = String(p.lng)
  try {
    const { data } = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: { format: 'jsonv2', lat: p.lat, lon: p.lng, addressdetails: 1 },
      headers: { 'Accept-Language': 'pt-BR' }
    })
    const a = data.address || {}
    form.address.street = a.road || a.pedestrian || a.footway || form.address.street
    form.address.neighborhood = a.suburb || a.neighbourhood || a.quarter || form.address.neighborhood
    form.address.city = a.city || a.town || a.village || form.address.city
    form.address.zipCode = a.postcode || form.address.zipCode
    form.address.state = estadosMap[a.state] || (a.state?.length === 2 ? a.state : form.address.state)
  } catch (e) { console.error('Erro reverse geocoding:', e) }
  closeMapModal()
}

onUnmounted(() => map && map.remove())
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000
}

.modal-content {
  width: 90%;
  max-width: 800px;
  background: #1f2022;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .2)
}

.map {
  height: 420px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 8px
}

.modal-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap
}

.coords {
  font-size: .9rem;
  color: white;
  margin-right: auto
}

.btn-light,
.btn-primary {
  padding: .5rem .75rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: .15s
}

.btn-light {
  background: #f5f5f5;
  color: #333
}

.btn-light:hover {
  background: #e0e0e0
}

.btn-primary {
  background: #1976d2;
  color: #fff
}

.btn-primary:hover {
  background: #0f5cb8
}
</style>
