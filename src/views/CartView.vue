<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue';
import { getCart } from '@/utils/cart';
import { ref } from 'vue';

const cart = ref(getCart());
</script>

<template>
  <CoreNavbar />
  <div class="container">
    <h1>Cart</h1>
    <div v-if="cart.length">
      <div
        v-for="sticker in cart"
        :key="sticker"
      >
        <p>{{ sticker }}</p>
      </div>
    </div>
  </div>
</template>
