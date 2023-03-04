<template>
  <Modal :show="show" size="medium">
    <div class="px-6 pt-6">
      <div class="pb-7">
        <p class="text-.5xl font-medium leading-snug">
          {{ $t('profile.mint.certificate') }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-5">
        <div class="w-2/3 md:w-1/3 2xl:w-1/4 flex-none mx-auto md:mx-0">
          <AchievementCard :data="achievement" minting />
        </div>

        <div class="flex-1 font-primary">
          <ErrorBox v-if="error" class="my-4" :error="error" />
          <div v-if="minted" class="flex flex-col gap-3">
            <div
              class="text-green-700 bg-green-100 p-3 border border-solid border-green-200 rounded"
            >
              <p>Your NFT has been successfully minted on chain</p>
            </div>
            <div class="px-3.5 py-2.5 border border-solid rounded">
              <p>Transaction ID</p>
              <p class="text-gray-400">
                <a
                  :href="txURL"
                  target="_blank"
                  class="underline cursor-pointer"
                  >{{ txData?.tx }}</a
                >
              </p>
            </div>
          </div>
          <div v-if="!minted">
            <p class="pb-4 pt-3">
              This certificate is awarded for passing the
              {{ achievement?.metadata?.name }} course.
            </p>
            <div
              v-if="!connected"
              class="border-t border-gray-100 border-solid"
            >
              <p class="pt-4">
                Minting this certificate will not cost you gas fees.
              </p>
              <Input
                :value="address"
                placeholder="Wallet address"
                input-class="h-12 mt-6 text-sm text-slate-500"
                font-size="sm"
                required
                disabled
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
      </div>
      <div class="flex my-8 items-center justify-between">
        <a
          class="cursor-pointer text-sm font-medium text-primary"
          @click="close"
          >Close</a
        >
        <ArrowButton
          v-if="!minted"
          :loading="loading"
          :disabled="loading"
          type="primary"
          @click="handleSave"
          >{{ $t(buttonText) }}
        </ArrowButton>
        <ArrowButton v-else link="/profile" type="primary"
          >{{ $t('profile.mint.certificate.profile.button') }}
        </ArrowButton>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import AchievementCard from '~/components/cards/Achievement'

import ArrowButton from '@/components/ui/button/Arrow'
import ErrorBox from '~/components/ui/ErrorBox'
import Input from '~/components/ui/Input.vue'

export default {
  name: 'MintCertificate',
  components: {
    Modal,
    AchievementCard,
    ArrowButton,
    ErrorBox,
    Input,
  },
  props: {
    show: {
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
      error: '',
      txData: '',
    }
  },
  computed: {
    ...mapGetters({
      achievement: 'profile/certificates/current',
      walletAddress: 'wallet/address',
    }),
    connected() {
      return false
    },
    address() {
      return this.walletAddress?.toLowerCase()
    },
    minted() {
      return !!this.txData?.tx
    },
    txURL() {
      return `${process.env.NUXT_ENV_BLOCK_EXPLORER_URL}/tx/${this.txData?.tx}`
    },
    buttonText() {
      if (!this.address) return 'profile.connect.wallet.button'
      if (this.loading) return 'profile.mint.certificate.button.loading'
      return 'profile.mint.certificate.button'
    },
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue === oldValue) return
      this.error = null
      this.loading = false
      this.disconnect()
    },
    achievement(newValue) {
      this.txData = newValue.minting
    },
  },
  mounted() {
    this.txData = this.achievement?.minting
  },
  methods: {
    close() {
      this.loading = false
      this.$emit('close', true)
    },
    async onSave() {
      if (this.loading) return
      this.loading = true
      this.error = null
      try {
        const signature = await this.$store.dispatch('wallet/getSignature')
        const data = await this.$store.dispatch('profile/certificates/mint', {
          id: this.achievement.id,
          address: this.address,
          signature,
        })
        this.txData = data.txData
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async connect() {
      try {
        await this.$store.dispatch('wallet/connect')
      } catch (e) {
        console.log(e)
      }
    },
    disconnect() {
      this.$store.dispatch('wallet/disconnect')
    },
    handleSave() {
      if (!this.address) return this.connect()
      this.onSave()
    },
  },
}
</script>
