<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue';
import StickerImage from '@/components/StickerImage.vue';
import { API_URL } from '@/config';
import { getCart, removeStickerFromCart } from '@/utils/cart';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const accountId = localStorage.getItem('account_id');

const router = useRouter();

const cart = ref()

const removeFromCart = (index: number) => {
  removeStickerFromCart(index);
  // reload page to refresh cart page
  // (we should probably do this reactively)
  // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  window.location.reload();
}

onBeforeMount(async () => {
  if (!accountId) return router.push("/login");

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
  </div>
</template>

<style scoped>
</style>