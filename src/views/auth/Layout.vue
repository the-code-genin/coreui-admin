<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow class="w-100">
      <CCol :md="{size: '6', offset: '3'}">
        <div class="mb-5">
          <CImg :src="banner" height="60px"/>
        </div>

        <CCard class="p-4 shadow">
          <CCardBody>
            <router-view></router-view>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import banner from '@/assets/images/Logo.png'

export default Vue.extend({
  name: 'Layout',
  data() {
    return {
      banner
    }
  }
})
</script>
