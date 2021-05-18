<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-muted">The page you are looking for was not found.</p>
          </div>

          <div class="d-flex justify-content-center">
            <CButton color="primary" size="lg" :to="{name: 'Home'}">Go Home</CButton>
          </div>
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotFound',
  metaInfo() {
    return {
      title: "404 - Not Found",
    }
  }
})
</script>
