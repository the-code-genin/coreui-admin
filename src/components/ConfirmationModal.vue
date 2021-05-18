<template>
    <CModal
      :show="show"
      @update:show="showUpdated"
      :centered="centered"
      :title="title"
      :size="size"
      :color="color"
      :closeOnBackdrop="closeOnBackdrop && !disabled"
    >
        <slot>
            Are you sure you want to do this?
        </slot>

        <template #footer>
            <CButton :disabled="disabled" :size="size" color="secondary" @click="$emit('update:show', false)">
                Cancel
            </CButton>
            <CButton :disabled="disabled" :size="size" :color="color" @click="$emit('confirm')">
                Okay
            </CButton>
        </template>
    </CModal>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ConfirmationModal',
    props: {
        show: {
            required: true,
            type: Boolean
        },
        centered: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Confirmation',
        },
        size: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: 'primary'
        },
        closeOnBackdrop: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showUpdated(value: Boolean) {
            if (this.disabled) return;
            this.$emit('update:show', value);
        }
    }
})
</script>