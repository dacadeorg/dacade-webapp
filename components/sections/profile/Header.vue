<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="text-center pb-24 relative">
    <Avatar size="extra" :user="user" :use-link="false" />
    <span class="block capitalize text-5xl mt-5 leading-none">{{
      username
    }}</span>
    <div
      class="flex justify-center mt-2 leading-snug text-sm divide-x divide-solid"
    >
      <!--      <div class="flex items-center px-3">-->
      <!--        <span class="inline-block"><GithubIcon /></span>-->
      <!--        <span class="ml-1 inline-block">Github</span>-->
      <!--      </div>-->
      <div v-if="discordConneted" class="flex items-center px-2">
        <span class="inline-block">
          <DiscordIcon />
        </span>
        <span class="inline-block mx-1">{{
          $t('profile.header.discord')
        }}</span>
      </div>
      <div class="flex items-center px-2">
        <span class="inline-block">
          <TimeIcon />
        </span>
        <span class="inline-block mx-1">{{ $t('profile.header.joined') }}</span>
        <span v-if="joined" class="inline-block text-sm">{{ joined }}</span>
      </div>

      <!--      <div class="flex items-center px-3">-->
      <!--        <span class="inline-block"><CompassIcon /></span>-->
      <!--        <span class="ml-1 inline-block">GMT+2</span>-->
      <!--      </div>-->
    </div>
    <div v-if="canConnectDiscord || showKycVerificationButton" class="pt-5">
      <Button
        v-if="canConnectDiscord"
        type="outline-primary"
        class="flex mx-auto text-base"
        @click="triggerDiscordOauth"
      >
        {{ $t('profile.header.connect-discord') }}
      </Button>
      <Button
        v-if="showKycVerificationButton"
        type="outline-primary"
        class="flex mx-auto text-base"
        @click="triggerKYCVerification"
      >
        {{ $t('profile.header.sumsub.verify') }}
      </Button>
    </div>
    <KYCVerificationPopup />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'
import Button from '@/components/ui/button'
import TimeIcon from '~/assets/icons/time.svg?inline'
import DiscordIcon from '~/assets/icons/discordIcon.svg?inline'
import KYCVerificationPopup from '~/components/popups/KYCVerification.vue'
// import GithubIcon from '~/assets/icons/github.svg?inline'

export default {
  name: 'ProfileHeader',
  components: {
    KYCVerificationPopup,
    Avatar,
    TimeIcon,
    Button,
    DiscordIcon,
    // GithubIcon,
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      authUser: 'user/get',
      profileUser: 'profile/users/current',
      isKycVerified: 'user/isKycVerified',
    }),
    joined() {
      if (!this.user?.joined) return null
      return DateManager.format(
        this.user?.joined,
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
    username() {
      return this.user?.displayName
    },
    isCurrentUser() {
      return (
        this.username?.toLowerCase() ===
        this.authUser?.displayName?.toLowerCase()
      )
    },
    discordConneted(){
      return this.user?.discord?.connected
    },
    canConnectDiscord() {
      return this.isCurrentUser && !this.discordConneted
    },
    kycVerificationEnabled() {
      return process.env.NUXT_ENV_KYC_VERIFICATION_ENABLED === 'true'
    },
    showKycVerificationButton() {
      return this.isCurrentUser && !this.isKycVerified && this.kycVerificationEnabled
    },
  },
  methods: {
    triggerDiscordOauth() {
      window.location.href = `${process.env.NUXT_ENV_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${process.env.NUXT_ENV_DISCORD_CLIENT_ID}&scope=${process.env.NUXT_ENV_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${process.env.NUXT_ENV_DISCORD_CALLBACK_URL}&prompt=consent`
    },
    triggerKYCVerification() {
      if (!this.showKycVerificationButton) return
      this.$store.dispatch('kyc/openVerificationModal')
    },
  },
}
</script>
