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
              Achievement
            </h6>
            <div class="flex space-x-4">
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
              Communities
            </h6>
            <div class="flex space-x-4">
              <Test title="Celo Blockchain"/>
              <Test title="Ethereum Blockchain"/>
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
import Test from '@/components/cards/Test.vue'

export default {
  name: 'ProfileWrapper',
  components: {
    Header,
    Section,
    Navigation,
    AchievementCard,
    Test,
  },
}
</script>
