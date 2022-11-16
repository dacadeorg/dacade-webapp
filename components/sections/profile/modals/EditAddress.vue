<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 pt-6 relative">
      <div class="mb-12">
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
        <Tag class="text-gray-500" :value="wallet.token"/>
      </div>
      <div v-if="currentAddress" class="mb-4">
        <p class="font-medium">Switch from: </p>
        <small>{{ currentAddress }}</small>
      </div>
      <div class="mb-4" :class="{'pb-16': !showInput}">
        <p class="font-medium">{{newAddressTitle}} </p>
      </div>
      <ValidationObserver ref="form" v-slot="{ passes }">
        <form class="flex flex-col space-y-4" @submit.prevent="passes(onSave)">
          <div v-if="showInput">
            <ValidationProvider v-slot="{ errors }" name="address" rules="required|min:2" mode="passive">
              <Input v-if="requireWalletConnection" :value="newAddress" required
                     :label="$t('profile.edit.label.account-address')" :error="errors[0]" disabled/>
              <Input v-else v-model="address" required :label="$t('profile.edit.label.account-address')"
                     :error="errors[0]" :disabled="requireWalletConnection"/>
            </ValidationProvider>
          </div>
          <ErrorBox v-if="error" :error="error"/>
          <div v-if="filled && currentAddress === newAddress">
            <p class="font-medium">New address matches the existing one</p>
          </div>
          <div class="flex pb-2 items-center justify-between pt-4">
            <span class="cursor-pointer text-sm font-medium text-primary" @click="$emit('close', true)">{{
                $t('profile.edit.close')
              }}</span>
            <ArrowButton v-if="requireWalletConnection && !newAddress" @click="connect" variant="button">
              Connect Wallet
            </ArrowButton>
            <ArrowButton v-else :loading="loading" :disabled="loading || !filled">{{
                $t('profile.edit.save')
              }}
            </ArrowButton>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import {mapGetters} from 'vuex'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Tag from '@/components/ui/Tag'
import ArrowButton from '@/components/ui/button/Arrow'
import ErrorBox from "~/components/ui/ErrorBox";

export default {
  name: 'EditProfile',
  components: {
    ErrorBox,
    Modal,
    Input,
    ArrowButton,
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
    }
  },
  methods: {
    async onSave() {
      this.loading = true
      this.error = null
      try {
        const signature = await this.retrieveSignature()
        await this.$store
          .dispatch('user/wallets/update', {
            id: this.wallet.id,
            address: this.newAddress,
            signature,
          });
        this.loading = false
        this.$emit('close', true)
      } catch (error) {
        this.loading = false
        this.error = error;
        if (error.details) {
          this.$refs.form.setErrors(error.details)
          console.log(error.details)
        }
      }
    },
    async retrieveSignature() {
      if (!this.requireWalletConnection) return null;
      return await this.$store.dispatch('wallet/getSignature');
    },
    async connect() {
      try {
        await this.$store.dispatch('wallet/connect');
      } catch (e) {
        console.log(e);
      }
    },
    disconnect() {
      this.$store.dispatch('wallet/disconnect');
    },
  },
  computed: {
    ...mapGetters({
      walletAddress: 'wallet/address',
    }),
    requireWalletConnection() {
      return this.wallet?.require_wallet_connection || false;
    },
    currentAddress() {
      return this.wallet?.address;
    },
    filled() {
      if (this.currentAddress === this.newAddress) return false;
      return !!this.newAddress;
    },
    newAddress() {
      if (this.requireWalletConnection) {
        return this.walletAddress?.toLowerCase();
      }
      return this.address?.toLowerCase();
    },
    showInput(){
      return (this.requireWalletConnection && this.newAddress) || !this.requireWalletConnection
    },
    newAddressTitle(){
      if(!this.requireWalletConnection && !this.currentAddress ){
        return  'Enter new address';
      }
      if(this.requireWalletConnection && !this.newAddress){
        return 'Connect a wallet to add a new address.'
      }
      if(this.requireWalletConnection && this.newAddress && !this.currentAddress){
        return 'New address';
      }
      return 'To:'
    }
  },
  watch: {
    newAddress(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.error = null;
    },
    show(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.error = null;
      this.loading = false;
      this.disconnect();
    }
  },
}
</script>
