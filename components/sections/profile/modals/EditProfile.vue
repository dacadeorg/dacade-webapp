<template>
  <Modal :show="show" @close="$emit('close', $event)">
    <div class="px-6 pt-6 relative">
      <h1 class="text-.5xl leading-none font-medium mb-12">Profile</h1>
      <ValidationObserver ref="form" v-slot="{ passes }">
        <form @submit.prevent="passes(onSave)">
          <div class="mb-2.5">
            <ValidationProvider
              v-slot="{ errors }"
              name="firstName"
              rules="required|min:2"
              mode="passive"
            >
              <Input
                v-model="firstName"
                required
                :label="$t('profile.edit.label.fist-name')"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="mb-8">
            <ValidationProvider
              v-slot="{ errors }"
              name="lastName"
              rules="required|min:2"
              mode="passive"
            >
              <Input
                v-model="lastName"
                required
                :label="$t('profile.edit.label.last-name')"
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
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      loading: false,
    }
  },
  methods: {
    onSave() {
      this.loading = true
      this.$store
        .dispatch('user/update', {
          firstName: this.firstName,
          lastName: this.lastName,
        })
        .then(() => {
          this.firstName = null
          this.lastName = null
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
