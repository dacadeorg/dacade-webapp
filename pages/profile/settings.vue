<template>
    <div
      class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
    >
      <ProfileSettingsInformation :user="user" />
  
      <ProfileSettingsLinking />
  
      <!-- <Logout /> -->

      <Button
        type="outline-secondary "
        class="flex items-start mx-auto text-base"
      >
        {{ $t('profile.header.disconnect') }}
      </Button>

      </div>
  </template>


<script>
import { mapGetters } from 'vuex'
import ProfileSettingsInformation from '~/components/sections/profile/settings/Information'
import ProfileSettingsLinking from '~/components/sections/profile/settings/Linking'
import Button from '@/components/ui/button'


export default {
  name: 'ProfileSettings',
  components: {
    ProfileSettingsInformation,
    ProfileSettingsLinking,
    Button,
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


 