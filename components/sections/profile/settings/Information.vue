<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >
      <div
v-for="(info, i) in userInfo" :key="i"
      class="grid grid-cols-3 gap-4 p-4">
         <div class="text-gray text-sm">{{ info.title }}</div>
         <div class="text-gray text-sm">{{ info.content}}</div>
         <button class="bg-transparent hover:bg-transparent text-blue-700" @click="togglePopUp">{{ info.status }}</button>
      </div>
    </ProfileSettingsSection>
  </template>
  
<script>
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'

export default {
  name: 'ProfileSettingsInformation',
  components: { ProfileSettingsSection },
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
      userInfo: [
        {
          title: 'Username',
          content : this.user.displayName,
          status: '',
        },
        {
          title: 'Email',
          content : this.user.email,
          status: 'Change',
        },
        {
          title: 'Names',
          content : '',
          status: 'Set',
        },
        {
          title: 'Password',
          content : '*******',
          status: 'Change',
        },
      ],
    }
  },
  methods: {
    togglePopUp() {
      this.$store.dispatch('ui/toggleShowInformationPopup', true)
    },
  },
}
</script>