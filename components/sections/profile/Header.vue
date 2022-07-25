<template>
  <div class="text-center pb-24 relative">
    <Avatar size="extra" :user="user" :use-link="false" />
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
        <span class="inline-block"><TimeIcon /></span>
        <span class="inline-block mx-1">joined</span>
        <span v-if="joined" class="inline-block text-sm">{{ joined }}</span>
      </div>
      <!--      <div class="flex items-center px-3">-->
      <!--        <span class="inline-block"><CompassIcon /></span>-->
      <!--        <span class="ml-1 inline-block">GMT+2</span>-->
      <!--      </div>-->
    </div>
    <div class="pt-5">
      <a
        href="https://discord.gg/eHYZr9dzan"
        target="_blank"
      >
        <Button
          type="outline-primary"
          class="flex mx-auto"
        >
          Connect to Discord <DiscordIcon class="ml-3"
        /></Button>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'
import Button from '@/components/ui/button'
import TimeIcon from '~/assets/icons/time.svg?inline'
import DiscordIcon from '~/assets/icons/discordIcon.svg?inline'
// import GithubIcon from '~/assets/icons/github.svg?inline'
// import CompassIcon from '~/assets/icons/compass.svg?inline'

export default {
  name: 'ProfileHeader',
  components: {
    Avatar,
    TimeIcon,
    DiscordIcon,
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
}
</script>
