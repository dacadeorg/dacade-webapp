<template>
  <Modal :show="showModal" @close="closeModal">
    <div class="px-6 py-6">
      <div v-if="!verifying" class="text-left flex flex-col">
        <h1 class="text-.5xl leading-snug font-medium">
          Identity verification
        </h1>
        <p class="pt-8">
          {{ completed ? 'Congratulations you are now verified': 'To cashout, you need to verify your identity first.'}}
        </p>
      </div>
      <div v-show="verifying" id="sumsub-websdk-container" class="pb-5"></div>
    </div>
    <div class="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
      <span
        class="cursor-pointer text-sm font-medium text-primary"
        @click="closeModal"
      >{{ $t('profile.edit.close') }}</span
      >
      <ArrowButton v-if="!verifying" @click="startVerification" :loading="loading" :disabled="loading"
      >{{ completed ? 'Go to profile' : 'Start verification'}}
      </ArrowButton>
    </div>
  </Modal>
</template>

<script>
import {mapGetters} from "vuex";
import Modal from "~/components/ui/Modal.vue";
import ArrowButton from "~/components/ui/button/Arrow.vue";

export default {
  name: 'KYCVerificationPopup',
  components: {ArrowButton, Modal},
  data() {
    return {
      showSumsubModal: false,
      snsWebSdkInstance: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      sumsubToken: 'kyc/sumsubToken',
      isKycVerified: 'user/isKycVerified',
      showModal: 'kyc/showModal',
      loading: 'kyc/loading',
      verifying: 'kyc/verifying',
      completed: 'kyc/completed',
    }),
  },
  methods: {
    closeModal() {
      this.$store.dispatch('kyc/closeVerificationModal');
    },
    startVerification(){
      if(this.completed) return this.closeModal();
      this.$store.dispatch('kyc/launchWebSdk');
    },
  }
};
</script>
