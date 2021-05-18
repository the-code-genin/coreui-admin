<template>
  <div class="home">
    <h2>Good day, {{authUser.name}}.</h2>
    <p class="lead">Here is a quick overview of the website.</p>

    <template v-if="!loading">

    </template>
    <template v-else>
      <div class="d-flex justify-content-center p-5 m-5">
        <CSpinner
          color="primary"
          style="width:4rem;height:4rem;"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'

export default Vue.extend<any, any, any, any>({
  name: 'Dashboard',
  components: {
    DashboardCard
  },
  data() {
    return {
      loading: false
    }
  },
  async created() {
    this.loading = true;

    try {
      this.loading = false;
    } catch(e) {}
  }
})
</script>
