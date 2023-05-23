<template>
  <!-- In the process of converting to react make sure to refactor this component and reduce complexity -->
  <Modal :show="show" @close="closeModal()">
    <div class="px-6 pt-6">
      <WalletHeader :wallet="wallet" />

      <!--   display wallet modal when showWalletConnectionMethod is true   -->
      <div v-if="showWalletConnectionMethod">
        <p class="font-medium text-base mb-5">
          {{ $t('profile.edit.wallet.select.title') }}
        </p>
        <div class="border border-solid border-gray-400 rounded-xl divide-y overflow-hidden">
          <WalletButton @click="setConnectionMethod('manual')">
            {{ $t('profile.edit.wallet.select.option.manual') }}
          </WalletButton>

          <WalletButton v-if="requireWalletConnection" @click="setConnectionMethod('wallet')">
            {{ $t('profile.edit.wallet.select.option.connect') }}
          </WalletButton>
        </div>
      </div>

      <!--   display manual address update  -->
      <div v-if="!showWalletConnectionMethod" class="flex flex-col space-y-3">
        <div v-if="currentAddress" class="flex">
          <!--    display text based on show edit address      -->
          <p class="font-medium text-base">
            {{ $t('profile.edit.wallet.current.address') }}:
          </p>
          <a class="font-medium cursor-pointer text-base ml-auto text-primary" @click="openEditAddress()">
            {{ $t('profile.edit.wallet.button.change') }}
          </a>
        </div>

        <div class="block">
          <p v-if="currentAddress" class="text-base mb-3 font-mono text-gray-700">
            {{ currentAddress }}
          </p>
          <div v-if="showForm" class="pb-2">
            <p class="font-medium text-base">{{ newAddressTitle }}:</p>
          </div>
        </div>
      </div>
    </div>
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form class="flex flex-col space-y-4" @submit.prevent="passes(onSave)">
        <div class="px-6">
          <ValidationProvider v-if="showForm" v-slot="{ errors }" mode="passive" name="address" rules="required|min:2">
            <Input v-model="addressInput" input-class="font-mono text-gray-700" :error="errors[0]" :label="$t('profile.edit.label.account-address')"
              :disabled="!isManualConnectionMethod" required />
            <div v-if="isMatchingTheExistingOne" class="pt-4">
              <p class="text-base">{{ $t('profile.edit.wallet.error.matches-existing') }}</p>
            </div>
          </ValidationProvider>

          <ErrorBox v-if="error" :error="error" />
        </div>
        <div class="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
          <span class="cursor-pointer text-sm font-medium text-primary" @click="closeModal()">{{ $t('profile.edit.close')
          }}</span>
          <ArrowButton :disabled="loading || !filled" :loading="loading" @click="onSave">{{ getChangeAddressText }}
          </ArrowButton>
        </div>
      </form>
    </ValidationObserver>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapGetters } from 'vuex'
import WalletButton from './_partials/Wallet.vue'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import ArrowButton from '@/components/ui/button/Arrow'
import ErrorBox from '~/components/ui/ErrorBox'
import WalletHeader from '~/components/sections/profile/WalletHeader.vue'
import { validateAddress } from '~/utilities/Address'

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
      if (this.isMatchingTheExistingOne) return false
      if (this.connectionMethod === 'wallet')
        return validateAddress(this.newAddress, this.wallet.token)
      return validateAddress(this.address, this.wallet.token)
    },
    newAddress() {
      if (this.connectionMethod === 'wallet') {
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
        return this.$t('profile.edit.wallet.input.label.manual')
      }
      return this.$t('profile.edit.wallet.input.label.connect')
    },
    isManualConnectionMethod() {
      return this.connectionMethod === 'manual'
    },
    getChangeAddressText() {
      if (this.filled || !this.currentAddress) return this.$t('profile.edit.wallet.button.save-address');
      return this.$t('profile.edit.wallet.button.change-address');
    },
    isMatchingTheExistingOne() {
      if (!this.newAddress || !this.currentAddress) return false
      return (
        this.currentAddress?.toLowerCase() === this.newAddress?.toLowerCase()
      )
    },
    addressInput: {
      get() {
        if (!this.isManualConnectionMethod) return this.newAddress
        return this.address
      },
      set(value) {
        if (!this.isManualConnectionMethod) return
        this.address = value
      },
    },
    showForm() {
      return this.showEditAddress && !this.showWalletConnectionMethod && this.connectionMethod
    },
  },
  watch: {
    newAddress(newValue, oldValue) {
      if (newValue === oldValue) return
      this.error = null
    },
    show(newValue, oldValue) {
      if (newValue === oldValue) return
      this.initForm()
      this.disconnect()
    },
  },
  mounted() {
    this.initForm();
  },
  methods: {
    async onSave() {
      this.loading = true
      this.error = null

      try {
        await this.$store.dispatch('user/wallets/update', {
          id: this.wallet.id,
          address: this.newAddress || this.address,
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
        this.openEditAddress()
      }
    },
    disconnect() {
      this.$store.dispatch('wallet/disconnect')
    },
    openEditAddress() {
      this.showWalletConnectionMethod = true
      this.showEditAddress = true
      this.connectionMethod = 'manual'
    },
    async setConnectionMethod(method) {
      if (!method) return

      if (method === 'wallet' && !this.requireWalletConnection) return;

      if (this.isWalletConnected) {
        await this.$store.dispatch('wallet/disconnect')
      }

      this.showWalletConnectionMethod = false
      this.connectionMethod = method
      this.showEditAddress = true
      if (method === 'wallet') {
        this.showWalletInfo = false
        return this.connect()
      }
      this.showWalletInfo = true
    },
    clearState() {
      this.showEditModal = false
      this.showEditAddress = false
      this.connectionMethod = ''
      this.showWalletConnectionMethod = false
      this.showWalletInfo = false
      this.address = ''
    },
    closeModal() {
      this.clearState()
      this.$emit('close', true)
    },
    initForm() {
      this.error = null
      this.loading = false

      if (this.currentAddress) {
        this.showWalletInfo = true
        return
      }
      this.showWalletConnectionMethod = true
    }
  },
}
</script>
