<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200  space-y-8 text-gray-700"
  >
    <div>
      <div class="flex items-center">
        <h6
          class="text-xs leading-relaxed font-semibold pb-11 text-gray-500"
        >
          ACHIEVEMENTS
        </h6>
        <div
          class="text-primary flex items-center ml-auto cursor-pointer"
        >
          <span class="mr-2 text-sm"><a>See all</a></span>
          <span><Angleright/></span>
        </div>
      </div>

      <div
        class="flex md:flex-row flex-wrap justify-between"
      >
        <AchievementList/>
      </div>
      <div class="text-primary flex items-center pt-5 cursor-pointer">
        <span><PlusIcon class="w-3.5 h-3.5"/></span>
        <span class="ml-2 text-sm"><a>See all</a></span>
      </div>
    </div>

    <div>
      <h6
        class="text-xs leading-relaxed font-semibold pt-11 pb-5 text-gray-500"
      >
        COMMUNITIES
      </h6>
      <div class="flex md:flex-row flex-col md:space-x-4">
        <Communities title="Celo Blockchain"/>
        <Communities title="Ethereum Blockchain"/>
      </div>
    </div>

    <div>
      <div class="flex items-center pt-11 pb-5">
        <h6 class="text-xs leading-relaxed font-semibold text-gray-500">
          REFERRAL
        </h6>
        <div
          class="text-primary flex items-center ml-auto cursor-pointer"
        >
          <span class="mr-2 text-sm"><a>See all</a></span>
          <span><Angleright/></span>
        </div>
      </div>

      <div class="flex space-x-4">
        <ReferralsList
          text="Invite your friends to Dacade and earn referral bounties"
        />
      </div>
      <div class="pt-8">
        <Request/>
      </div>
    </div>

    <div class="pt-10">
      <NotificationList extended/>
      <div class="text-primary flex items-center pt-5 cursor-pointer">
        <span><PlusIcon/></span>
        <span class="ml-2"><a>See all</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import NotificationList from '@/components/list/Notification'
// import AchievementCard from "~/components/cards/Achievement";
import AchievementList from '@/components/list/Achievement';
import Communities from "~/components/cards/Communities";
import ReferralsList from "~/components/list/ReferralsList";
import Request from "~/components/cards/profile/Request";
import PlusIcon from '~/assets/icons/plus.svg?inline'
import Angleright from '~/assets/icons/angle-right.svg?inline'

export default {
  name: 'Notifications',
  components: {
    NotificationList,
    AchievementList,
    Communities,
    ReferralsList,
    PlusIcon,
    Request,
    Angleright,
  },
  layout: 'profile',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  mounted() {
    this.$store.dispatch("user/certificates/all", this.user.username);
  }
}
</script>
