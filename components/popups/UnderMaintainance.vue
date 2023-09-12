<template>
  <Modal :show="isOpen" @close="closeModal">

    <div class="px-6 py-6">
      <div class="text-left flex flex-col">
        <h1 class="text-.5xl leading-snug font-medium">
          Under Maintenance
        </h1>
        <p class="pt-8">
          There is currently an issue with the verification process. We are working with the verification platform, Sumsub, to resolve this as soon as possible. Please try again next time.
        </p>
      </div>
    <div class="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
      <span
        class="cursor-pointer text-sm font-medium text-primary"
        @click="closeModal"
      ></span
      >
      <ArrowButton
        @click="closeModal"
      >close
      </ArrowButton>
    </div>
    </div>
  </Modal>
</template>
<script>
import Modal from '~/components/ui/Modal.vue'
import ArrowButton from '~/components/ui/button/Arrow.vue'

export default {
  name: 'UnderMaintainancePopup',
  components: { ArrowButton, Modal },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
