<script setup lang="ts">
    import { API_URL } from '@/config';
    import { onBeforeMount, ref } from 'vue';
    import OrderItem from '@/components/OrderItem.vue';

    const orders = ref([]);
    const accountId = localStorage.getItem('account_id');
    
    onBeforeMount(async () => {
        const url = `${API_URL}orders/${accountId}/all`

        try {
            const res = await fetch(url)

            if (res.status !== 200) {
                return alert('Error fetching orders')
            }

            const data = await res.json()
            orders.value = data;
        } catch (error) {
            console.log(error)
        }
    });
</script>

<template>
  <div class="container">
    <h2>Customer Orders</h2>
    <div v-if="orders?.length" class="list-group">
        <div v-for="order in orders" :key="order.order_id" class="list-group-item order-item d-flex row" >
            <OrderItem :order="order"/>
      </div>
    </div>
  </div>
</template>
