<template>
  <aside class="left-sidebar">
    <ul>
      <li><i class="fas fa-user-friends"></i> Amigos</li>
      <li><i class="fas fa-video"></i> Vídeos</li>
      <li><i class="fas fa-store"></i> Marketplace</li>
      <li><i class="fas fa-clock"></i> Lembranças</li>
    </ul>
  </aside>
</template>

<style scoped>
.left-sidebar {
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 10px 15px;
}

.left-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.left-sidebar li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: #b0b3b8;
  cursor: pointer;
}

.left-sidebar li:hover {
  background-color: #3a3b3c;
  border-radius: 8px;
}
/* ===== Responsividade ===== */
@media (max-width: 1024px) {
  .left-sidebar {
    width: 180px;
  }
}

@media (max-width: 768px) {
  .left-sidebar {
    display: none; /* Sidebar some em telas pequenas */
  }
}
</style>
