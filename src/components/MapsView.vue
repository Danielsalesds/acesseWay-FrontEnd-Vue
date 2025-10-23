<template>
  <div class="map-container">
    <l-map
      v-model:zoom="zoom"
      :center="center"
      style="height: 90vh; width: 100%;"
      @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker.latlng"
      >
        <l-popup>
          <div style="text-align:center;">
            <strong>{{ marker.name || 'Local desconhecido' }}</strong><br />
            <small>{{ marker.latlng.lat.toFixed(5) }}, {{ marker.latlng.lng.toFixed(5) }}</small><br />
            <button
              @click="removeMarker(index)"
              style="color: white; background: red; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; margin-top: 4px;"
            >
              Remover
            </button>
          </div>
        </l-popup>
      </l-marker>
    </l-map>

    <div class="controls">
      <button @click="clearMarkers" class="clear-btn">🗑️ Limpar tudo</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const center = ref([-5.7945, -35.211])
const zoom = ref(13)
const markers = ref([])

const getLocationName = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
    const data = await res.json()
    return data.display_name || 'Local desconhecido'
  } catch {
    return 'Local não encontrado'
  }
}

const addMarker = async (e) => {
  const { lat, lng } = e.latlng
  const name = await getLocationName(lat, lng)

  markers.value.push({
    latlng: e.latlng,
    name,
  })
}

const removeMarker = (index) => {
  markers.value.splice(index, 1)
}

const clearMarkers = () => {
  markers.value = []
}
</script>

<style scoped>
.map-container {
  position: relative;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.clear-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.clear-btn:hover {
  background-color: #d32f2f;
}
</style>
