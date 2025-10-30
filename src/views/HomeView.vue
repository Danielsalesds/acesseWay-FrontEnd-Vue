<template>
  <div class="layout-home">
    <!-- Header controla o modo -->
    <TheHeader @toggle-map="setView('map')" />

    <main class="content">
      <LeftSidebar @change-view="setView" />

      <!-- Renderiza dinamicamente o conteúdo central -->
      <component :is="currentView" />

      <RightSidebar />
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

export default {
  components: {
    LeftSidebar,
    TheFeed,
    RightSidebar,
    TheHeader,
    EstablishmentForm,
    EstablishmentMap,
  },
  data() {
    return {
      currentView: 'TheFeed', // começa com o feed
    }
  },
  methods: {
    setView(view) {
      // troca entre os modos: feed, form, map
      this.currentView =
        view === 'feed'
          ? 'TheFeed'
          : view === 'form'
          ? 'EstablishmentForm'
          : 'EstablishmentMap'
    },
  },
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.layout-home {
  background-color: #18191a;
  color: #e4e6eb;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 20px;
  padding-top: 60px;
  height: calc(100vh - 60px);
}

.content > * {
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: #3a3b3c #18191a;
}

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
