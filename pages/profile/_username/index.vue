<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
  >
    <ProfileOverviewAchievements />
    <ProfileOverviewCommunities />
  </div>
</template>

<script>
import ProfileOverviewCommunities from '~/components/sections/profile/overview/Communities'
import ProfileOverviewAchievements from '~/components/sections/profile/overview/Achievements'

export default {
  name: 'Profile',
  components: { ProfileOverviewAchievements, ProfileOverviewCommunities },
  layout: 'profile',
  fetch({store, params, error}) {
    const username = params.username;
    return Promise.all([
      store.dispatch('profile/certificates/all', username),
      store.dispatch('profile/reputations/all', username)
    ]).catch((e) => {
      error(e)
    })
  },
}
</script>
