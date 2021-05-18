<template>
  <CFooter :fixed="false">
    <div>
      <a :href="url" target="_blank">Admin Panel</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
  </CFooter>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheFooter',
  data() {
    return {
      url: process.env.VUE_APP_FRONTEND_URL
    }
  }
})
</script>
