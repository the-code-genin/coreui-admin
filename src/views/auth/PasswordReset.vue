<template>
  <CForm>
    <h1>Success</h1>
    <p class="mb-4">Your password has been reset successfully.</p>

    <CButton :to="{name: 'Login'}" color="primary" class="px-4">
      Login
    </CButton>
  </CForm>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PasswordReset',
  metaInfo() {
    return {
      title: "Password Reset Successfully",
    }
  }
})
</script>
