<template>
  <CForm>
    <h1>Reset Password</h1>
    <p class="mb-5">Set your new password.</p>

    <CInput
      placeholder="New Password"
      type="password"
      v-model.trim="$v.password.$model"
      :isValid="$v.password.$dirty ? !$v.password.$error : null"
      invalidFeedback="New password must be at least 6 characters long."
      :disabled="formStatus == 'SUBMITTING'"
    >
      <template #prepend-content>
        <CIcon name="cil-lock-locked"/>
      </template>
    </CInput>

    <CInput
      placeholder="Re-type New Password"
      type="password"
      v-model.trim="$v.confirm_password.$model"
      :isValid="$v.confirm_password.$dirty ? !$v.confirm_password.$error : null"
      invalidFeedback="Passwords must match."
      :disabled="formStatus == 'SUBMITTING'"
    >
      <template #prepend-content>
        <CIcon name="cil-lock-locked"/>
      </template>
    </CInput>

    <CAlert color="danger" class="my-5" v-if="formStatus == 'FAILED' && formValid">
      {{ formError }}
    </CAlert>

    <CButton 
      color="primary" 
      class="px-4 mt-5"
      :disabled="formStatus == 'SUBMITTING'"
      @click="submit"
    >
      <CSpinner class="mr-1" size="sm" v-if="formStatus == 'SUBMITTING'">
        <span class="sr-only">Submitting...</span>
      </CSpinner>

      {{ formStatus == 'SUBMITTING' ? 'Submitting...' : 'Update Password' }}
    </CButton>
  </CForm>
</template>

<script lang="ts">
import Vue from 'vue'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import connector from '@/services/api/api-connector'

export default Vue.extend<any, any, any, any>({
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirm_password: '',
      /** @type {'INACTIVE'|'SUBMITTING'|'FAILED'|'SUCCESS'} */
      formStatus: 'INACTIVE',
      formError: '',
    }
  },
  computed: {
    formData() {
      return {
        password: this.password,
        confirm_password: this.confirm_password,
      }
    },
    formValid() {
      return !this.$v.$error;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.formStatus == 'SUBMITTING') return;
      this.formStatus = 'SUBMITTING';

      try {
        let response = await connector.post(this.$route.query.url, this.formData);
        if (response.status != 200) throw new Error('An error occured while contacting the server.');
        if (!response.data.success) throw new Error(response.data.error.message);

        this.formStatus = 'SUCCESS';
        this.$router.push({name: 'PasswordReset'});
      } catch (message) {
        this.formError = message;
        this.formStatus = 'FAILED';
      }
    }
  },
  validations: {
      password: {
        required,
        minLength: minLength(6)
      },
      confirm_password: {
        required,
        sameAs: sameAs('password')
      },
  },
  metaInfo() {
    return {
      title: "Reset Password",
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!to.query.url) next({name: 'NotFound'});
    else next();
  }
});
</script>
