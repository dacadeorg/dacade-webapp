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
        <div v-if="isDiscordConnected" class="flex justify-end text-primary text-sm">
          <button class="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs">{{ $t('profile.settings.connected') }}</button>
        </div>
        <div v-if="!isDiscordConnected" class="flex justify-end text-primary text-sm">
          <button
          class="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs" 
             @click="triggerDiscordOauth">{{ $t('profile.settings.connect-discord') }}</button>
        </div>
        

      </div>
    </ProfileSettingsSection>
  </template>
  
<script>
import { mapGetters } from 'vuex'
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import DiscordIcon from '~/assets/icons/discordIcon.svg?inline'


export default {
  name: 'ProfileSettingsLinking',
  components: { 
    ProfileSettingsSection,     
    DiscordIcon, },
  computed: {
    ...mapGetters({
      isDiscordConnected: 'user/isDiscordConnected',
    }),
  },
  methods: {
    triggerDiscordOauth() {
      window.location.href = `${process.env.NUXT_ENV_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${process.env.NUXT_ENV_DISCORD_CLIENT_ID}&scope=${process.env.NUXT_ENV_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${process.env.NUXT_ENV_DISCORD_CALLBACK_URL}&prompt=consent`
    },
  },
}
</script>