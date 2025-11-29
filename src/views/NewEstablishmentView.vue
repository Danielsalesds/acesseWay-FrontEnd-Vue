<template>
    <div class="page-layout">
        <TheHeader />
        <main class="main-content">
            <LeftSidebar class="sidebar" />
            <div class="content-area">
                <EstablishmentForm/>
            </div>
        </main>
    </div>
</template>
<script setup>
import TheHeader from '@/components/TheHeader.vue';
import LeftSidebar from '@/components/LeftSidebar.vue';
import EstablishmentForm from '@/components/EstablishmentForm.vue';
</script>
<style scoped>
.page-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #18191a;
    overflow: hidden
}

.main-content {
    display: grid;
    /* 300px para a sidebar (fixo) 
     1fr para o conteúdo (ocupa todo o resto) 
  */
    grid-template-columns: 300px 1fr;
    flex: 1;
    height: 100%;
    overflow:hidden;
}

.content-area {
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
        /* Vira uma coluna só */
    }
    .sidebar {
        display: none;
        /* Esconde a sidebar no mobile (já que você tem o menu hambúrguer) */
    }
}
</style>