<template>
  <CCard class="shadow-sm">
    <CCardHeader>
      <h1 class="h3">My Profile</h1>
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
          v-if="authUser != null"
          label="Email"
          placeholder="Email"
          type="email"
          :value="authUser.email"
          :disabled="true"
        >
          <template #prepend-content>
            <CIcon name="cil-at"/>
          </template>
        </CInput>

        <CInput
          label="Old Password"
          placeholder="Old Password"
          type="password"
          v-model.trim="$v.old_password.$model"
          :isValid="$v.old_password.$dirty ? !$v.old_password.$error : null"
          invalidFeedback="Your old password is required."
          :disabled="formStatus == 'SUBMITTING'"
          :class="{'d-none': password == ''}"
        >
          <template #prepend-content>
            <CIcon name="cil-lock-locked"/>
          </template>
        </CInput>

        <CInput
          label="New Password"
          placeholder="Password"
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
          label="Confirm Password"
          placeholder="Retype New Password"
          type="password"
          v-model.trim="$v.confirm_password.$model"
          :isValid="$v.confirm_password.$dirty ? !$v.confirm_password.$error : null"
          invalidFeedback="Passwords must match."
          :disabled="formStatus == 'SUBMITTING'"
          :class="{'d-none': password == ''}"
        >
          <template #prepend-content>
            <CIcon name="cil-lock-locked"/>
          </template>
        </CInput>

        <div class="row mt-4" v-if="['FAILED', 'SUCCESS'].indexOf(formStatus) != -1 && formValid">
          <div class="col-md-12">
            <CAlert v-if="formStatus == 'SUCCESS'" color="success">
              <strong>Success!</strong> Account information updated.
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

        {{ formStatus == 'SUBMITTING' ? 'Submitting...' : 'Update' }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '@/services/api/auth';
import {required, minLength, requiredIf, sameAs} from 'vuelidate/lib/validators'
import Admin from '@/models/admin';

export default Vue.extend<any, any, any, any>({
  name: 'Profile',
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.formStatus == 'SUBMITTING') return;
      this.formStatus = 'SUBMITTING';

      try {
        let response = await auth.updateProfile(this.formData);
        this.formStatus = 'SUCCESS';

        // Set user instance.
        this.$store.commit('Auth/setUser', response);
      } catch (message) {
        this.formError = message;
        this.formStatus = 'FAILED';
      }
    }
  },
  data() {
    return {
      name: '',
      old_password: '',
      password: '',
      confirm_password: '',

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
      let data: any = {
        name: this.name,
      }

      if (this.password != '') { // Password is not empty
        data.old_password = this.old_password;
        data.password = this.password;
      }

      return data;
    },
  },
  validations: {
    name: {
      required
    },
    old_password: {
      minLength: minLength(6),
      requiredIf: requiredIf('password')
    },
    password: {
      minLength: minLength(6)
    },
    confirm_password: {
      requiredIf: requiredIf('password'),
      sameAs: sameAs('password')
    },
  },
  async created() {
    this.name = (this.authUser as Admin).name;
  },
  metaInfo() {
    return {
      title: "My Profile",
    }
  }
})
</script>
