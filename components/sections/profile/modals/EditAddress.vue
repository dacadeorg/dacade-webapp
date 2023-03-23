<template>
  <Modal :show="show" @close="closeModal()">
    <div class="px-6 pt-6">

      <WalletHeader :wallet="wallet" />

      <!--   display manual address update  -->
      <div v-if="shouldDisplayEditAddress" class="flex flex-col space-y-3">
        <div class="flex">

          <!--    display text based on show edit address      -->
          <p v-if="currentAddress" class="font-medium text-base">Current Address:</p>
          <p v-else class="font-medium text-base">Enter Address:</p>

          <a v-if="!showEditAddress || isWalletConnected"
             class="font-medium cursor-pointer text-base ml-auto text-primary" @click="openEditAddress()">
            Change
          </a>
        </div>

        <!--     display current address when not editting address -->
        <p v-if="currentAddress" class="text-base mb-3">{{ currentAddress }}</p>

        <div v-else class="pb-2">
          <p class="font-medium text-base">{{ newAddressTitle }}</p>
        </div>

        <!--    display uneditable field when user connects with wallet   -->
        <p v-if="currentAddress && showEditAddress && !isWalletConnected" class="font-medium text-base pb-2">
          {{ getChangeAddressText }}</p>
        <p v-if="isWalletConnected && !isFirstTimeAddressSetup" class="font-medium text-base pb-2">New address</p>

      </div>

      <!--   display manual address update end   -->


      <!--   display wallet modal when showWalletConnect is true   -->

      <div v-if="showWalletConnect">
        <p class="font-medium text-base mb-5">
          How would you like to add your address?
        </p>
        <div
          class="border border-solid border-gray-400 rounded-xl divide-y"
        >

          <WalletButton @click="closeShowWalletConnect()"
          >Enter address manually
          </WalletButton
          >

          <WalletButton
            @click="connect"
          >Connect a wallet
          </WalletButton
          >

        </div>
      </div>

      <!--   display wallet modal end   -->


    </div>
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form class="flex flex-col space-y-4" @submit.prevent="passes(onSave)">
        <div class="px-6">
          <ValidationProvider
            v-if="shouldDisplayEditAddress && showEditAddress "
            v-slot="{ errors }"
            mode="passive"
            name="address"
            rules="required|min:2"
          >
            <div v-if="!isWalletConnected">
              <Input
                v-if="requireWalletConnection"
                :error="errors[0]"
                :label="$t('profile.edit.label.account-address')"
                :value="newAddress"
                required
              />
              <Input
                v-else
                v-model="address"
                :error="errors[0]"
                :label="$t('profile.edit.label.account-address')"
                required
              />
            </div>

            <!--    display when user connects via wallet   -->
            <p v-if="isWalletConnected && currentAddress" class="text-base mb-3">{{ newAddress }}</p>

            <!--    display when user first time address setup    -->
            <Input
              v-if="isFirstTimeAddressSetup && isWalletConnected"
              v-model="newAddress"
              :error="errors[0]"
              :label="$t('profile.edit.label.account-address')"
              disabled
              required
            />
          </ValidationProvider>

          <ErrorBox v-if="error" :error="error"/>
          <div v-if="newAddress && currentAddress === newAddress" class="pt-4">
            <p class="text-base">New address matches the existing one</p>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
          <span
            class="cursor-pointer text-sm font-medium text-primary"
            @click="closeModal()"
          >{{ $t('profile.edit.close') }}</span
          >
          <ArrowButton
            v-if="requireWalletConnection && !newAddress && !showEditAddress"
            variant="button"
            @click="connect"
          >
            Change address
          </ArrowButton>
          <ArrowButton v-else :disabled="loading || !filled" :loading="loading" @click="onSave"
          >{{ $t('profile.edit.save') }}
          </ArrowButton>
        </div>
      </form>
    </ValidationObserver>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import {mapGetters} from 'vuex'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import ArrowButton from '@/components/ui/button/Arrow'
import WalletButton from '@/components/ui/button/Wallet'
import ErrorBox from '~/components/ui/ErrorBox'
import WalletHeader from "~/components/sections/profile/WalletHeader.vue";

export default {
  name: 'EditProfile',
  components: {
    WalletHeader,
    ErrorBox,
    Modal,
    Input,
    ArrowButton,
    WalletButton,
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
      showWalletConnect: false,
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
      return Boolean(this.newAddress || this.address)
    },
    newAddress() {
      if (this.requireWalletConnection) {
        return this.walletAddress
      }
      return this.address
    },
    isWalletConnected() {
      return this.requireWalletConnection && !!this.walletAddress
    },
    isFirstTimeAddressSetup() {
      return Boolean(!this.currentAddress && this.newAddress)
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
        this.isFirstTimeAddressSetup
      ) {
        return 'New address'
      }
      return 'To:'
    },

    shouldDisplayEditAddress() {
      // if user has not connected address, display enter address or connect modal
      return !this.showWalletConnect
    },
    getChangeAddressText() {
      return this.filled ? 'New address' : 'Enter new address'
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

      // enable edit address workflow for users who have not connected address
      if (!this.currentAddress) {
        if (this.requireWalletConnection) {
          this.showWalletConnect = true
          this.showEditAddress = false
          return
        }

        this.showWalletConnect = false
        this.showEditAddress = true
      }
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
          address: this.newAddress || this.address,
          signature,
        })
        this.$emit('close', true)
      } catch (error) {
        this.error = error

        if (error.details) {
          this.$refs.form.setErrors(error.details)
        }

      } finally {
        this.loading = false
      }
    },
    async retrieveSignature() {
      if (!this.requireWalletConnection || this.showEditAddress) return null
      return await this.$store.dispatch('wallet/getSignature')
    },
    async connect() {
      try {
        await this.$store.dispatch('wallet/connect')
        this.showWalletConnect = false
        this.showEditAddress = true

      } catch (e) {
        console.log(e)
      }
    },
    disconnect() {
      this.$store.dispatch('wallet/disconnect')
    },
    openEditAddress() {
      if (this.isWalletConnected) {
        this.$store.dispatch('wallet/clearAddress')
      }
      if (this.requireWalletConnection) {
        this.showEditAddress = false
        this.showWalletConnect = true
        return
      }

      this.showEditAddress = true
      this.showWalletConnect = false

    },
    closeShowWalletConnect() {
      if (this.isWalletConnected) {
        this.$store.dispatch('wallet/clearAddress')
      }
      this.showWalletConnect = false
      this.showEditAddress = true
    },
    clearState() {
      this.showEditModal = false
      this.showEditAddress = false
    },
    closeModal() {
      this.clearState()
      this.$emit('close', true)
    },
  },
}
</script>
