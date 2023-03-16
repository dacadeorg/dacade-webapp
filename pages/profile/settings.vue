<template>
    <div
      class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
    >
      <ProfileSettingsInformation :user="user" />
  
      <ProfileSettingsLinking />
  
      <div class="w-full flex justify-start mx-auto text-base">
        <Button
          type="outline-primary"
          class="hover:bg-red-700 hover:text-white bg-transparent border text-red-700 border-red-700 flex text-base mt-4"
        >
          {{ $t('profile.header.disconnect') }}
        </Button>
      </div>
      
    

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


 