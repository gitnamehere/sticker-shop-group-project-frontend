<script setup lang="ts">
defineProps<{
  orderId: number
  accountId?: number
}>()
</script>

<template>
  <div class="order-item">
    <p><strong>Order #:</strong> {{ orderId }}</p>
    <p v-if="accountId !== undefined"><strong>Account:</strong> {{ accountId }}</p>
  </div>
</template>

<style scoped>
.order-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: white;
}
</style>
