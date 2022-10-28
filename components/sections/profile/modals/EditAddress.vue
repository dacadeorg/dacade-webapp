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
        <p class="font-medium">Current: </p>
        <small>{{ currentAddress }}</small>
      </div>
      <div v-if="requireWalletConnection" class="mb-4">
        <WalletConnect/>
      </div>
      <ValidationObserver ref="form" v-slot="{ passes }">
        <form @submit.prevent="passes(onSave)">
          <div class="mb-8">
            <ValidationProvider
              v-slot="{ errors }"
              name="address"
              rules="required|min:2"
              mode="passive"
            >
              <Input
                v-if="requireWalletConnection"
                :value="walletAddress"
                required
                :label="$t('profile.edit.label.account-address')"
                :error="errors[0]"
                disabled
              />
              <Input
                v-else
                v-model="address"
                required
                :label="$t('profile.edit.label.account-address')"
                :error="errors[0]"
                :disabled="requireWalletConnection"
              />
            </ValidationProvider>
          </div>
          <div class="flex pb-2 items-center justify-between">
            <span
              class="cursor-pointer text-sm font-medium text-primary"
              @click="$emit('close', true)"
            >{{ $t('profile.edit.close') }}</span
            >
            <ArrowButton
              :loading="loading"
              :disabled="loading || !filled"
              type="outline-primary"
            >{{ $t('profile.edit.save') }}
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
import WalletConnect from "~/components/cards/WalletConnect";

export default {
  name: 'EditProfile',
  components: {
    WalletConnect,
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
    }
  },
  methods: {
    async onSave() {
      this.loading = true
      const signature = await this.retrieveSignature()
      if(!signature && this.requireWalletConnection) return;
      this.$store
        .dispatch('user/wallets/update', {
          id: this.wallet.id,
          address: this.newAddress,
          signature,
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
    async retrieveSignature(){
      if(!this.requireWalletConnection) return null;
      try {
        return await this.$store.dispatch('wallet/getSignature');
      }catch (e){
        console.log(e);
        return null;
      }
    }
  },
  computed: {
    ...mapGetters({
      walletAddress: 'wallet/address',
    }),
    requireWalletConnection() {
      return true;
    },
    currentAddress() {
      return this.wallet?.address;
    },
    filled(){
      if(this.currentAddress === this.newAddress) return false;
      return !!this.newAddress;
    },
    newAddress() {
      if (this.requireWalletConnection) {
        return this.walletAddress;
      }
      return this.address;
    }
  }
}
</script>
