<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 pt-6 relative">
      <div class="mb-6">
        <p class="text-.5xl leading-snug font-medium">
          {{ wallet.title }}
        </p>
        <p class="text-.5xl font-medium text-gray-400 leading-snug">
          Payout request
        </p>
        <Tag class="text-gray-500" :value="wallet.token" />
      </div>
      <div class="border-b border-dotted">
        <div class="text-right mb-4">
          <Coin size="medium" :token="wallet.token" />
        </div>
      </div>
      <div class="flex mb-8">
        <div class="w-1/2 pt-5 text-sm">
          <h1>Amount</h1>
        </div>
        <div class="w-1/2 pt-3.5 text-right text-2xl font-medium">
          <h1>
            <Currency :value="wallet.balance" />
          </h1>
        </div>
      </div>
      <div class="flex pb-2 items-center justify-between">
        <span
          class="cursor-pointer text-sm font-medium text-primary"
          @click="$emit('close', true)"
          >{{ $t('profile.edit.close') }}</span
        >
        <Button
          :loading="loading"
          :padding="false"
          :disabled="loading"
          class="pl-5 pr-0"
          type="outline-primary"
          @click="save"
          >Send request
          <span class="inline-block mr-3.5 ml-4 align-middle">
            <ArrowRightIcon v-if="!loading" />
            <Spinner v-else class="animate-spin"
          /></span>
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Coin from '@/components/ui/Coin'
import Currency from '@/components/ui/Currency'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
import Spinner from '~/assets/icons/spinner.svg?inline'

export default {
  name: 'EditProfile',
  components: {
    Modal,
    Button,
    ArrowRightIcon,
    Spinner,
    Tag,
    Coin,
    Currency,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      amount: 0,
      loading: false,
    }
  },
  methods: {
    save() {
      this.loading = true
      this.$store
        .dispatch('user/payouts/create', {
          wallet_id: this.wallet.id,
        })
        .then(() => {
          this.loading = false
          this.$emit('close', true)
        })
        .catch((error) => {
          this.loading = false
          if (error.details) {
            this.$refs.form.setErrors(error.details)
          }
        })
    },
  },
}
</script>
