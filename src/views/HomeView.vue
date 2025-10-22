<template>
  <div class="layout-home">
    <!-- Passa função toggleMap para o Header -->
    <TheHeader @toggle-map="toggleMap" />
    <main class="content">
      <LeftSidebar />
      
      <!-- Mostra feed ou mapa -->
      <component :is="showMap ? 'MapsView' : 'TheFeed'" />

      <RightSidebar />
    </main>
  </div>
</template>

<script>
import LeftSidebar from '../components/LeftSidebar.vue'
import TheFeed from '../components/TheFeed.vue'
import RightSidebar from '../components/RightSidebar.vue'
import TheHeader from '../components/TheHeader.vue'
import MapsView from '../components/MapsView.vue'

export default {
  components: {
    LeftSidebar,
    TheFeed,
    RightSidebar,
    TheHeader,
    MapsView
  },
  data() {
    return {
      showMap: false
    }
  },
  methods: {
    toggleMap() {
      this.showMap = !this.showMap
    }
  },
 
}
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* evita que a página role */
}
.layout-home {
  background-color: #18191a;
  color: #e4e6eb;
  height: 100vh;
  overflow: hidden; /* evita scroll global */
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 20px;
  padding-top: 60px; /* altura do header fixo */
  height: calc(100vh - 60px); /* altura restante */
}

/* As 3 colunas com scroll próprio */
.content > * {
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: #3a3b3c #18191a;
}

/* Responsividade */
@media (max-width: 1100px) {
  .content {
    grid-template-columns: 80px 1fr;
  }
}

@media (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
