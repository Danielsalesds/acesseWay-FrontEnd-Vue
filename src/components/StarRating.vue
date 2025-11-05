<template>
    <div class="star-rating">
    <span v-for="i in 5" :key="i">
      
      <i v-if="rating >= i" class="fas fa-star"></i>
      <i v-else-if="rating >= i - 0.5" class="fas fa-star-half-alt"></i>
      <i v-else class="far fa-star"></i>
    </span>
  </div>
</template>
<script setup>
defineProps({
  rating: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.star-rating {
  color: #f5c518;
  display: inline-block;
}
.star-rating i {
  margin-right: 2px;
}
</style>