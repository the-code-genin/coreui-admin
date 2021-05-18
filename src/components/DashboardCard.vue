<template>
    <CCard align="center" class="shadow-sm">
        <CCardBody>
            <h1 class="display-4 mb-2">{{stat}}</h1>

            <div class="d-flex align-items-center justify-content-center">
                <CIcon :name="icon"/>
                <span class="lead ml-2">{{description}}</span>
            </div>
        </CCardBody>
    </CCard>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'DashboardCard',
    props: {
        stat: {
            required: true,
            type: Number
        },
        icon: {
            required: true,
            type: String,
        },
        description: {
            required: true,
            type: String
        }
    }
})
</script>