<template>
  <div class="text-center pb-24 relative">
    <Avatar size="extra" :user="user" :use-link="false"/>
    <span class="block capitalize text-5xl mt-5 leading-none">{{
        user.displayName
      }}</span>
    <div
      class="flex justify-center mt-2 leading-snug text-sm divide-x divide-solid"
    >
      <!--      <div class="flex items-center px-3">-->
      <!--        <span class="inline-block"><GithubIcon /></span>-->
      <!--        <span class="ml-1 inline-block">Github</span>-->
      <!--      </div>-->
      <div class="flex items-center px-3">
        <span class="inline-block"><TimeIcon/></span>
        <span class="inline-block mx-1">{{ $t('profile.header.joined') }}</span>
        <span v-if="joined" class="inline-block text-sm">{{ joined }}</span>
      </div>
      <!--      <div class="flex items-center px-3">-->
      <!--        <span class="inline-block"><CompassIcon /></span>-->
      <!--        <span class="ml-1 inline-block">GMT+2</span>-->
      <!--      </div>-->
    </div>
    <div v-if="false" class="pt-5">
      <Button
        type="outline-primary"
        class="flex mx-auto text-base"
        @click="triggerDiscordOauth"
      >
        {{ $t('profile.header.connect-discord') }}
      </Button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'
import Button from '@/components/ui/button'
import TimeIcon from '~/assets/icons/time.svg?inline'
// import GithubIcon from '~/assets/icons/github.svg?inline'
// import CompassIcon from '~/assets/icons/compass.svg?inline'

export default {
  name: 'ProfileHeader',
  components: {
    Avatar,
    TimeIcon,
    Button,
    // GithubIcon,
    // CompassIcon,
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      authUser: 'user/get',
      profileUser: 'profile/users/current',
    }),
    joined() {
      if (!this.user.joined) return null
      return DateManager.format(
        this.user.joined,
        'MMMM yyyy',
        this.$i18n.locale
      )
    },
    user() {
      if (
        this.$route.params?.username &&
        this.$route.params?.username?.toLowerCase() !==
        this.authUser?.displayName?.toLowerCase()
      ) {
        return this.profileUser
      }
      return this.authUser
    },
  },
  methods: {
    triggerDiscordOauth() {
      const discordOauthUrl = `${process.env.NUXT_ENV_DISCORD_OAUTH_BASE_URL}?client_id=${process.env.NUXT_ENV_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NUXT_ENV_DISCORD_CALLBACK_URL}&response_type=code&scope=${process.env.NUXT_ENV_DISCORD_SCOPE}`
      window.location.href = discordOauthUrl
    },
  },
}
</script>
