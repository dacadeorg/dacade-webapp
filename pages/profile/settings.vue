<template>
    <div
      class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
    >
      <ProfileSettingsInformation />
  
      <ProfileSettingsLinking />
  
      <Logout />

      </div>
  </template>


<script>
import { mapGetters } from 'vuex'
import ProfileSettingsInformation from '~/components/sections/profile/settings/Information'
import ProfileSettingsLinking from '~/components/sections/profile/settings/Linking'

export default {
  name: 'ProfileSettings',
  components: {
    ProfileSettingsInformation,
    ProfileSettingsLinking,
  },
  layout: 'profile',
  data() {
    return {
      username: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
}
</script>


