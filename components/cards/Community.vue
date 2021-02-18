<template>
  <div class="quadratic-card relative" :style="{ backgroundColor: community.colors.primary }">
    <div class="flex relative">
      <div class="w-8/12 text-2xl">
        <p class="text-white leading-7 font-medium">
          {{ community.title }}
        </p>
        <p :style="{ color: community.colors.accent }" class="leading-7 font-medium">
          {{ community.subtitle }}
        </p>
      </div>
      <div class="ml-auto">
        <img :src="community.icon">
      </div>
      <div class="block absolute bottom-0 left-0" :style="{ color: community.colors.accent }">
        <span class="font-bold">{{ community.rewards }} DAC</span>
        <span class="uppercase">{{ $t('communities.reward') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunityCard',
  props: {
    community: {
      default: () => {},
      type: Object
    }
  }
}
</script>
