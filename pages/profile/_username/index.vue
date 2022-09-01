<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
  >
    <ProfileOverviewAchievements />
    <ProfileOverviewCommunities />

    <div v-if="isCurrentUser">
      <ProfileOverviewReferrals />

      <ProfileOverviewSection title="Notifications" see-more>
        <NotificationList extended />
      </ProfileOverviewSection>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationList from '@/components/list/Notification'
import ProfileOverviewCommunities from '~/components/sections/profile/overview/Communities'
import ProfileOverviewAchievements from '~/components/sections/profile/overview/Achievements'
import ProfileOverviewReferrals from '~/components/sections/profile/overview/Referrals'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'
import { getMetadataTitle } from '~/utilities/Metadata'

export default {
  name: 'Profile',
  components: {
    ProfileOverviewSection,
    ProfileOverviewReferrals,
    ProfileOverviewAchievements,
    ProfileOverviewCommunities,
    NotificationList,
  },
  layout: 'profile',
  fetch({ store, params, error }) {
    const username = params.username
    return Promise.all([
      store.dispatch('profile/certificates/all', username),
      store.dispatch('profile/reputations/all', username),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.$route.params.username),
      // meta: getMetadataDescription(this.challenge.description)
    }
  },
  computed: {
    ...mapGetters({
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
    isCurrentUser() {
      return (
        this.username?.toLowerCase() ===
        this.authUser?.displayName?.toLowerCase()
      )
    },
  },
}
</script>
