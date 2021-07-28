<template>
  <CCard class="shadow-sm">
    <CCardHeader>
      <h1 class="h3">Edit Admin</h1>
    </CCardHeader>

    <CCardBody v-if="admin != null">
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

        <CSelect
          label="Status"
          placeholder="Please select a valid status"
          :options="[{value: 'active', label: 'Active'}, {value: 'banned', label: 'Banned'}]"
          :value.sync="$v.status.$model"
          :isValid="$v.status.$dirty ? !$v.status.$error : null"
          invalidFeedback="Status is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-user"/>
          </template>
        </CSelect>

        <div class="row mt-4" v-if="['FAILED', 'SUCCESS'].indexOf(formStatus) != -1 && formValid">
          <div class="col-md-12">
            <CAlert v-if="formStatus == 'SUCCESS'" color="success">
              <strong>Success!</strong> Admin updated.
            </CAlert>

            <CAlert v-else color="danger">
              <strong>An error occured!</strong> {{ formError }}
            </CAlert>
          </div>
        </div>
      </CForm>
    </CCardBody>
    
    <CCardFooter v-if="admin != null" align="right">
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
import {required} from 'vuelidate/lib/validators'
import users from '@/services/api/users'

export default Vue.extend<any, any, any, any>({
  name: 'EditAdmin',
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.formStatus == 'SUBMITTING') return;
      this.formStatus = 'SUBMITTING';

      try {
        let response = await users.update(this.admin.id, this.formData);
        this.formStatus = 'SUCCESS';
      } catch (message) {
        this.formError = "An error occured";
        this.formStatus = 'FAILED';
      }
    }
  },
  data() {
    return {
      admin: null,
      name: '',
      status: '',

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
        status: this.status,
      };
    },
  },
  validations: {
    name: {
      required
    },
    status: {
      required
    },
  },
  async created() {
    let adminId = this.$route.params.id;
    if (adminId == null) this.$router.push('/404');

    try {
      let admin = await users.get(adminId);
      this.admin = admin;

      this.$v.name.$model = admin.name;
      this.$v.status.$model = admin.status;
    } catch(e) {
      console.log(e);
      this.$router.push('/404');
    }
  },
  metaInfo() {
    return {
      title: "Edit Admin",
    }
  }
})
</script>
