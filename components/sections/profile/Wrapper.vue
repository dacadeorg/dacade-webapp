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
            <h6
              class="text-xs leading-relaxed font-semibold py-11 text-gray-500"
            >
              ACHIEVEMENTS
            </h6>
            <div class="flex md:flex-row flex-wrap justify-between md:space-x-4">
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
              <AchievementCard />
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
            <h6
              class="text-xs leading-relaxed font-semibold pt-11 pb-5 text-gray-500"
            >
              REFERRAL
            </h6>
            <div class="flex space-x-4">
              <ReferralsList text="Invite your friends to Dacade and earn referral bounties"/>
            </div>
          </div>

            <div class="flex space-x-4 pt-10">
             <NotificationList />
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
  },
}
</script>
