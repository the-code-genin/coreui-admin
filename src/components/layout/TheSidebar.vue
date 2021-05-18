<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CImg
        :src="banner"
        :height="35"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="nav"/>

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script lang="ts">
import Vue from 'vue'
import banner from '@/assets/images/logo-banner-light.png'
import nav from './_nav'

export default Vue.extend<any, any, any, never>({
  name: 'TheSidebar',
  computed: {
    show () {
      return this.$store.getters.sidebarShow;
    },
    minimize () {
      return this.$store.getters.sidebarMinimize;
    },
    nav() {
      return [nav];
    }
  },
  data() {
    return {
      banner
    }
  },
})
</script>
