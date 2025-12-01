<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { API_URL } from '@/config'
import OrderItem from '@/components/OrderItem.vue'

const route = useRoute()
const router = useRouter()
const orderId = route.params.orderId

const order = ref()

async function loadOrder() {
  const accountId = localStorage.getItem('account_id')
  try {
    const res = await fetch(`${API_URL}orders/${accountId}/${orderId}`)
    if (!res.ok) {
      alert('Failed to fetch order')
    }
    order.value = await res.json()
  } catch {
    console.log('Failed to load order')
  }
}

async function deleteOrder() {
  if (!order.value) return
  const id = order.value.order_id

  if (!confirm('Delete this order?')) return

  try {
    const res = await fetch(`${API_URL}orders/${id}`, {
      method: 'DELETE',
    })

    if (res.status === 204) {
      alert('Order deleted!')
      router.push('/orders/all')
    } else {
      alert('Failed to delete order')
    }
  } catch {
    console.error('Error deleting order')
  }
}

onMounted(loadOrder)
</script>

<template>
  <div class="container">
    <h1>Order Confirmation</h1>
    <div v-if="order">
      <OrderItem :orderId="order.order_id" :order="order" />
      <button class="btn btn-danger mt-3" @click="deleteOrder">Delete Order</button>
    </div>
    <p v-else class="text-danger">Failed to load order</p>
  </div>
</template>
