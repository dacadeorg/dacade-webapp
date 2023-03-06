<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 relative pb-7">
      <p class="font-medium text-.5xl pb-6 pt-6">Identity verification</p>

      <div v-if="success">
        <span class=""
          >To cashout, you need to verify your identity first.</span
        >
      </div>
      <div
        v-else
        class="text-green-700 bg-green-100 p-3 border border-solid border-green-200 rounded"
      >
        <span>Identity has been verified</span>
      </div>
    </div>
    <div class="flex pl-6 pr-2 pb-2 items-center justify-between">
      <span
        class="cursor-pointer text-sm font-medium text-primary"
        @click="$emit('close', true)"
        >{{ $t('profile.edit.close') }}</span
      >
      <ArrowButton
        :loading="loading"
        :disabled="loading"
        type="outline-primary"
        @click="save"
        >Start verification
      </ArrowButton>
    </div>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  name: 'KycVerification',
  components: {
    Modal,
    ArrowButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      success: false,
    }
  },
}
</script>
