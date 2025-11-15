<template>
  <!-- <div class="map-container"> -->
    
  <!-- </div> -->
  <div ref="mapEl" class="map"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapEl = ref(null)
const apiResponse = ref(null)
let map = null

const buildingIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
})

onMounted(async () => {
  map = L.map(mapEl.value, {
    center: [-14.2350, -51.9253],
    zoom: 4
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  try {
    const { data } = await axios.get('https://acessway.onrender.com/establishment')
    console.log('Retorno completo da API:', data)
    apiResponse.value = JSON.stringify(data, null, 2) // Mostra na tela formatado

    const establishments = data.content || []
    if (!establishments.length) {
      alert('Nenhum estabelecimento encontrado.')
      return
    }

    const markers = []
    establishments.forEach(e => {
      const lat = parseFloat(e.latitude)
      const lng = parseFloat(e.longitude)
      if (isNaN(lat) || isNaN(lng)) return

      const marker = L.marker([lat, lng], { icon: buildingIcon }).addTo(map)
      marker.bindPopup(`
        <b>${e.name}</b><br>
        ${e.address.street}, ${e.address.number}<br>
        ${e.address.city} - ${e.address.state}<br>
        <small>${e.email || ''}</small>
      `)
      markers.push(marker)
    })

    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds(), { padding: [30, 30] })

  } catch (err) {
    console.error('Erro ao carregar estabelecimentos:', err)
    alert('Erro ao carregar estabelecimentos.')
  }
})

onUnmounted(() => map && map.remove())
</script>

<style scoped>
/* .map-container {
  width: 100%;
  max-width: 1000px;
  margin: 1rem auto;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
} */

.map {
  height: 500px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin: 10px;
}

.api-debug {
  margin-top: 1.5rem;
  background: #1e1e1e;
  color: #00ff88;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.api-debug h3 {
  color: #61dafb;
  margin-bottom: 0.5rem;
}
</style>
