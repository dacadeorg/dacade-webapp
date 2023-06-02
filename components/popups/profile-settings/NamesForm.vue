<template>
  <ProfileSettingsForm
    :title="$t('profile.edit.change.name')"
    :loading="loading"
    :errors="formErrors"
    @close="close"
    @save="onSave"
  >
    <div label-for="input-3" class="mb-5 relative">
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('profile.edit.first-name')"
        mode="passive"
        rules="required|min:3"
      >
        <div>
          <Input
            id="input-3"
            v-model="firstName"
            required
            type="form"
            :placeholder="$t('profile.edit.first.name')"
            :label="$t('profile.edit.first.name')"
            class="mb-5"
            :error="errors[0]"
          />
        </div>
      </ValidationProvider>
    </div>
    <div label-for="input-3" class="mb-5 relative">
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('profile.edit.last-name')"
        mode="passive"
        rules="required|min:3"
      >
        <div>
          <Input
            id="input-3"
            v-model="lastName"
            required
            type="form"
            :placeholder="$t('profile.edit.last-name')"
            :label="$t('profile.edit.last.name')"
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
  name: 'ProfileSettingsNamesForm',
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
  },
  data() {
    return {
      show: false,
      loading: false,
      firstName: '',
      lastName: '',
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
      this.$emit('close')
    },
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('user/updateNames', {
          firstName: this.firstName,
          lastName: this.lastName,
        })
        this.close()
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
