<script setup lang="ts">
import { API_URL } from '@/config';
import { ref } from 'vue';

const account_id = localStorage.getItem('account_id') || "1";
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
  formData.append("account_id", account_id);

  fetch(`${API_URL}stickers/create`, {
    method: "POST",
    body: formData,
  });
};


</script>

<template>
  <main>
    <div class="container card p-3">
      <h1>Upload Sticker</h1>
      <div class="mb-3">
        <label class="form-label">Sticker Name</label>
        <input v-model="name" placeholder="Name" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Sticker Description</label>
        <input v-model="description" placeholder="Description" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">File</label>
        <input @input="handleFileUpload" id="input" type="file" accept=".png,.jpg,.jpeg" class="form-control" />
      </div>
      <button @click="submitSticker" class="btn btn-primary">Submit</button>
    </div>
  </main>
</template>

<style scoped>
</style>
