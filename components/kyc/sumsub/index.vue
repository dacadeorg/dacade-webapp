<template>
  <div class="py-7">
    <Button
      :disabled="isUserVerified"
      type="outline-primary"
      class="flex mx-auto text-base"
      @click="openKycModal"
    >
      {{ getVerificationStatus() }}
    </Button>

  <Modal v-show="canShowKycModal" :show="true" size="medium">
    <div id="sumsub-websdk-container"></div>

    <Button
      class="-ml-4 font-semibold border-none!"
      type="outline-primary"
      @click="closeKycModal"
    >
      {{ $t('profile.header.discord.close') }}
    </Button>
  </Modal>
  </div>
</template>

<script>
import snsWebSdk from '@sumsub/websdk';
import {mapGetters} from "vuex";
import Modal from "~/components/ui/Modal.vue";

export default {
  name: 'Sumsub',
  components: {Modal},
  data() {
    return {
      showSumsubModal: false,
      snsWebSdkInstance: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      sumsubToken: 'user/sumsubToken',
    }),
    isUserVerified() {
      return this.user?.kycStatus === 'VERIFIED'
    },
    canShowKycModal() {
      return !this.isUserVerified && this.showSumsubModal
    },
  },
  async mounted() {
    if(this.isUserVerified) return
    await this.$store.dispatch('user/getSumsubToken');
  },
  methods: {
    /**
     * @param accessToken - access token that you generated on the backend in Step 2
     * @param applicantEmail - applicant email (not required)
     * @param applicantPhone - applicant phone, if available (not required)
     * @param customI18nMessages - customized locale messages for current session (not required)
     */
    launchWebSdk(accessToken, applicantEmail, applicantPhone, customI18nMessages) {
      this.snsWebSdkInstance = snsWebSdk.init(
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
      this.snsWebSdkInstance.launch('#sumsub-websdk-container')
    },

    async getNewAccessToken() {
      // get a new access token from your backend
      const resp = await this.$api.post('users/sumsub/get-access-token')
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
          this.closeKycModal()
        }, 2000)
      }
    },

    openKycModal() {
      this.showSumsubModal = true
      this.launchWebSdk(this.sumsubToken, this.user.email)
    },
    closeKycModal() {
      this.showSumsubModal = false
      this.snsWebSdkInstance?.destroy()
    },
    getVerificationStatus() {
      if (this.isUserVerified) {
        return this.$t('profile.header.sumsub.verified')
      }
      return this.$t('profile.header.sumsub.verify')
    },
  },


};
</script>
