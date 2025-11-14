<template>
  <div class="layout-home">
    <!-- Passa função toggleMap para o Header -->
    <TheHeader @show-map="showMap" @show-home="showFeed"  @toggle-map="setView('map')"/>
    <main class="content">
      <LeftSidebar @change-view="setView" />
      
      <!-- Mostra feed ou mapa -->
      <component :is="currentView" ref="feedRef" />

      <!-- <RightSidebar /> -->
    </main>
  </div>
</template>

<script>
import LeftSidebar from '../components/LeftSidebar.vue'
import TheFeed from '../components/TheFeed.vue'
import RightSidebar from '../components/RightSidebar.vue'
import TheHeader from '../components/TheHeader.vue'
import EstablishmentForm from '../components/EstablishmentForm.vue'
import EstablishmentMap from '../components/EstablishmentMap.vue'
import FindPlaces from '@/components/FindPlaces.vue'
export default {
  components: {
    LeftSidebar,
    TheFeed,
    RightSidebar,
    TheHeader,
    EstablishmentForm,
    EstablishmentMap,
    FindPlaces
  },
  data() {
    return {
      currentView: 'TheFeed' // inicia no feed
    }
  },
  methods: {
    showFeed() {
      if (this.currentView === 'TheFeed') {
        // já está no feed → apenas recarrega
        this.$refs.feedRef?.reloadPosts?.()
        this.$refs.feedRef?.scrollToTop?.()
      } else {
        // troca para o feed
        this.currentView = 'TheFeed'
      }
    },
    showMap() {
      // mostra o mapa (sem precisar dar duplo clique)>>>
      this.currentView = 'EstablishmentMap'
    },
    setView(view) {
      // troca entre os modos: feed, form, map
      this.currentView =
        view === 'feed'
          ? 'TheFeed'
          : view === 'form'
          ? 'EstablishmentForm'
          : view == 'map'
          ?'EstablishmentMap'
          : 'FindPlaces'

    },
  }
  
 
}
</script>
<style>
  body{
    background-color: #18191a;
  }
</style>
<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* evita que a página role */
  width: 100%;
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



