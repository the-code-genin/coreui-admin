<template>
  <CForm>
    <h1>Forgot Password</h1>
    <p class="mb-5">A password reset email will be sent to your email address.</p>

    <CInput
      placeholder="Email"
      type="email"
      v-model.trim="$v.email.$model"
      :isValid="$v.email.$dirty ? !$v.email.$error : null"
      invalidFeedback="A valid email is required."
      :disabled="formStatus == 'SUBMITTING'"
    >
      <template #prepend-content>
        <CIcon name="cil-at"/>
      </template>
    </CInput>

    <div class="my-4" v-if="['FAILED', 'SUCCESS'].indexOf(formStatus) != -1 && formValid">
        <CAlert v-if="formStatus == 'SUCCESS'" color="success">
          <strong>Success!</strong> A password reset email has been sent to the email address associated with your account.
        </CAlert>

        <CAlert v-else color="danger">
          <strong>An error occured!</strong> {{ formError }}
        </CAlert>
    </div>

    <CRow class="mt-5 pt-3">
      <CCol col="6" class="text-left">
        <CButton :to="{name: 'Login'}" color="link" class="px-0">
          Remember password?
        </CButton>
      </CCol>

      <CCol col="6" class="text-right">
        <CButton 
          color="primary" 
          class="px-4"
          :disabled="formStatus == 'SUBMITTING'"
          @click="submit"
        >
          <CSpinner class="mr-1" size="sm" v-if="formStatus == 'SUBMITTING'">
            <span class="sr-only">Submitting...</span>
          </CSpinner>

          {{ formStatus == 'SUBMITTING' ? 'Submitting...' : 'Request Email' }}
        </CButton>
      </CCol>
    </CRow>
  </CForm>
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '@/services/api/auth'
import { required, email } from 'vuelidate/lib/validators'

export default Vue.extend<any, any, any, never>({
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      /** @type {'INACTIVE'|'SUBMITTING'|'FAILED'|'SUCCESS'} */
      formStatus: 'INACTIVE',
      formError: '',
    }
  },
  computed: {
    formData() {
      return {
        email: this.email,
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
        // let response = await auth.requestPasswordResetEmail(this.formData);
        this.formStatus = 'SUCCESS';
      } catch (message) {
        this.formError = message;
        this.formStatus = 'FAILED';
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
  },
  metaInfo() {
    return {
      title: "Forgot Password",
    }
  }
})
</script>
