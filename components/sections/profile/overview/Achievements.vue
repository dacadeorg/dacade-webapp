<template>
  <ProfileOverviewSection
    v-if="achievements && achievements.length"
    title="Achievements"
    see-more
    see-all
  >
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <AchievementCard
        v-for="(achievement, index) in achievements"
        :key="index"
        :data="achievement"
        
      />
    </div>
  </ProfileOverviewSection>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'
import AchievementCard from '~/components/cards/Achievement'

export default {
  name: 'ProfileOverviewAchievements',
  components: { AchievementCard, ProfileOverviewSection },
  computed: {
    ...mapGetters({
      achievements: 'profile/certificates/list',
    }),
  },
}
</script>
