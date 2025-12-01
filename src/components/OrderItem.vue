<script setup lang="ts">
defineProps<{
  orderId: number
  order: any
}>()
</script>

<template>
    <p><strong>Order #{{ order.order_id }}</strong></p>
    <div v-for="item in order.items" :key="item.id" class="d-flex row mb-3">
        <div class="sticker-details col-10">
            <p> <strong>Material:</strong> {{ item.material }}</p>
            <p> <strong>Color:</strong> ({{ item.color }})</p>
            <p> <strong>Size:</strong> {{ `${item.length}cm × ${item.width}cm` }} </p>
        </div>
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
