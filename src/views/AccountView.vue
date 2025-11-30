<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import { API_URL } from '@/config';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const phoneNumber = ref("");
const street = ref("");
const city = ref("");
const postalCode = ref("");

const loading = ref(true);
const message = ref("");

const router = useRouter();

const accountId = localStorage.getItem('account_id');

onMounted(async () => {
  if (!accountId) {
    router.push('/login');
    return;
  }

  try {
    const res = await fetch(`${API_URL}account/${accountId}`);
    if (!res.ok) {
      router.push('/login');
      return;
    }
    const data = await res.json().catch(() => null);
    if (data) {
      firstName.value = data.first_name ?? data.firstName ?? "";
      middleName.value = data.middle_name ?? data.middleName ?? "";
      lastName.value = data.last_name ?? data.lastName ?? "";
      email.value = data.email_address ?? data.email ?? "";
      phoneNumber.value = data.phone_number ?? data.phoneNumber ?? "";
      street.value = data.street ?? "";
      city.value = data.city ?? "";
      postalCode.value = data.postal_code ?? data.postalCode ?? "";
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const submitButton = async () => {
  if (!accountId) {
    router.push('/login');
    return;
  }

  const payload = {
    firstName: firstName.value || null,
    middleName: middleName.value || null,
    lastName: lastName.value || null,
    email: email.value || null,
    password: password.value || null,
    phoneNumber: phoneNumber.value || null,
    street: street.value || null,
    city: city.value || null,
    postalCode: postalCode.value || null,
  };

  try {
    const res = await fetch(`${API_URL}account/${accountId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Update failed:', res.status, text);
      message.value = 'Error updating account';
      return;
    }

    await res.json().catch(() => null);
    message.value = 'Account updated successfully';
    password.value = '';
  } catch (err) {
    console.error('Update error:', err);
    message.value = 'Error updating account';
  }
};
</script>

<template>
  <main class="account-page">
    <CoreNavbar />
    <div class="container card p-4 account-card">
      <h2 class="mb-3">Account Details</h2>

      <form @submit.prevent="submitButton">
        <div class="row g-2">
          <div class="col-12 col-md-4">
            <label class="form-label">First Name</label>
            <input v-model="firstName" placeholder="First Name" class="form-control" />
          </div>
          <div class="col-12 col-md-4">
            <label class="form-label">Middle Name</label>
            <input v-model="middleName" placeholder="Middle Name" class="form-control" />
          </div>
          <div class="col-12 col-md-4">
            <label class="form-label">Last Name</label>
            <input v-model="lastName" placeholder="Last Name" class="form-control" />
          </div>
        </div>

        <div class="row mt-3 g-2">
          <div class="col-12 col-md-6">
            <label class="form-label">Email</label>
            <input v-model="email" placeholder="you@example.com" class="form-control" />
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" placeholder="Create a password" class="form-control" />
          </div>
        </div>

        <div class="row mt-3 g-2">
          <div class="col-12 col-md-6">
            <label class="form-label">Phone Number</label>
            <input v-model="phoneNumber" placeholder="(555) 123-4567" class="form-control" />
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Street</label>
            <input v-model="street" placeholder="Street" class="form-control" />
          </div>
        </div>

        <div class="row mt-3 g-2">
          <div class="col-12 col-md-6">
            <label class="form-label">City</label>
            <input v-model="city" placeholder="City" class="form-control" />
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label">Postal Code</label>
            <input v-model="postalCode" placeholder="Postal Code" class="form-control" />
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button type="submit" class="btn btn-primary btn-submit">Create account</button>
        </div>
      </form>
    </div>
  </main>
</template>

<!-- Citation: Used ChatGPT to help stylize / Recycled style from LoginView.vue -->
<style scoped>
.account-page { padding: 28px 12px; }
.account-card {
  max-width: 900px;
  margin: 18px auto;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(14,21,47,0.06);
  background: linear-gradient(180deg, #ffffff, #fafafa);
}
h2 { font-weight: 600; }
.form-label { font-weight: 500; font-size: 14px; }
.form-control {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  box-shadow: none;
}
.form-control:focus {
  border-color: #7aa8ff;
  box-shadow: 0 0 0 4px rgba(45,125,244,0.08);
  outline: none;
}
.btn-submit { padding: 10px 18px; border-radius: 8px; }
.form-text { font-size: 12px; margin-top: 4px; color: #6b7280; }

@media (max-width: 575px) {
  .signup-card { padding: 18px; }
  .btn-submit { width: 100%; }
}
</style>
