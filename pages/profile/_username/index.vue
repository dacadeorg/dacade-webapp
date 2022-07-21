<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200  space-y-8 text-gray-700"
  >
    <ProfileOverviewAchievements/>
    <ProfileOverviewCommunities/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProfileOverviewCommunities from "~/components/sections/profile/overview/Communities";
import ProfileOverviewAchievements from "~/components/sections/profile/overview/Achievements";

export default {
  name: 'Profile',
  components: {ProfileOverviewAchievements, ProfileOverviewCommunities},
  layout: 'profile',
  computed: {
    ...mapGetters({
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
  },
  mounted() {
    this.$store.dispatch('profile/certificates/all', this.username)
  },
}
</script>
