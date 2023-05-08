<!-- <template>
    <Modal v-if="user" :show="showInformation" @close="close">
      <div class="w-full p-7 relative">

        <h1 class="text-xl md:text-3xl mr-3 mb-3 text-left">
          {{ $t('profile.edit.label.change-name') }}
        </h1>

        <div>{{ $t('profile.edit.label.first-name') }}</div>
        <div>{{ $t('profile.edit.label.last-name') }}</div>

        <button
          class="bg-gray-100 self-start px-2.5 py-2.5 absolute top-2 right-2"
          @click="close"
        >
          <Crossmark class="text-xl text-gray-600 w-6" />
        </button>
      </div>
    </Modal>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import vClickOutside from 'v-click-outside'
  import Crossmark from '~/assets/icons/crossmark-2.svg?inline'
  import Modal from '@/components/ui/Modal'
  
  export default {
    name: 'ReferralPopup',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    components: {
      Crossmark,
      Modal,

    },
    computed: {
      ...mapGetters({
        user: 'user/get',
        showInformation: 'ui/showInformationPopup',
      }),
    },
    methods: {
      close() {
        if (this.showInformation) {
          this.$store.dispatch('ui/toggleShowInformationPopup', false)
        }
      },
    },
  }
  </script>
   -->