<template>
  <!-- <div class="map-container"> -->

  <!-- </div> -->
  <div ref="mapEl" class="map"></div>
  <Dialog v-model:visible="dialogVisible" modal :style="{ width: '25rem' }">

    <div class="main-info">
      <img v-if="selected.imageUrl != ''" :src="selected.imageUrl" alt="" width="30%">
      <img v-else src="https://placehold.net/default.png"
                                    alt="Estabelecimento sem imagem definida" width="75px" height="75px">
      <h3>{{ selected.name }}</h3>
    </div>
    <p>
      <i class="fa-brands fa-accessible-icon" style="color: #0d47a1"></i>
      Acessibilidade <strong>08/10</strong>
    </p>
    <router-link :to="{ name: 'establishmentDetails', params: { id: selected.id } }">
      Ver detalhes
    </router-link>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useEstablishmentStore } from '@/stores/establishmentStore';
import Dialog from 'primevue/dialog';
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
const dialogVisible = ref(false)
const mapEl = ref(null)
const selected = ref(Object)
const apiResponse = ref(null)
let map = null
const store = useEstablishmentStore();

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
  await store.getEstablishment()
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
      // marker.bindPopup(`
      //   <b>${e.name}</b><br>
      //   ${e.address.street}, ${e.address.number}<br>
      //   ${e.address.city} - ${e.address.state}<br>
      //   <small>${e.email || ''}</small>
      // `)
      marker.on("click", () => {
        console.log("E: " + e.name);
        selected.value = e;
        console.log(selected.value);
        dialogVisible.value = true;
      });
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

watch(()=>store.focusedEstablishmentId,
  (newId)=>{
  if (!newId || map) {
      return;
  }
  const establishment = store.establishments.find(e => e.id === newId);
  console.log("Establishment map: "+establishment)
  if (establishment) {
      const latLng = [establishment.latitude, establishment.longitude];
      console.log("Setando latLng: ")
      map.setView(latLng, 16, {
        animate: true,
        pan: {
          duration: 0.5
        }
      });
  }
})
</script>

<style scoped>
img {
  border-radius: 10px;
}

.main-info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.map {
  height: 100%;
  width: 100%;
  margin: 0;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
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
