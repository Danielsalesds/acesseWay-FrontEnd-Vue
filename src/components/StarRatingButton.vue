<template>
    <div class="rating">
        <input type="radio" id="star5" name="rating" value="5" v-model="model">
        <label for="star5" title="5 estrelas">★</label>

        <input type="radio" id="star4" name="rating" value="4" v-model="model">
        <label for="star4" title="4 estrelas">★</label>

        <input type="radio" id="star3" name="rating" value="3" v-model="model">
        <label for="star3" title="3 estrelas">★</label>

        <input type="radio" id="star2" name="rating" value="2" v-model="model"> 
        <label for="star2" title="2 estrelas">★</label>

        <input type="radio" id="star1" name="rating" value="1" v-model="model">
        <label for="star1" title="1 estrela">★</label>
    </div>
</template>
<script setup>
import {defineModel } from 'vue'
// const rating = ref(0);
const model = defineModel();

</script>

<style scoped>
.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center; 
}
.rating input[type="radio"] {
    display: none;
}
.star-rating i {
    margin-right: 2px;
}
.rating label {
  font-size: 2.5rem; 
  color: #e4e6eb;
  cursor: pointer;
  transition: color 0.2s;
}
.rating label:hover,
.rating label:hover ~ label {
  color: #f5c518;
}

.rating input[type="radio"]:checked ~ label {
  color: #f5c518;
}
</style>