<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 pt-6 relative">
      <div class="mb-12">
        <p class="text-.5xl leading-snug font-medium">
          {{ wallet.title }}
        </p>
        <p class="text-.5xl font-medium text-gray-400 leading-snug">
          {{ wallet.address ? 'Change' : 'Set' }}
          {{ $t('profile.wallets.address') }}
        </p>
        <Tag class="text-gray-500" :value="wallet.token" />
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
                v-model="address"
                required
                :label="$t('profile.edit.label.account-address')"
                :error="errors[0]"
              />
            </ValidationProvider>
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
              >{{ $t('profile.edit.save') }}
              <span class="inline-block mr-3.5 ml-4 align-middle">
                <ArrowRightIcon v-if="!loading" />
                <Spinner v-else class="animate-spin"
              /></span>
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </Modal>
</template>

<script>
// import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
import Spinner from '~/assets/icons/spinner.svg?inline'

export default {
  name: 'EditProfile',
  components: {
    Modal,
    Input,
    Button,
    ArrowRightIcon,
    Spinner,
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
      address: this.wallet?.address || '',
      loading: false,
    }
  },
  methods: {
    onSave() {
      this.loading = true
      this.$store
        .dispatch('user/wallets/update', {
          id: this.wallet.id,
          address: this.address,
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
