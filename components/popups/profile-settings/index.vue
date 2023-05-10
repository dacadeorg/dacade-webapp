<template>
  <Modal v-if="user" :show="showPopup" size="small" @close="close">
    <div class="w-full p-7 relative">
      <NamesForm v-if="formType === 'names'" @close="close" />
      <EmailForm v-if="formType === 'email'" @close="close" />
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import NamesForm from './NamesForm'
import EmailForm from './EmailForm'
import Modal from '@/components/ui/Modal'

export default {
  name: 'SettingsProfile',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Modal,
    NamesForm,
    EmailForm,
  },
  props: {
    showPopup: {
      default: false,
      type: Boolean,
    },
    formType: {
      default: 'names',
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
