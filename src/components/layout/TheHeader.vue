<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />

    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />

    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CImg
        :src="banner"
        :height="35"
      />
    </CHeaderBrand>

    <CHeaderNav class="ml-auto mr-4">
      <span v-if="authUser != null">Hello, {{authUser.name}}!</span>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>

    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script lang="ts">
import Vue from 'vue'
import banner from '@/assets/images/logo-banner-dark.png'
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt.vue'

export default Vue.extend({
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  data() {
    return {
      banner
    }
  }
})
</script>
