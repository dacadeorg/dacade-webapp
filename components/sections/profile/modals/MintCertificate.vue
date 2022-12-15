<template>
  <Modal :show="show" size="medium">
    <div class="px-6 pt-6">
      <div class="pb-7">
        <p class="text-.5xl font-medium leading-snug">
          {{ $t('profile.mint.certificate') }}
        </p>
      </div>
      <div class="flex gap-5">
        <div class="">
          <AchievementCard :data="achievement" />
        </div>

        <div class="w-3/4 font-primary">
          <div
            v-if="error"
            class="bg-red-50 border mb-4 border-red-100 text-red-900 px-4 py-3 rounded-md relative w-full max-w-md flex"
            role="alert"
          >
            <span class="block sm:inline">
              An error coccured please try again.
            </span>
          </div>
          <p class="pb-4">
            This certificate is awarded for passing solidity development
            knowledge from the Solidity Development 101 course.
          </p>
          <div v-if="!connected" class="border-t border-gray-100 border-solid">
            <p class="pt-4">Minting this certificate will cost gas fees.</p>
            <input
              type="text"
              name="lname"
              placeholder="0x5c8Dc49dAb51aba3d5e3eb359089E1A411A8E036"
              class="block w-full rounded h-12 mt-6 text-sm text-slate-500"
            />
          </div>
          <div
            v-else
            class="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 w-full rounded px-3 py-0.5 inline-block"
          >
            <p class="font-bold">No wallet connected</p>
            <p>Please connect a wallet to mint the certificate.</p>
          </div>
        </div>
      </div>
      <div class="flex my-8 items-center justify-between">
        <a
          class="cursor-pointer text-sm font-medium text-primary"
          @click="$emit('close', true)"
          >Close</a
        >
        <ArrowButton type="primary">{{
          connected
            ? $t('profile.mint.certificate.button')
            : $t('profile.connect.wallet.button')
        }}</ArrowButton>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import AchievementCard from '~/components/cards/Achievement'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  name: 'MintCertificate',
  components: {
    Modal,
    AchievementCard,
    ArrowButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    wallet: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },

  data() {
    return {
      amount: 0,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      achievement: 'profile/certificates/current',
    }),
    connected() {
      return false
    },
  },

  methods: {
    close() {
      this.loading = true.close(() => {
        this.loading = false
        this.$emit('close', true)
      })
    },
  },
}
</script>
