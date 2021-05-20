<template>
  <div
    class="quadratic-card relative"
    :style="{ backgroundColor: community.colors.primary }"
  >
    <nuxt-link :to="{ path: path }">
      <div class="lg:flex xl:flex md:flex my-1 md:my-5 relative lg:p-0 p-8">
        <div class="lg:w-8/12 xl:w-8/12 md:w-8/12 text-2xl">
          <p class="text-white leading-7 font-medium">
            {{ community.name }}
          </p>
          <p
            :style="{ color: community.colors.accent }"
            class="leading-7 font-medium"
          >
            {{ community.summary }}
          </p>
        </div>
        <div
          class="ml-auto pl-28 lg:pl-0 md:pl-0 sm:pl-0 xl:my-0 lg:my-16 mt-11"
        >
          <img :src="community.icon" />
        </div>
        <div
          class="
            block
            absolute
            lg:bottom-0
            bottom-8
            text-sm
            lg:left-0
            left-3
            md:left-10
          "
          :style="{ color: community.colors.accent }"
        >
          <span class="font-bold">{{ rewards }} DAC</span>
          <span class="uppercase">{{ $t('communities.reward') }}</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CommunityCard',
  props: {
    community: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    path() {
      return `/communities/${this.community.slug}`
    },
    rewards() {
      if (!this.community.rewards || !this.community.rewards.length) {
        return 0
      }
      return this.community.rewards?.reduce(
        (accumulator, reward) => accumulator.amount + reward.amount
      )
    },
  },
}
</script>
