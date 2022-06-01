<template>
  <Section padding="py-12">
    <Header />
    <div class="lg:flex">
      <div class="lg:w-1/4">
        <Navigation />
      </div>

      <div class="lg:w-3/4">
        <div
          class="flex flex-col divide-y divide-solid divide-gray-200 lg:py-5 space-y-8 text-gray-700"
        >
          <div>
            <div class="flex items-center pt-11 pb-5">
              <h6
                class="text-xs leading-relaxed font-semibold py-11 text-gray-500"
              >
                ACHIEVEMENTS
              </h6>
              <div
                class="text-primary flex items-center ml-auto cursor-pointer"
              >
                <span class="mr-2 text-sm"><a>See all</a></span>
                <span><Angleright /></span>
              </div>
            </div>

            <div
              class="flex md:flex-row flex-wrap justify-between md:space-x-4"
            >
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
            </div>
            <div class="text-primary flex items-center pt-5 cursor-pointer">
              <span><PlusIcon class="w-3.5 h-3.5" /></span>
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
              <Communities title="Celo Blockchain" />
              <Communities title="Ethereum Blockchain" />
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
                <span><Angleright /></span>
              </div>
            </div>

            <div class="flex space-x-4">
              <ReferralsList
                text="Invite your friends to Dacade and earn referral bounties"
              />
            </div>
            <div class="pt-8">
              <Request />
            </div>
          </div>

          <div class="pt-10">
            <NotificationList />
            <div class="text-primary flex items-center pt-5 cursor-pointer">
              <span><PlusIcon /></span>
              <span class="ml-2"><a>See all</a></span>
            </div>
          </div>
        </div>
        <!-- <slot /> -->
      </div>
    </div>
  </Section>
</template>

<script>
import Header from '@/components/sections/profile/Header'
import Navigation from '@/components/sections/profile/Navigation'
import Section from '@/components/ui/Section'
import AchievementCard from '@/components/cards/Achievement.vue'
import Communities from '~/components/cards/Communities.vue'
import NotificationList from '@/components/list/Notification'
import ReferralsList from '@/components/list/ReferralsList'
import Request from '@/components/cards/profile/Request'
import PlusIcon from '~/assets/icons/plus.svg?inline'
import Angleright from '~/assets/icons/angle-right.svg?inline'

export default {
  name: 'ProfileWrapper',
  components: {
    Header,
    Section,
    Navigation,
    AchievementCard,
    Communities,
    NotificationList,
    ReferralsList,
    PlusIcon,
    Request,
    Angleright,
  },
}
</script>
