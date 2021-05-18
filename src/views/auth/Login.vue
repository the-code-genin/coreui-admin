<template>
  <CForm>
    <h1 class="mb-4">Login</h1>

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

    <CInput
      placeholder="Password"
      type="password"
      v-model.trim="$v.password.$model"
      :isValid="$v.password.$dirty ? !$v.password.$error : null"
      invalidFeedback="Password is required."
      :disabled="formStatus == 'SUBMITTING'"
    >
      <template #prepend-content>
        <CIcon name="cil-lock-locked"/>
      </template>
    </CInput>

    <CAlert color="danger" class="my-5" v-if="formStatus == 'FAILED' && formValid">
      {{ formError }}
    </CAlert>

    <CRow class="mt-5">
      <!-- <CCol col="6" class="text-left">
        <CButton :to="{name: 'ForgotPassword'}" color="link" class="px-0">
          Forgot password?
        </CButton>
      </CCol> -->

      <CCol col="6" class="text-right offset-md-6">
        <CButton 
          color="primary" 
          class="px-4"
          :disabled="formStatus == 'SUBMITTING'"
          @click="submit"
        >
          <CSpinner class="mr-1" size="sm" v-if="formStatus == 'SUBMITTING'">
            <span class="sr-only">Submitting...</span>
          </CSpinner>

          {{ formStatus == 'SUBMITTING' ? 'Submitting...' : 'Login' }}
        </CButton>
      </CCol>
    </CRow>
  </CForm>
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '@/services/api/auth'
import { required, email } from 'vuelidate/lib/validators'

export default Vue.extend<any, any, any, any>({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      /** @type {'INACTIVE'|'SUBMITTING'|'FAILED'|'SUCCESS'} */
      formStatus: 'INACTIVE',
      formError: '',
    }
  },
  computed: {
    formData() {
      return {
        email: this.email,
        password: this.password
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
        let response = await auth.login(this.formData);
        this.formStatus = 'SUCCESS';

        // Set user instance.
        this.$store.commit('Auth/setUser', response.data);

        // Go to transaction url page
        this.$router.go({name: 'Dashboard'});
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
    password: {
      required,
    },
  },
  metaInfo() {
    return {
      title: "Login",
    }
  }
});
</script>
