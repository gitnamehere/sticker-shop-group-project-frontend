<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import { API_URL } from '@/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");

const router = useRouter();

const loginButton = async () => {
  const payload = {
    email: email.value,
    password: password.value,
  };

  try {
    const res = await fetch(`${API_URL}account/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Login failed:", res.status, text);
      alert("Login failed. Please try again.");
      return;
    }

    const data = await res.json().catch(() => null);
    router.push('/');
  } catch (err) {
    console.error("Login error:", err);
    alert("Login error. Please try again.");
  }
};
</script>

<template>
  <main class="login-page">
    <CoreNavbar />
    <div class="container card p-4 login-card">
      <h2 class="mb-3">Login to your account</h2>

      <form @submit.prevent="loginButton">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.login-card {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
