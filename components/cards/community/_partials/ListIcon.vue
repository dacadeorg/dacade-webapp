<template>
  <ThemeWrapper :colors="community.colors">
    <div
      class="p-6 bg-theme-cover text-theme-cover-text lg:min-w-md lg:min-h-sm lg:h-full md:w-full md:h-60 lg:max-w-sm"
    >
      <div class="mx-auto h-full">
        <div
          class="flex flex-col sm:flex-row justify-between lg:flex-col h-full"
        >
          <div
            class="text-.5xl md:text-2xl font-medium md:max-w-sm sm:max-w-xs"
          >
            <h1 class="tracking-tight max-w-text-xs text-theme-cover-text">
              {{ community.name }}
            </h1>
            <p
              class="tracking-tight max-w-text-2xs md:max-w-text-md text-theme-accent"
            >
              {{ community.description || '' }}
            </p>
          </div>
          <div class="self-end w-auto sm:h-full md:h-auto">
            <img :src="community.icon" class="relative h-44 w-44 mb-5 h-30" />
          </div>
        </div>
        <div
          class="flex md:flex-row lg:flex-col justify-start flex-col max-w-xs -mt-4 md:-mt-7 md:max-w-lg items-start"
        >
          <div v-if="submissions" class="text-sm">
            <span
              ><strong v-if="submissions">{{ submissions }}</strong>
              {{ $t('communities.submissions') }}</span
            >
            <div />
          </div>
          <div v-else class="text-sm">
            <span
              ><strong v-if="!submissions">0</strong>
              {{ $t('communities.submissions') }}</span
            >
            <div />
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
</template>
<script>
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'

export default {
  name: 'CommunityListCardIcon',
  components: { ThemeWrapper },
  props: {
    community: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    submissions() {
      if (this.community.metadata && this.community.metadata.submissions) {
        return this.community.metadata.submissions
      }
      return 0
    },
  },
}
</script>
