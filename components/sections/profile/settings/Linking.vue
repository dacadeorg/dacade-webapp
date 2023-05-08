<template>
    <ProfileSettingsSection
      title="Account Linking"
      see-more
      see-all
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          class="flex text-gray-500 text-base font-normal"
        >
            <div class="pr-2 text-sm flex items-center"><DiscordIcon /></div>
            <div class="text-sm self-center">{{ $t('profile.edit.discord') }}</div>      
        </div>
        <div class="flex justify-end text-primary text-sm">
          <button class="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs">Connected</button>
        </div>
        

      </div>
    </ProfileSettingsSection>
  </template>
  
<script>
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import DiscordIcon from '~/assets/icons/discordIcon.svg?inline'


export default {
  name: 'ProfileSettingsLinking',
  components: { 
    ProfileSettingsSection,     
    DiscordIcon, },
}
</script>