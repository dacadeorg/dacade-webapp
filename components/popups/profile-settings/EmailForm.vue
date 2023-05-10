<template>
  <ProfileSettingsForm
    title="Change your email"
    :loading="loading"
    :errors="formErrors"
    @close="close"
    @save="onSave"
  >
    <div label-for="input-1" class="mb-5 relative">
      <ValidationProvider
        v-slot="{ errors }"
        name="email"
        mode="passive"
        rules="required|email"
      >
        <div>
          <Input
            id="input-1"
            v-model="email"
            required
            type="form"
            placeholder="Change your Email"
            label="Change your Email"
            class="mb-5"
            :error="errors[0]"
          />
        </div>
      </ValidationProvider>
    </div>

    <div label-for="input-2" class="mb-5 relative">
      <ValidationProvider
        v-slot="{ errors }"
        name="confirmEmail"
        mode="passive"
        rules="required|email|confirmed:email"
      >
        <div>
          <Input
            id="input-2"
            v-model="confirmEmail"
            required
            type="form"
            placeholder="Confirm your Email"
            label="Confirm your Email"
            class="mb-5"
            :error="errors[0]"
          />
        </div>
      </ValidationProvider>
    </div>
  </ProfileSettingsForm>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import ProfileSettingsForm from './Form'
import Input from '@/components/ui/Input'

export default {
  name: 'ProfileSettingsEmailForm',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Input,
    ProfileSettingsForm,
  },
  props: {
    showPopup: {
      default: false,
      type: Boolean,
    },
    togglePopup: {
      default: () => {},
      type: Function,
    },
    userInfo: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      loading: false,
      email: '',
      confirmEmail: '',
      formErrors: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      colors: 'ui/colors',
    }),
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('user/updateEmail', {
          email: this.email,
          confirmEmail: this.confirmEmail,
        })

        this.email = ''
        this.confirmEmail = ''
        this.close()

        // display success notification
      } catch (e) {
        if (e.details) {
          this.formErrors = e.details
        }
        console.log({ e })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
