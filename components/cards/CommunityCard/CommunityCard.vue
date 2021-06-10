<template>
  <ThemeWrapper :colors="community.colors">
    <div class="p-6 bg-theme-primary text-theme-text">
      <div class="mx-auto h-full">
        <div
          :class="showSubmissions ? 'max-w-md' : ''"
          class="
            flex flex-col
            sm:flex-row
            md:flex-col
            lg:flex-row
            justify-between
            space-y-5
          "
        >
          <div
            class="
              text-.5xl
              md:text-2xl
              max-w-sm
              min-h-2xs
              md:min-h-3xs
              lg:min-h-xs
              xl:min-h-2xs
              font-medium
              pb-5
            "
          >
            <h1 class="tracking-tight max-w-text-xs text-theme-text">
              {{ community.name }}
            </h1>
            <p class="tracking-tight md:max-w-text-md text-theme-accent pr-2">
              {{ community.description || '' }}
            </p>
          </div>
          <div
            class="
              self-end
              max-w-lg
              sm:h-full
              sm:-mb-0
              md:mb-2
              lg:mb-6
              md:h-auto
            "
          >
            <img :src="community.icon" class="relative h-36 sm:h-42 w-full" />
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
            <Reward
              :value="
                community.rewards.filter((r) => r.type === 'SUBMISSION')[0]
                  .amount
              "
              :denom="
                community.rewards.filter((r) => r.type === 'SUBMISSION')[0]
                  .token
              "
            />
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
  name: 'CommunityCard',
  components: { ThemeWrapper, Reward },
  props: {
    showSubmissions: {
      default: () => false,
      type: Boolean,
    },
    showRewards: {
      default: () => true,
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
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.community)
    const rewards = this.community.rewards
    const submission = rewards.filter((r) => r.type === 'SUBMISSION')[0].value
    // eslint-disable-next-line no-console
    console.log(submission)
  },
}
</script>
