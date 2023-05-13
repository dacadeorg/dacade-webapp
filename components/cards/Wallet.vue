/* eslint-disable vue/no-v-html */
<template>
  <div class="relative mb-7">
    <div class="bg-gray-100 relative lg:flex md:flex sm:flex rounded-3.5xl">
      <EditAddress
        :wallet="details"
        :show="showEditModal"
        @close="showEditModal = false"
      />
      <Payout
        :wallet="details"
        :show="showPayoutModal"
        @close="showPayoutModal = false"
      />
      <div class="bg-gray-50 lg:w-60 md:w-60 sm:w-60 rounded-3.5xl">
        <div class="p-6">
          <div class="border-b border-dotted border-gray-900">
            <h1 class="text-2xl">
              {{ details.title }}
            </h1>
            <Tag :value="details.token" />
            <div class="text-right mb-4">
              <Coin size="medium" :token="details.token" />
            </div>
          </div>
          <div class="flex">
            <div class="w-1/2 pt-5 text-sm">
              <h1>{{ $t('profile.wallets.balance') }}</h1>
            </div>
            <div class="w-1/2 pt-3.5 text-right text-2xl font-medium">
              <h1>
                <Currency :value="details.balance" />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="px-7 pt-6 lg:w-96.5 md:w-8/12 sm:w-8/12 pb-24 lg:pb-24">
        <div
          v-if="cashable"
          class="xl:w-72 md:w-72 lg:w-full text-sm text-gray-700"
        >
          <p v-if="address" class="leading-5 text-sm">
            <span v-for="(part, k) in address" :key="k" class="mr-2">{{
              part
            }}</span>
          </p>
          <p v-else>{{ details.description }}</p>
        </div>
        <div v-if="cashable" class="text-gray-700 text-sm mt-3">
          <span
            class="cursor-pointer hover:underline"
            @click="showEditModal = true"
            >{{
              address
                ? $t('profile.wallets.address-change')
                : $t('profile.wallets.address-set')
            }}
          </span>
        </div>
        <div v-if="!cashable" class="prose">
          <p
            v-html="
              $t('profile.wallets.uncashable', {
                token: details.title,
                link: 'https://discord.gg/5yDZvVnpQQ',
              })
            "
          />
        </div>
        <div v-if="cashable" class="right-2 absolute bottom-2 mt-5">
          <ArrowButton
            :disabled="disabled || !details.balance || !details.address"
            type="outline-primary"
            min-width-class="min-w-40"
            @click="cashout"
          >
            {{ $t('profile.wallets.cash-out') }}
          </ArrowButton>
        </div>
      </div>
    </div>
    <Hint v-for="(payout, i) in details.payouts" :key="i" class="mt-2">
      <span class="font-medium"
        ><Currency :value="payout.amount" :token="payout.token"
      /></span>
      {{ $t('profile.wallet.payout.text') }}
    </Hint>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Coin from '@/components/ui/Coin'
import ArrowButton from '@/components/ui/button/Arrow'
import Tag from '@/components/ui/Tag'
import Currency from '@/components/ui/Currency'
import EditAddress from '@/components/sections/profile/modals/EditAddress'
import Payout from '@/components/sections/profile/modals/Payout.vue'
import Hint from '@/components/ui/Hint'

export default {
  name: 'Wallet',
  components: {
    Coin,
    ArrowButton,
    Tag,
    Currency,
    EditAddress,
    Payout,
    Hint,
  },
  props: {
    details: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showEditModal: false,
      showPayoutModal: false,
      showKycModal: false,
    }
  },
  computed: {
    ...mapGetters({
      isKycVerified: 'user/isKycVerified',
    }),
    address() {
      if (!this.details.address) return null
      return this.details.address.match(/.{1,4}/g)
    },
    cashable() {
      return String(this.details.token).toUpperCase() !== 'DAC'
    },
  },
  methods: {
    cashout() {
      if (this.isKycVerified || process.env.NUXT_ENV_KYC_VERIFICATION_ENABLED !== 'true') {
        this.showPayoutModal = true
        return
      }
      console.log('trigger kyc modal');
      this.$store.dispatch('kyc/openVerificationModal', {
        reasonText: this.$t('kyc.payout.reason'),
        completedActionText: this.$t('kyc.payout.button.completed'),
        completedAction: () => {
          this.showPayoutModal = true
        },
      });
    },
  },
}
</script>
