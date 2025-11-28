<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex align-items-center">
        <h2 class="navbar__title">Sticker Shop</h2>
        <RouterLink to="/" class="nav-link fs-4">Home</RouterLink>
      </div>
      <div>
        <RouterLink to="/cart" class="nav-link fs-4">
          <FontAwesomeIcon icon="cart-shopping"/>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar__title {
  margin-right: 32px;
}
</style>
