<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="navbar">
    <h2 class="navbar__title">Sticker Shop</h2>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;

  &__title {
    margin-right: 32px;
  }
}
</style>