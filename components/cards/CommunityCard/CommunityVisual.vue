<template>
  <div
    class="
      p-6
      bg-theme-primary
      text-theme-text
      min-w-96 min-h-96
      lg:h-96
      md:w-full
      md:h-60
      lg:max-w-sm
    "
  >
    <div class="mx-auto h-full">
      <div class="flex flex-col sm:flex-row justify-between lg:flex-col h-full">
        <div class="text-.5xl md:text-2xl font-medium sm:max-w-sm pb-5">
          <h1 class="tracking-tight max-w-text-xs text-theme-text">
            {{ community.name }}
          </h1>
          <p class="tracking-tight md:max-w-text-md text-theme-accent">
            {{ community.description || community.summary }}
          </p>
        </div>
        <div class="self-end w-auto sm:h-full sm:-mb-6 md:mb-2 md:h-auto">
          <img :src="community.icon" class="relative h-42 sm:h-42" />
        </div>
      </div>
      <div
        class="
          flex
          md:flex-row
          lg:flex-col
          justify-start
          flex-col
          max-w-xs
          -mt-14
          sm:-mt-10
          lg:-mt-15
          md:max-w-lg
          items-start
        "
      >
        <div class="flex h-10 mr-4">
          <img
            class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary"
            src="~assets/img/testimonial-sample-2.png"
            alt=""
          />
          <img
            class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary"
            src="~assets/img/testimonial-sample-5.png"
            alt=""
          />
          <img
            class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary"
            src="~assets/img/testimonial-sample-2.png"
            alt=""
          />
        </div>
        <div class="my-2 text-sm">
          <span><strong>125</strong> Members</span>
          <div />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommunityVisual',
  props: {
    community: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
