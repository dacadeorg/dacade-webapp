<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-100 w-full text-gray-700 space-y-6"
  >
    <nuxt-link
      :to="localePath(mainLink)"
      :class="{
        'opacity-80': !isActive(mainLink),
      }"
    >
      <div class="font-medium text-.5xl leading-snug">Challenges</div>
      <div class="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">
        In the courses of this community, you will be able to learn about new
        technologies, solve challenges, get feedback and earn bounties.
      </div>
    </nuxt-link>
    <nuxt-link
      :to="localePath(scoreboardLink)"
      class="active md:block hidden scroll-smooth pt-5"
      :class="{
        'opacity-80': !isActive(scoreboardLink),
      }"
    >
      <div class="font-medium text-.5xl leading-snug">Scoreboard</div>
      <div class="text-sm font-light lg:w-full lg:pr-7 pt-2">
        On the scoreboard, you can see which users have accumulated the most
        reputation by giving valuable feedback to their peers.
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CommunitySidebar',
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
    scoreboardLink() {
      return `/communities/${this.community.slug}/scoreboard`
    },
    mainLink() {
      return `/communities/${this.community.slug}`
    },
  },

  methods: {
    isActive(link) {
      return this.$route.path === link
    },
  },
}
</script>
