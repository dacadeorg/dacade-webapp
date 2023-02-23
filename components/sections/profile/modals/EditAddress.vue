<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 pt-6">
      <div class="pb-7">
        <p class="text-.5xl leading-snug font-medium">
          {{ wallet.title }}
        </p>
        <p class="text-.5xl font-medium text-gray-400 leading-snug">
          {{
            wallet.address
              ? $t('profile.wallets.change')
              : $t('profile.wallets.set')
          }}
          {{ $t('profile.wallets.address') }}
        </p>
        <Tag class="text-gray-500 mt-2" :value="wallet.token" />
      </div>
      <div v-if="showInput" class="flex flex-col space-y-1">
        <div v-if="currentAddress" class="flex">
          <p class="font-medium text-base">current address:</p>
          <a @click="showInput" class="font-medium cursor-pointer text-base ml-auto text-primary">
            Change address
          </a>
        </div>

        <p v-if="currentAddress" class="text-base">{{ currentAddress }}</p>
        <div class="pb-2">
          <p class="font-medium text-base">{{ newAddressTitle }}</p>
        </div>
      </div>

      <div v-else>
          <p class="font-medium text-base mb-5">
            How would you like to add your address?
          </p>
          <div
            @close="showEditAddress = true"
            class="border border-solid border-gray-400 rounded-xl"
          >
            <WalletButton @click="showEditAddress = true"
              >Enter address manually</WalletButton
            >
            <WalletButton
              @click="connect"
              class="border-t border-solid border-gray-400"
              >Connect a wallet</WalletButton
            >
          </div>
        </div>

    </div>
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form class="flex flex-col space-y-4" @submit.prevent="passes(onSave)">
        <div class="px-6">
          <ValidationProvider
            v-if="!showInput || showEditAddress === true"
            v-slot="{ errors }"
            name="address"
            rules="required|min:2"
            mode="passive"
          >
            <Input
              v-if="requireWalletConnection || showEditAddress === true"
              :value="newAddress"
              required
              :label="$t('profile.edit.label.account-address')"
              :error="errors[0]"
            />
            <Input
              v-else
              v-model="address"
              required
              :label="$t('profile.edit.label.account-address')"
              :error="errors[0]"
            />
          </ValidationProvider>

          <ErrorBox v-if="error" :error="error" />
          <div v-if="newAddress && currentAddress === newAddress" class="pt-4">
            <p class="text-base">New address matches the existing one</p>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
          <span
            class="cursor-pointer text-sm font-medium text-primary"
            @click="$emit('close', true)"
            >{{ $t('profile.edit.close') }}</span
          >
          <ArrowButton
            v-if="
              requireWalletConnection ||
              (showEditAddress === true && !newAddress)
            "
            variant="button"
            :disabled="loading || !filled"
            @click="connect"
          >
            Change address
          </ArrowButton>
          <ArrowButton v-else :loading="loading" :disabled="loading || !filled"
            >{{ $t('profile.edit.save') }}
          </ArrowButton>
        </div>
      </form>
    </ValidationObserver>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Tag from '@/components/ui/Tag'
import ArrowButton from '@/components/ui/button/Arrow'
import WalletButton from '@/components/ui/button/Wallet'
import ErrorBox from '~/components/ui/ErrorBox'

export default {
  name: 'EditProfile',
  components: {
    ErrorBox,
    Modal,
    Input,
    ArrowButton,
    WalletButton,
    Tag,
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
      address: '',
      loading: false,
      error: null,
      showEditModal: false,
      showEditAddress: false,
    }
  },

  computed: {
    ...mapGetters({
      walletAddress: 'wallet/address',
    }),
    requireWalletConnection() {
      return this.wallet?.require_wallet_connection || false
    },
    currentAddress() {
      return this.wallet?.address
    },
    filled() {
      if (this.currentAddress === this.newAddress) return false
      return !!this.newAddress
    },
    newAddress() {
      if (this.requireWalletConnection) {
        return this.walletAddress
      }
      return this.address
    },
    showInput() {
      return (
        (this.requireWalletConnection && this.newAddress) ||
        !this.requireWalletConnection
      )
    },
    newAddressTitle() {
      if (!this.requireWalletConnection && !this.currentAddress) {
        return 'Enter new address'
      }
      if (this.requireWalletConnection && !this.newAddress) {
        return 'Connect a wallet to add a new address.'
      }
      if (
        this.requireWalletConnection &&
        this.newAddress &&
        !this.currentAddress
      ) {
        return 'New address'
      }
      return 'To:'
    },
  },

  watch: {
    newAddress(newValue, oldValue) {
      if (newValue === oldValue) return
      this.error = null
    },
    show(newValue, oldValue) {
      if (newValue === oldValue) return
      this.error = null
      this.loading = false
      this.disconnect()
    },
  },

  methods: {
    async onSave() {
      this.loading = true
      this.error = null
      try {
        const signature = await this.retrieveSignature()
        await this.$store.dispatch('user/wallets/update', {
          id: this.wallet.id,
          address: this.newAddress,
          signature,
        })
        this.loading = false
        this.$emit('close', true)
      } catch (error) {
        this.loading = false
        this.error = error
        if (error.details) {
          this.$refs.form.setErrors(error.details)
          console.log(error.details)
        }
      }
    },
    async retrieveSignature() {
      if (!this.requireWalletConnection) return null
      return await this.$store.dispatch('wallet/getSignature')
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
  },
}
</script>
