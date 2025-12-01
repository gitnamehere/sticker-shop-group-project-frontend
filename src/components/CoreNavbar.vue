<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink, useRouter } from 'vue-router'
import { inject } from 'vue';

const router = useRouter();

// https://vuejs.org/guide/components/provide-inject#working-with-reactivity
const { isLoggedIn, setIsLoggedIn } = inject("isLoggedIn");

const logoutButton = () => {
  localStorage.removeItem('account_id');
  setIsLoggedIn(false);
  router.push('/');
};
</script>

<template>
  <div class="navbar navbar-expand-lg">
    <div class="container">
      <div class="text-links">
        <h2 class="navbar__title">Sticker Shop</h2>
        <RouterLink to="/" class="nav-link fs-4">Home</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/orders/all" class="nav-link fs-4">Orders</RouterLink>
      </div>
      <div class="icons">
        <template v-if="isLoggedIn">
          <RouterLink to="/account" class="nav-link fs-4">
            <FontAwesomeIcon icon="user-circle"/>
          </RouterLink>
          <button @click="logoutButton" class="nav-link fs-4">
            <FontAwesomeIcon icon="sign-out-alt"/>
          </button>
        </template>
        <template v-else>
          <RouterLink to="/signup" class="nav-link fs-4">
            <FontAwesomeIcon icon="user-plus"/>
          </RouterLink>
          <RouterLink to="/login" class="nav-link fs-4">
            <FontAwesomeIcon icon="sign-in-alt"/>
          </RouterLink>
        </template>
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
.text-links {
  display: flex;
  align-items: center;
  gap: 20px;
}
.icons {
  display: flex;
  gap: 10px;
}
</style>
