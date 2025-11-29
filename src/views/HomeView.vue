<template>
  <div class="layout-home">
    <!-- Passa função toggleMap para o Header -->
    <TheHeader :show-search="true"/>
    <main class="content">
      <LeftSidebar v-if="!isMobile" @change-view="setView" :class="{ hide: currentView === 'RequestView' }" />
      <!-- Mostra feed ou mapa -->
      <!-- <component :is="currentView" ref="feedRef" :class="{ requestView: currentView === 'RequestView' }" /> -->
      <TheFeed/>
      <!-- <RightSidebar /> -->
    </main>
  </div>
</template>

<script>
import LeftSidebar from '../components/LeftSidebar.vue'
import TheFeed from '../components/TheFeed.vue'

import TheHeader from '../components/TheHeader.vue'
export default {
  components: {
    LeftSidebar,
    TheFeed,
    TheHeader,
  },
  data() {
    return {
      visible: false,
      // isMobile: false,
    }
  },
  // mounted(){
  //   this.checkScreenSize();
  //   window.addEventListener('resize', this.checkScreenSize);
  // },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.checkScreenSize);
  // },
  // methods: {
  //   checkScreenSize() {
  //     this.isMobile = window.innerWidth < 768;
  //   },
  // }
}
</script>
<style>
body {
  background-color: #18191a;
}
</style>
<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  /* evita que a página role */
  width: 100%;
}

.hide {
  display: none !important;
}

.requestView {
  grid-column: span 3;
  /* ocupa coluna do meio + direita */
  width: 100%;
  padding: 20px;
  overflow-y: auto;
}

.layout-home {
  background-color: #18191a;
  color: #e4e6eb;
  height: 100vh;
  overflow: hidden;
  /* evita scroll global */
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: grid;
  /* Antes estava com 3 colunas, agora só duas. A barra lateral direita foi removida, estava sem utilidade.
  /* grid-template-columns: 300px 1fr 300px; */
  grid-template-columns: 300px 1fr;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  /* padding-top: 60px; */
  /* altura do header fixo */
  /* height: calc(100vh - 60px); */
  /* altura restante */
}

/* As 3 colunas com scroll próprio */
.content>* {
  overflow-y: auto;
  height: 100%;
  min-width: 0;
  min-height: 0;
  /* scrollbar-width: thin;
  scrollbar-color: #3a3b3c #18191a; */
}

/* Responsividade */
@media (max-width: 1100px) {
  .content {
    grid-template-columns: 80px 1fr;
  }
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    margin: 5px;
  }
}

/* @media (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
  }
} */
</style>
