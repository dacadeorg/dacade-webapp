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
         <div class="flex justify-end text-sm text-primary">{{ info.status }}</div>
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
}
</script>