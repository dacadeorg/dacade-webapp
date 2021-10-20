<template>
  <Modal>
    <div class="bg-white rounded-3.5xl p-7 w-5/12">
      <div class="flex justify-between mr-2">
        <h1 class="text-3xl mb-3 text-left">
          <div v-for="community in communities" :key="community.key">
            {{ community }}
          </div>
          {{ $t('modal.referral.bottom.ref-title') }}
          {{ $t('app.name') }}
        </h1>
        <button
          class="bg-gray-100 self-start mt-2 px-2.5 py-2.5"
          @click="close"
        >
          <Crossmark class="text-xl text-gray-600 w-6" />
        </button>
      </div>

      <div>
        <p class="text-xl text-left font-light mb-8 mr-8">
          {{ $t('modal.referral.bottom.ref-text-1') }}
          {{ user.displayName }}
          {{ $t('modal.referral.bottom.ref-text-2') }}
          {{ $t('modal.referral.bottom.ref-text-3') }}
        </p>
      </div>
      <div class="mr-8 mb-5 relative">
        <Input
          id="input-referral"
          name="referral"
          :placeholder="$t('modal.referral.link.placeholder')"
          :label="$t('modal.referral.link.label')"
          :value="form.referralLink"
          disabled
        />
        <div class="absolute top-0 right-0">
          <Button type="outline-primary" class="z-20 items-center mr-2 mt-4">
            copy
          </Button>
        </div>
      </div>
      <!-- <div class="relative flex bg-gray-200 mb-5"> -->
      <div class="mr-8 relative">
        <Input
          id="input-referral-2"
          name="referral"
          :placeholder="$t('modal.referral.code.placeholder')"
          :label="$t('modal.referral.code.label')"
          :value="form.referralCode"
          disabled
        />
        <div class="absolute top-0 right-0">
          <Button type="outline-primary" class="z-20 items-center mr-2 mt-4">
            copy
          </Button>
        </div>
      </div>
      <!-- </div> -->
      <div class="mr-8">
        <Referral
          v-for="referral in referrals"
          :key="referral.name"
          :referral="referral"
        />
      </div>
      <hr size="8px" color="black" />
      <p class="text-left pt-4 pb-8 mr-8">
        {{ $t('modal.referral.bottom.message') }}
      </p>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import Button from '@/components/ui/Button'
import Referral from '@/components/cards/Referral.vue'
import Input from '@/components/ui/Input'
import Crossmark from '~/assets/icons/crossmark-2.svg?inline'
import Modal from '@/components/popups/Modal'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Crossmark,
    Input,
    Referral,
    Modal,
    Button,
  },
  data() {
    return {
      form: {
        referralLink: 'https://www.dacade.org/invite/paul-123',
        referralCode: 'paul-123',
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      showReferral: 'ui/showReferralPopup',
    }),
    referrals() {
      return [
        {
          name: 'Celo Development 101',
          icon: '/img/communities/celo.svg',
          type: 'Referral',
          colors: {
            text: '#fff',
            accent: '#2E3337',
            textAccent: '#34b276',
            primary: '#35C07D',
          },
          reward: {
            amount: 25,
            token: 'cUSD',
          },
          url: 'https://forms.gle/PLjPugvJpj9m2Qn7A',
        },
        {
          name: 'Tezos Starter Course',
          image: '/img/communities/tacode.webp',
          type: 'Challenge',
          colors: {
            text: '#0D61FF',
            accent: '#0D61FF',
            textAccent: '#fff',
            primary: '#0D61FF',
          },
          reward: {
            amount: 12,
            token: 'tez',
          },
          url: 'https://tacode.dev/courses/dev-starter',
        },
      ]
    },
  },
  created() {
    this.$store.dispatch('user/wallets/all')
    this.$store.dispatch('user/reputations/all')
  },
  methods: {
    close() {
      if (this.showReferral) {
        this.$store.dispatch('ui/toggleShowReferralPopup', false)
      }
    },
  },
}
</script>
