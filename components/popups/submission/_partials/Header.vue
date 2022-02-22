<template>
  <div
    class="
      flex
      justify-between
      items-center
      border-b border-solid border-gray-200
    "
  >
    <div
      class="text-left pl-5 flex items-center space-x-6 cursor-pointer"
      @click="close"
    >
      <ArrowLeftIcon class="block" />
      <span class="text-lg font-medium bloc">{{
        $t('communities.submissions')
      }}</span>
    </div>
    <div class="p-2">
      <button class="bg-gray-100 self-start px-2.5 py-2.5" @click="close">
        <Crossmark class="text-xl text-gray-600 w-6" />
      </button>
    </div>
  </div>
</template>
<script>
import Crossmark from '~/assets/icons/crossmark-2.svg?inline'
import ArrowLeftIcon from '~/assets/icons/arrow-left.svg?inline'
export default {
  name: 'SubmissionPopup',
  components: {
    Crossmark,
    ArrowLeftIcon,
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
