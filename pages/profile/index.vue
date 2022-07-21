<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
  >
    <ProfileOverviewAchievements />

    <ProfileOverviewCommunities />

    <ProfileOverviewReferrals />

    <ProfileOverviewSection title="Notifications" see-more>
      <NotificationList extended />
    </ProfileOverviewSection>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationList from '@/components/list/Notification'
import ProfileOverviewCommunities from '~/components/sections/profile/overview/Communities'
import ProfileOverviewAchievements from '~/components/sections/profile/overview/Achievements'
import ProfileOverviewReferrals from '~/components/sections/profile/overview/Referrals'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'

export default {
  name: 'ProfileOverview',
  components: {
    ProfileOverviewSection,
    ProfileOverviewReferrals,
    ProfileOverviewAchievements,
    ProfileOverviewCommunities,
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  mounted() {
    this.$store.dispatch('profile/certificates/all', this.user.username)
  },
}
</script>
