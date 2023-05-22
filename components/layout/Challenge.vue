<template>
  <div>
    <div
      class="flex flex-col divide-y divide-solid divide-gray-100 w-3/4 text-gray-700 space-y-6"
    >
      <a>
        <div class="font-medium text-.5xl leading-snug">Challenges</div>
        <div class="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">
          In the courses of this community, you will be able to learn about new
          technologies, solve challenges, get feedback and earn bounties.
        </div>
      </a>
      <a href="#test" class="active md:block hidden scroll-smooth pt-5">
        <div class="font-medium text-.5xl leading-snug">Scoreboard</div>
        <div class="text-sm font-light lg:w-full lg:pr-7 pt-2">
          On the scoreboard, you can see which users have accumulated the most
          reputation by giving valuable feedback to their peers.
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    path() {
      return `/communities/${this.community.slug}`
    },
  },
}
</script>
