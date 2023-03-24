<template>
  <Modal :show="show" @close="closeModal()">
    <div class="px-6 pt-6">

      <WalletHeader :wallet="wallet"/>

      <!--   display wallet modal when showWalletConnectionMethod is true   -->
      <div v-if="showWalletConnectionMethod">
        <p class="font-medium text-base mb-5">
          How would you like to add your address?
        </p>
        <div
          class="border border-solid border-gray-400 rounded-xl divide-y"
        >

          <WalletButton @click="setConnectionMethod('manual')"
          >Enter address manually
          </WalletButton
          >

          <WalletButton
            @click="setConnectionMethod('wallet')"
          >Connect a wallet
          </WalletButton
          >

        </div>
      </div>

      <!--   display wallet modal end   -->


      <!--   display manual address update  -->
      <div v-if="showWalletInfo && !showWalletConnectionMethod" class="flex flex-col space-y-3">
        <div class="flex">

          <!--    display text based on show edit address      -->
          <p v-if="currentAddress" class="font-medium text-base">Current Address:</p>
          <p v-else class="font-medium text-base">Enter Address:</p>

          <a
            v-if="currentAddress"
            class="font-medium cursor-pointer text-base ml-auto text-primary" @click="openEditAddress()">
            Change
          </a>
        </div>

        <!--     display current address when not editting address -->
        <p v-if="currentAddress && !showWalletConnectionMethod" class="text-base mb-3">{{ currentAddress }}</p>

        <div v-if="currentAddress  " class="pb-2">
          <p class="font-medium text-base">{{ newAddressTitle }}</p>
        </div>

      </div>


    </div>
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form class="flex flex-col space-y-4" @submit.prevent="passes(onSave)">
        <div class="px-6">
          <ValidationProvider
            v-if="showEditAddress && !showWalletConnectionMethod"
            v-slot="{ errors }"
            mode="passive"
            name="address"
            rules="required|min:2"
          >
            <div v-if="connectionMethod">
              <Input
                v-if="connectionMethod === 'wallet'"
                :error="errors[0]"
                :label="$t('profile.edit.label.account-address')"
                :value="newAddress"
                disabled
                required
              />
              <Input
                v-if="connectionMethod === 'manual'"
                v-model="address"
                :error="errors[0]"
                :label="$t('profile.edit.label.account-address')"
                required
              />
            </div>

            <!--    display when user connects via wallet   -->
            <p v-if="isWalletConnected && !currentAddress" class="text-base mb-3">{{ newAddress }}</p>

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
          >{{ getChangeAddressText }}
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
      showWalletConnectionMethod: false,
      showWalletInfo: false,
      connectionMethod: '',
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
      if (this.connectionMethod === 'wallet') return Boolean(this.newAddress)
      return Boolean(this.address)
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
      if (this.connectionMethod === 'manual') {
        return 'Enter new address'
      }
      if (this.connectionMethod === 'wallet') {
        return 'New address'
      }
      if (
        this.requireWalletConnection &&
        this.isFirstTimeAddressSetup
      ) {
        return 'New address'
      }
      return ''
    },

    // shouldDisplayEditAddress() {
    //   console.log("connection methid ", this.connectionMethod)
    //   // if user has not connected address, display enter address or connect modal
    //   return this.connectionMethod === 'manual'
    // },
    getChangeAddressText() {
      return this.filled ? 'Save Address' : 'Change address'
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

      if (this.currentAddress) {
        this.showWalletInfo = true
        return
      }

      if (this.requireWalletConnection) {
        this.showWalletConnectionMethod = true
        return
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
        this.showEditAddress = true

      } catch (e) {
        console.log(e)
      }
    },
    disconnect() {
      this.$store.dispatch('wallet/disconnect')
    },
    openEditAddress() {
      if (this.requireWalletConnection) {
        this.showWalletConnectionMethod = true
        return
      }

      this.showEditAddress = true
      this.connectionMethod = 'manual'

    },
    setConnectionMethod(method) {

      if (!method) return

      if (this.isWalletConnected) {
        this.$store.dispatch('wallet/clearAddress')
      }

      this.showWalletConnectionMethod = false
      this.connectionMethod = method
      this.showEditAddress = true
      switch (method) {
        case  'wallet':
          this.connect()
          break

        case 'manual':
          this.showWalletInfo = true
          break

        default:
          break

      }

    },
    clearState() {
      this.showEditModal = false
      this.showEditAddress = false
      this.connectionMethod = ''
      this.showWalletConnectionMethod = false
      this.showWalletInfo = false
    },
    closeModal() {
      this.clearState()
      this.$emit('close', true)
    },
  },
}
</script>
