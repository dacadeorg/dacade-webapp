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

    <DiscordConnect />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationList from '@/components/list/Notification'
import ProfileOverviewCommunities from '~/components/sections/profile/overview/Communities'
import ProfileOverviewAchievements from '~/components/sections/profile/overview/Achievements'
import ProfileOverviewReferrals from '~/components/sections/profile/overview/Referrals'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'
import {getMetadataTitle} from '~/utilities/Metadata'
import DiscordConnect from "~/components/popups/DiscordConnect.vue";

export default {
  name: 'ProfileOverview',
  components: {
    DiscordConnect,
    ProfileOverviewSection,
    ProfileOverviewReferrals,
    ProfileOverviewAchievements,
    ProfileOverviewCommunities,
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
  data() {
    return {
      username: ''
    }
  },
  fetch({store, params, error}) {
    this.username = store.getters['auth/get'].displayName

    return Promise.all([
      store.dispatch('profile/certificates/all', this.username),
      store.dispatch('profile/reputations/all', this.username),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.user?.displayName),
      // meta: getMetadataDescription(this.challenge.description)
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
}
</script>
