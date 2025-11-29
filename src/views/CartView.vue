<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue';
import StickerImage from '@/components/StickerImage.vue';
import { API_URL } from '@/config';
import { getCart, removeStickerFromCart, clearCart } from '@/utils/cart';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const cart = ref<any[]>([])
const router = useRouter();
const loading = ref(false);

const removeFromCart = (index: number) => {
  removeStickerFromCart(index);
  // reload page to refresh cart page
  window.location.reload();
}

onBeforeMount(async () => {
  const stickersInCart = getCart();
  const stickers = [];

  for (let i = 0; i < stickersInCart.length; i++) {
    const response = await fetch(`${API_URL}stickers/${stickersInCart[i].sticker_id}`);
    if (response.status !== 200) return alert("Error fetching sticker data");

    const data = await response.json();

    stickers.push({
      stickerId: data.sticker_id,
      name: data.name,
      type: data.sticker.type,
      shape: data.sticker.shape,
      imageData: data.sticker.image_data,
      material: stickersInCart[i].material,
      quantity: stickersInCart[i].quantity,
      color: stickersInCart[i].color,
    })
  }

  cart.value = stickers;
})


async function placeOrder() {
  if (!cart.value || cart.value.length === 0) {
    return alert('Your cart is empty');
  }

  loading.value = true;
  try {
    const itemsPayload = cart.value.map((s: any) => ({
      stickerId: s.stickerId,
      materialId: null,
      colorId: null,
      quantity: s.quantity ?? 1,
    }));

    const payload = {
      accountId: 1, 
      orderId: null,
      items: itemsPayload,
    };

    const res = await fetch(`${API_URL}orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }

    const data = await res.json();
    alert('Order placed. id=' + (data.order_id ?? data.orderId ?? ''));
    router.push({ name: 'home', query: { orderId: String(data.order_id ?? data.orderId ?? '') } });
  } catch (err: any) {
    alert('Failed to place order: ' + (err?.message || err));
  } finally {
    loading.value = false;
  }
  clearCart();
}

</script>

<template>
  <CoreNavbar />
  <div class="container">
    <h1>Cart</h1>
    <div v-if="cart.length" class="list-group">
      <div
        v-for="(sticker, index) in cart"
        :key="sticker"
        class="list-group-item cart-item d-flex row"
      >
        <div class="sticker-image col-2">
          <StickerImage
            :sticker-type="sticker.type"
            :image-data="sticker.imageData"
            :shape="sticker.shape"
            :color="sticker.color"
          />
        </div>
        <div class="col-8">
          <p>{{ sticker.name }}</p>
          <p>Material: {{ sticker.material }}</p>
          <p>Color: {{ sticker.color }}</p>
          <p>Quantity: {{ sticker.quantity}}</p>
        </div>
        <div class="col-2">
          <button class="btn btn-danger" @click="() => removeFromCart(index)">Remove from cart</button>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button
        class="btn btn-primary"
        @click="placeOrder"
        :disabled="!cart || !cart.length"
        type="button"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>