<script setup lang="ts">
import { API_URL } from '@/config'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const phoneNumber = ref('')
const street = ref('')
const city = ref('')
const postalCode = ref('')

const router = useRouter()

const submitButton = async () => {
  const payload = {
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
    street: street.value,
    city: city.value,
    postalCode: postalCode.value,
  }

  try {
    const res = await fetch(`${API_URL}account/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return alert('Signup failed. Please try again.')
    }

    await res.json()
    router.push('/login')
  } catch (err) {
    console.error('Signup error:', err)
    alert('Signup error. Please try again.')
  }
}
</script>

<template>
  <div class="container card p-4">
    <h2 class="mb-4">Create an account</h2>
    <div class="row mb-4 gx-4">
      <h4>Name</h4>
      <div class="col-12 col-md-4">
        <label class="form-label">First</label>
        <input v-model="firstName" placeholder="First Name" class="form-control" />
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label">Middle</label>
        <input v-model="middleName" placeholder="Middle Name" class="form-control" />
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label">Last</label>
        <input v-model="lastName" placeholder="Last Name" class="form-control" />
      </div>
    </div>
    <div class="row mb-4 gx-4">
      <h4>Account</h4>
      <div class="col-12 col-md-6">
        <label class="form-label">Email</label>
        <input v-model="email" placeholder="you@example.com" class="form-control" />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Create a password"
          class="form-control"
        />
      </div>
    </div>
    <div class="row mb-2 gx-4">
      <h4>Contact Info</h4>
      <div class="col-12 col-md-6">
        <label class="form-label">Phone Number</label>
        <input v-model="phoneNumber" placeholder="(555) 123-4567" class="form-control" />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Street</label>
        <input v-model="street" placeholder="Street" class="form-control" />
      </div>
    </div>
    <div class="row mb-4 gx-4">
      <div class="col-12 col-md-6">
        <label class="form-label">City</label>
        <input v-model="city" placeholder="City" class="form-control" />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Postal Code</label>
        <input v-model="postalCode" placeholder="Postal Code" class="form-control" />
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="submitButton" class="btn btn-primary">Create account</button>
    </div>
  </div>
</template>

<style scoped></style>
