<template>
  <aside class="right-sidebar">
    <h3>Contatos</h3>
    <ul>
      <li><i class="fas fa-circle text-green"></i> Meta AI</li>
      <li><i class="fas fa-circle text-green"></i> João</li>
      <li><i class="fas fa-circle text-green"></i> Regina</li>
    </ul>
  </aside>
</template>

<style scoped>
.right-sidebar {
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 10px 15px;
}

.right-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.right-sidebar li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  color: #b0b3b8;
}
</style>
