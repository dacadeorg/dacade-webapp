<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >
      <!-- <div
        v-for="(info, i) in userInfo" :key="i"
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">{{ info.info }}</div>
         <div class="text-gray text-sm">{{ info.content}}</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(info)">{{ info.status }}</button>
      </div> -->

      <div
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">Username</div>
         <div class="text-gray text-sm">{{ user.displayName }}</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(userInfo[0].info)"></button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">Email</div>
         <div class="text-gray text-sm">{{ user.email }}</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(info)">{{ user.email.length > 0 ? 'Change' : 'Set' }}</button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">Username</div>
         <div class="text-gray text-sm">{{ user.username }}</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(info)">{{ user.username.length > 0 ? 'Change' : 'Set' }}</button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">Password</div>
         <div class="text-gray text-sm">*******</div>
         <button class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs" @click="() => togglePopUp(info)">Change</button>
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
// import { userInfo } from 'os'
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
      // userInfo: [
      //   {
      //     title: 'Change Names',
      //     info: 'Username',
      //     content : this.user.displayName,
      //     status: '',
      //     form:[
      //       {
      //       title: 'First Name',
      //       id: 'firstName'
      //     },
      //     {
      //       title: 'Last Name',
      //       id: 'lastName'
      //     },

      //     ]
      //   },
      //   {
      //     title: 'Change Email',
      //     info: 'Email',
      //     content : this.user.email,
      //     status: this.user.email.length === 0 ? 'Set' : 'Change',
      //     form:[
      //       {
      //       title: 'Change your email',
      //       id: 'email'
      //     },
      //     ]
      //   },
      //   {
      //     title: 'Change Name',
      //     info: 'Username',
      //     content : this.user.firstName + ' ' + this.user.lastName,
      //     status: this.user.firstName.length > 0 ? 'Change':'Set' ,
      //     form:[
      //       {
      //       title: 'First Name',
      //       id: 'firstName'
      //     },
      //     {
      //       title: 'Last Name',
      //       id: 'lastName'
      //     },

      //     ]
      //   },
      //   {
      //     title: 'Change Password',
      //     info: 'Password',
      //     content : '*******',
      //     status: 'Change',
      //     form:[
      //       {
      //       title: 'Type your current password',
      //       id: 'currentPassword'
      //       },
      //       {
      //       title: 'Type new password',
      //       id: 'newPassword'
      //       },
      //       {
      //       title: 'Type new password',
      //       id: 'confirmPassword'
      //       },
      //     ]
      //   },
      // ],
      selectedInfo: {}
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