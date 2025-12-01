<script setup lang="ts">
import { RouterView } from 'vue-router'
import CoreNavbar from '@/components/CoreNavbar.vue';
import { onBeforeMount, provide, ref } from 'vue';

// adding a provider here so that CoreNavbar can update whenever the user logs in/out
// (also didn't feel like using a Pinia store for a one variable thing)

// Pattern I followed:
// https://vuejs.org/guide/components/provide-inject#working-with-reactivity
const isLoggedIn = ref();

const setIsLoggedIn = (value: boolean) => {
  isLoggedIn.value = value;
}

provide("isLoggedIn", {
  isLoggedIn,
  setIsLoggedIn
});

onBeforeMount(() => {
  isLoggedIn.value = localStorage.getItem("account_id") ? true : false;
})
</script>

<template>
  <CoreNavbar />
  <RouterView />
</template>

<style scoped></style>
