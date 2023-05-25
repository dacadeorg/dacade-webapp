<template>
  <ProfileSettingsSection title="Profile Information" see-more see-all>
    <div class="grid grid-cols-3 gap-4 p-4">
      <div class="text-gray text-sm">{{ $t('profile.edit.username') }}</div>
      <div class="text-gray text-sm">{{ user.displayName }}</div>
    </div>

    <div class="grid grid-cols-3 gap-4 p-4">
      <div class="text-gray text-sm">{{ $t('profile.edit.email') }}</div>
      <div class="text-gray text-sm">{{ user.email }}</div>
      <button
        class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
        @click="togglePopupEmail()"
      >
        {{ user?.email?.length ? 'Change' : 'Set' }}
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4 p-4">
      <div class="text-gray text-sm">{{ $t('profile.edit.fullname') }}</div>
      <div class="text-gray text-sm">{{ fullName }}</div>
      <button
        class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
        @click="togglePopupNames()"
      >
        {{ fullName.length ? $t('profile.edit.fullname.change') : $t('profile.edit.fullname.set') }}
      </button>
    </div>

    <Popup
      v-show="showPopup"
      :form-type="selectedFormType"
      :show-popup="showPopup"
      class="w-3/5"
      @close="togglePopUp()"
    />
  </ProfileSettingsSection>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import Popup from '~/components/popups/profile-settings'
export default {
  name: 'ProfileSettingsOverview',
  components: {
    ProfileSettingsSection,
    Popup,
  },
  data() {
    return {
      showPopup: false,
      selectedFormType: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
    fullName() {
      if (!this.user?.firstName || !this.user?.lastName) return ''
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  methods: {
    togglePopUp(formType) {
      this.selectedFormType = formType
      this.showPopup = !this.showPopup
    },
    togglePopupEmail() {
      this.togglePopUp('email')
    },
    togglePopupNames() {
      this.togglePopUp('names')
    },
  },
}
</script>
