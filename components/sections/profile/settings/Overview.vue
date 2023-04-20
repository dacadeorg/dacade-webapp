<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">Username</div>
        <div class="text-gray text-sm">{{ user.displayName }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            @click="() => console.log()"></button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">Email</div>
        <div class="text-gray text-sm">{{ user.email }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
          @click="() => togglePopUp( {
            title: 'Change Email',
            info: 'Email',
            content : user?.email,
            status: user?.email?.length === 0 ? 'Set' : 'Change',
            emailId: 'email',
            confirmId: 'confirmEmail',
            })"
        >{{ user?.email?.length ? 'Change' : 'Set' }}
        </button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">Full Name</div>
        <div class="text-gray text-sm">{{ fullName }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
          @click="() => togglePopUp(
           {
            title: 'Change Name',
            info: 'Name',
            content : fullName,
            status: fullName.length ? 'Change':'Set' ,
            firstId: 'firstname',
            lastId: 'lastname'
            })"
        >{{ fullName.length ? 'Change' : 'Set' }}
        </button>
      </div>

      <Popup
        v-show="showPopup"
        :selected-info="selectedInfo"
        :show-popup="showPopup"
        class="w-3/5"
        @close=" () => togglePopUp()"
        @togglePopup="() => togglePopUp()"/>

    </ProfileSettingsSection>
  </template>

<script>
import {mapGetters} from "vuex";
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import Popup from '~/components/popups/SettingsProfile'
export default {
  name: 'ProfileSettingsInformation',
  components: {
    ProfileSettingsSection,
    Popup
  },
  data() {
    return {
      showPopup: false,
      selectedInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
    fullName() {
      if (!this.user?.firstName || !this.user?.lastName) return ''
      return this.user.firstName + ' ' + this.user.lastName
    }
  },
  methods: {
    togglePopUp(info) {
      this.selectedInfo = info
      this.showPopup = !this.showPopup
    },
  },
}
</script>
