<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import { API_URL } from '@/config';
import { ref } from 'vue';

const image = ref();
const name = ref("");
const description = ref("");

// TODO: type event properly later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleFileUpload = (event: any) => {
  if (event.target.files.length) {
    image.value = event.target.files[0];
  }
};

const submitSticker = async () => {
  // Guide I used to upload images and data to backend:
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
  const formData = new FormData();
  formData.append("imageData", image.value);
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("creator_id", "1"); // placeholder

  fetch(`${API_URL}stickers/create`, {
    method: "POST",
    body: formData,
  });
};


</script>

<template>
  <main>
    <CoreNavbar />
    <div class="container">
      <input v-model="name" placeholder="Name"/>
      <input v-model="description" placeholder="Description"/>
      <input @input="handleFileUpload" id="input" type="file" accept=".png,.jpg,.jpeg" />
      <button @click="submitSticker">Submit</button>
    </div>
  </main>
</template>

<style scoped>
</style>
