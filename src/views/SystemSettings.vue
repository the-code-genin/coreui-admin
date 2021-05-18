<template>
  <CCard class="shadow-sm">
    <CCardHeader>
      <h1 class="h3">System Settings</h1>
    </CCardHeader>

    <CCardBody>
      <CForm>
        <!-- <CInput
          label="Facebook Link"
          description="Link to your facebook page."
          placeholder="Url"
          type="url"
          v-model.trim="$v.facebook_link.$model"
          :isValid="$v.facebook_link.$dirty ? !$v.facebook_link.$error : null"
          invalidFeedback="Link is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-link"/>
          </template>
        </CInput>

        <CInput
          label="Twitter Link"
          description="Link to your twitter profile."
          placeholder="Url"
          type="url"
          v-model.trim="$v.twitter_link.$model"
          :isValid="$v.twitter_link.$dirty ? !$v.twitter_link.$error : null"
          invalidFeedback="Link is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-link"/>
          </template>
        </CInput>

        <CInput
          label="LinkedIn Link"
          description="Link to your LinkedIn page/profile."
          placeholder="Url"
          type="url"
          v-model.trim="$v.linkedin_link.$model"
          :isValid="$v.linkedin_link.$dirty ? !$v.linkedin_link.$error : null"
          invalidFeedback="Link is required."
          :disabled="formStatus == 'SUBMITTING'"
        >
          <template #prepend-content>
            <CIcon name="cil-link"/>
          </template>
        </CInput> -->

        <div class="row mt-4" v-if="['FAILED', 'SUCCESS'].indexOf(formStatus) != -1 && formValid">
          <div class="col-md-12">
            <CAlert v-if="formStatus == 'SUCCESS'" color="success">
              <strong>Success!</strong> System settings updated.
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
// import {required, minLength, requiredIf, sameAs} from 'vuelidate/lib/validators'
// import SystemSetting from '@/models/system-setting';
// import systemSettings from '@/services/api/system-settings';

export default Vue.extend<any, any, any, any>({
  name: 'SystemSettings',
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.formStatus == 'SUBMITTING') return;
      this.formStatus = 'SUBMITTING';

      try {
        // let response = await systemSettings.update(this.formData);
        this.formStatus = 'SUCCESS';
      } catch (message) {
        this.formError = message;
        this.formStatus = 'FAILED';
      }
    }
  },
  data() {
    return {
      // facebook_link: '',
      // twitter_link: '',
      // linkedin_link: '',

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
        // 'facebook-link': this.facebook_link,
        // 'twitter-link': this.twitter_link,
        // 'linkedin-link': this.linkedin_link,
      }
    },
  },
  // validations: {
  //   facebook_link: {
  //     required
  //   },
  //   twitter_link: {
  //     required
  //   },
  //   linkedin_link: {
  //     required
  //   },
  // },
  async created() {
    try {
      // let settings = await systemSettings.getAll({is_public: 1});
      // let facebookLink = settings.find(setting => setting.key == 'facebook-link') as SystemSetting;
      // let twitterLink = settings.find(setting => setting.key == 'twitter-link') as SystemSetting;
      // let linkedinLink = settings.find(setting => setting.key == 'linkedin-link') as SystemSetting;

      // this.facebook_link = facebookLink.value;
      // this.twitter_link = twitterLink.value;
      // this.linkedin_link = linkedinLink.value;
    } catch(e) {
      this.formStatus = 'FAILED';
      this.formError = 'An error occured while contacting the server.';
    }
  },
  metaInfo() {
    return {
      title: "System Settings",
    }
  }
})
</script>
