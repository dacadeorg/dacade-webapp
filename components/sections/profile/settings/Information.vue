<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >
      <div
        v-for="(info, i) in userInfo" :key="i"
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">{{ info.info }}</div>
         <div class="text-gray text-sm">{{ info.content}}</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(info)">{{ info.status }}</button>
      </div>
      <Popup
        v-show="showPopup" 
        class="w-3/5" 
        :selected-info="selectedInfo" 
        :show-popup="showPopup" 
        @togglePopup="() => togglePopUp()" 
        @close=" () => togglePopUp()"  />

    </ProfileSettingsSection>
  </template>
  
<script>
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import Popup from '~/components/popups/profile'
export default {
  name: 'ProfileSettingsInformation',
  components: { 
    ProfileSettingsSection,
    Popup
   },
  props: {
    user: {
        default: () => {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      showPopup: false,
      userInfo: [
        {
          title: 'Change Names',
          info: 'Username',
          content : this.user.displayName,
          status: '',
          form: ['Last name','First name ']
        },
        {
          title: 'Change Email',
          info: 'Email',
          content : this.user.email,
          status: this.user.email.length === 0 ? 'Set' : 'Change',
          form: ['Change your email']
        },
        {
          title: 'Change Name',
          info: 'Username',
          content : this.user.firstName,
          status: this.user.firstName.length > 0 ? 'Change':'Set' ,
          form: ['Last name','First name ']
        },
        {
          title: 'Change Password',
          info: 'Username',
          content : '*******',
          status: 'Change',
          form: ['Type your current password','Type new password' ,'Type new password']
        },
      ],
      selectedInfo: {}
    }
  },
  methods: {
    togglePopUp(info) {
      this.selectedInfo = info
      console.log(info, "info")
      this.showPopup = !this.showPopup
    },
  },
}
</script>