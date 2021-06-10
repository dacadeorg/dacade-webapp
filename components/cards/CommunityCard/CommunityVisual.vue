<template>
  <ThemeWrapper :colors="community.colors">
    <div
      class="
        p-6
        bg-theme-primary
        text-theme-text
        lg:min-w-md lg:min-h-md
        lg:h-96
        md:w-full
        md:h-60
        lg:max-w-sm
      "
    >
      <div class="mx-auto h-full">
        <div
          class="flex flex-col sm:flex-row justify-between lg:flex-col h-full"
        >
          <div class="text-.5xl md:text-2xl font-medium sm:max-w-sm pb-5">
            <h1 class="tracking-tight max-w-text-xs text-theme-text">
              {{ community.name }}
            </h1>
            <p class="tracking-tight md:max-w-text-md text-theme-accent">
              {{ community.description || '' }}
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
            -mt-4
            md:-mt-7
            md:max-w-lg
            items-start
          "
        >
          <div v-if="submissions && showSubmissions" class="text-sm">
            <span
              ><strong v-if="submissions && showSubmissions">{{
                submissions.length
              }}</strong>
              {{ $t('communities.submissions') }}</span
            >
            <div />
          </div>
          <div v-if="community.rewards && showRewards" class="text-sm">
            <Reward />
            <div />
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
</template>
<script>
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import Reward from '@/components/badges/Reward'
export default {
  name: 'CommunityVisual',
  components: { ThemeWrapper, Reward },
  props: {
    showSubmissions: {
      default: () => false,
      type: Boolean,
    },
    showRewards: {
      default: () => false,
      type: Boolean,
    },
    submissions: {
      default: () => [1, 2, 3],
      type: Array,
    },
    community: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
