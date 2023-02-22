<template>
  <div id="sumsub-websdk-container"></div>
</template>

<script>
import snsWebSdk from '@sumsub/websdk';
import {mapGetters} from "vuex";

export default {
  name: 'Sumsub',
  computed: {
    ...mapGetters({
      user: 'user/get',
      sumsubToken: 'user/sumsubToken',
    }),
  },
  async mounted() {
    await this.$store.dispatch('user/getSumsubToken');
    this.launchWebSdk(this.sumsubToken, this.user.email)
  },
  methods: {
    /**
     * @param accessToken - access token that you generated on the backend in Step 2
     * @param applicantEmail - applicant email (not required)
     * @param applicantPhone - applicant phone, if available (not required)
     * @param customI18nMessages - customized locale messages for current session (not required)
     */
    launchWebSdk(accessToken, applicantEmail, applicantPhone, customI18nMessages) {
      const snsWebSdkInstance = snsWebSdk.init(
        accessToken,
        // token update callback, must return Promise
        // Access token expired
        // get a new one and pass it to the callback to re-initiate the WebSDK
        () => this.getNewAccessToken()
      )
        .withConf({
          lang: 'en',
          email: applicantEmail,
          uiConf: {
            customCss: "https://url.com/styles.css"},
        })
        .withOptions({addViewportTag: false, adaptIframeHeight: true})
        .on('idCheck.applicantStatus', (payload) => {
          this.completeVerification(payload)
        })
        .build();

      // you are ready to go:
      // just launch the WebSDK by providing the container element for it
      snsWebSdkInstance.launch('#sumsub-websdk-container')
    },

    async getNewAccessToken() {
      // get a new access token from your backend
      const resp = await this.$api.post('users/sumsub/get-access-token', {refreshToken: this.refreshToken})
      const {token} = resp.data
      return token
    },

    completeVerification(payload) {
      const {reviewStatus, reviewResult} = payload
      if (reviewStatus === 'completed' && reviewResult?.reviewAnswer === 'GREEN') {
        // complete verification
        // delay for 2 seconds to allow the user to see the success message
        setTimeout(() => {
          this.$store.dispatch('user/completeSumSubVerification')
        }, 2000)
      }
    }
  },

};
</script>
