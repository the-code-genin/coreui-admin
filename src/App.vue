<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/typescript">
import Vue from 'vue';

export default Vue.extend({
  metaInfo() {
    return {
      title: "Admin Panel",
      titleTemplate: '%s - Admin Panel',
      meta: [
        {name: 'description', content:  'Welcome to the admin panel'},
        {property: 'og:title', content: "Admin Panel"},
        {property: 'og:site_name', content: 'Admin Panel'},
        {property: 'og:type', content: 'Home page'},
        {property: 'og:url', content: process.env.BASE_URL},
        {property: 'og:image', content: process.env.BASE_URL + 'favicon.ico'},
        {name: 'robots', content: 'index,follow'},
      ]
    }
	}
});
</script>