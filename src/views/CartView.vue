<script setup lang="ts">
import StickerImage from '@/components/StickerImage.vue'
import { API_URL } from '@/config'
import { getCart, removeStickerFromCart, clearCart } from '@/utils/cart'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const accountId = localStorage.getItem('account_id')

const router = useRouter()

interface Color {
  color_id: number
  color: string
}

interface Material {
  material_id: number
  material: string
  price: number
}

interface Size {
  size_id: number
  sticker_id: number
  length: number
  width: number
}

interface Cart {
  stickerId: number
  name: string
  type: string
  shape: string
  imageData: string
  material: Material
  quantity: number
  color: Color
  size: Size
  price: number
}

const cart = ref<Cart[]>([])

const removeFromCart = (index: number) => {
  removeStickerFromCart(index)
  // reload page to refresh cart page
  // (we should probably do this reactively)
  // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  window.location.reload()
}

onBeforeMount(async () => {
  if (!accountId) return router.push('/login')

  const stickersInCart = getCart()
  const stickers = []

  for (let i = 0; i < stickersInCart.length; i++) {
    const response = await fetch(`${API_URL}stickers/${stickersInCart[i].sticker_id}`)
    if (response.status !== 200) return alert('Error fetching sticker data')

    const data = await response.json()

    const price =
      stickersInCart[i].material.price *
      ((stickersInCart[i].size.length * stickersInCart[i].size.width) / 100)

    stickers.push({
      stickerId: data.sticker_id,
      name: data.name,
      type: data.sticker.type,
      shape: data.sticker.shape,
      imageData: data.sticker.image_data,
      material: stickersInCart[i].material,
      quantity: stickersInCart[i].quantity,
      color: stickersInCart[i].color,
      size: stickersInCart[i].size,
      price,
    })
  }

  cart.value = stickers
})

async function placeOrder() {
  if (!cart.value?.length) {
    return alert('Your cart is empty')
  }

  try {
    const itemsPayload = cart.value.map((sticker: Cart) => ({
      stickerId: sticker.stickerId,
      materialId: sticker.material.material_id,
      colorId: sticker.color.color_id,
      sizeId: sticker.size.size_id,
      quantity: sticker.quantity,
    }))

    const payload = {
      accountId: accountId,
      items: itemsPayload,
    }

    const res = await fetch(`${API_URL}orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.status >= 400) {
      throw Error()
    }

    const data = await res.json()
    alert('Order placed!')
    router.push(`/order/${data.order_id}`)
    clearCart()
  } catch {
    alert('Failed to place order')
  }
}
</script>

<template>
  <div class="container">
    <h1>Cart</h1>
    <div v-if="cart?.length" class="list-group">
      <div
        v-for="(sticker, index) in cart"
        :key="sticker.stickerId"
        class="list-group-item cart-item d-flex row"
      >
        <div class="sticker-image col-2">
          <StickerImage
            :sticker-type="sticker.type"
            :image-data="sticker.imageData"
            :shape="sticker.shape"
            :color="sticker.color.color"
          />
        </div>
        <div class="col-8">
          <p>{{ sticker.name }}</p>
          <p>Material: {{ sticker.material.material }}</p>
          <p>Color: {{ sticker.color.color }}</p>
          <p>Quantity: {{ sticker.quantity }}</p>
          <p>Size: {{ sticker.size.length }} cm x {{ sticker.size.width }} cm</p>
        </div>
        <div class="col-2">
          <h2>${{ sticker.price }}</h2>
          <button class="btn btn-danger" @click="() => removeFromCart(index)">
            Remove from cart
          </button>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button v-if="cart?.length" class="btn btn-primary" @click="placeOrder" type="button">
        Place Order
      </button>
    </div>
  </div>
</template>

<style scoped></style>
