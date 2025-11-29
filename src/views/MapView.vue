<template>
    <div class="page-layout">
        <TheHeader />

        <main class="main-content">

            <LeftSidebar class="sidebar" />

            <div class="map-area">
                <EstablishmentMap />
            </div>

        </main>
    </div>
</template>
<script setup>
import EstablishmentMap from '@/components/EstablishmentMap.vue';
import TheHeader from '@/components/TheHeader.vue';
import LeftSidebar from '@/components/LeftSidebar.vue';
</script>

<style scoped>
.page-layout {
  height: 100vh; /* Ocupa a tela toda */
  display: flex;
  flex-direction: column;
  background-color: #18191a;
  overflow: hidden; /* Evita scroll na janela inteira */
}

/* Grid para Sidebar + Mapa */
.main-content {
  display: grid;
  grid-template-columns: 300px 1fr; /* 300px para sidebar, o resto para o mapa */
  flex: 1; /* Ocupa a altura restante abaixo do header */
  height: 100%;
  position: relative;
}

/* Container do Mapa */
.map-area {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 10px;
  padding-right: auto;
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr; /* Apenas uma coluna no mobile */
  }

  .sidebar {
    display: none; /* Esconde a sidebar no mobile */
  }
}
</style>