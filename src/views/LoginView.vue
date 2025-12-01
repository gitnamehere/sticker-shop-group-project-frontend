<script setup lang="ts">
import { API_URL } from '@/config';
import { inject, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");

const router = useRouter();

// https://vuejs.org/guide/components/provide-inject#working-with-reactivity
const { isLoggedIn, setIsLoggedIn } = inject("isLoggedIn");

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
      return alert("Login failed. Please try again.");
    }

    const data = await res.json();
    const {account_id} = data;
  
    if (!account_id) {
      throw Error();
    }

    localStorage.setItem('account_id', JSON.stringify(account_id));
    setIsLoggedIn(true);
    router.push('/');
  } catch {
    alert("Login error. Please try again.");
  }
};

onBeforeMount(() => {
  if (isLoggedIn.value) router.push("/");
})
</script>

<template>
  <div class="container card p-4 login-card">
    <h2 class="mb-3">Login to your account</h2>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required />
    </div>
    <button @click="loginButton" class="btn btn-primary">Login</button>
  </div>
</template>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
