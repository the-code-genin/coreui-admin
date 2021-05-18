<template>
  <CCard class="shadow-sm">
    <CCardHeader>
      <h1 class="h3">Create Admin</h1>
    </CCardHeader>

    <CCardBody>
      <CForm>
        <CInput
          label="Name"
          placeholder="Name"
          type="text"
          v-model.trim="$v.name.$model"
          :isValid="$v.name.$dirty ? !$v.name.$error : null"
          invalidFeedback="Name is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-user"/>
          </template>
        </CInput>

        <CInput
          label="Email"
          placeholder="Email"
          type="email"
          v-model.trim="$v.email.$model"
          :isValid="$v.email.$dirty ? !$v.email.$error : null"
          invalidFeedback="Email is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-at"/>
          </template>
        </CInput>

        <CInput
          label="Password"
          placeholder="Password"
          type="password"
          v-model.trim="$v.password.$model"
          :isValid="$v.password.$dirty ? !$v.password.$error : null"
          invalidFeedback="Password is required and must be at least 6 characters long."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-lock-locked"/>
          </template>
        </CInput>

        <div class="row mt-4" v-if="['FAILED', 'SUCCESS'].indexOf(formStatus) != -1 && formValid">
          <div class="col-md-12">
            <CAlert v-if="formStatus == 'SUCCESS'" color="success">
              <strong>Success!</strong> Admin created.
            </CAlert>

            <CAlert v-else color="danger">
              <strong>An error occured!</strong> {{ formError }}
            </CAlert>
          </div>
        </div>
      </CForm>
    </CCardBody>
    
    <CCardFooter align="right">
      <CButton 
        color="primary" 
        class="px-4"
        :disabled="formStatus == 'SUBMITTING'"
        @click="submit"
      >
        <CSpinner class="mr-1" size="sm" v-if="formStatus == 'SUBMITTING'">
          <span class="sr-only">Submitting...</span>
        </CSpinner>

        {{ formStatus == 'SUBMITTING' ? 'Submitting...' : 'Create' }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script lang="ts">
import Vue from 'vue'
import {required, email, minLength, numeric} from 'vuelidate/lib/validators'
import admins from '@/services/api/admins';

export default Vue.extend<any, any, any, any>({
  name: 'CreateAdmin',
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.formStatus == 'SUBMITTING') return;
      this.formStatus = 'SUBMITTING';

      try {
        let response = await admins.store(this.formData);
        this.formStatus = 'SUCCESS';
        this.$router.push({name: 'All Admins'});
      } catch (message) {
        this.formError = message;
        this.formStatus = 'FAILED';
      }
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',

      /** @type {'INACTIVE'|'SUBMITTING'|'FAILED'|'SUCCESS'} */
      formStatus: 'INACTIVE',
      formError: '',
    }
  },
  computed: {
    formValid() {
      return !this.$v.$error;
    },
    formData() {
      return {
        name: this.name,
        email: this.email,
        password: this.password
      };
    },
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  async created() {
    try {
      
    } catch(e) {
      this.$router.push('/404');
    }
  },
  metaInfo() {
    return {
      title: "Create Admin",
    }
  }
})
</script>
