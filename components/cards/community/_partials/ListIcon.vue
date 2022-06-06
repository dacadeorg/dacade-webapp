<template>
  <ThemeWrapper :colors="community.colors">
    <div
      :class="{'bg-theme-primary' : !loading}"
      class="p-6 text-theme-text lg:min-w-md lg:min-h-sm lg:h-full md:w-full md:h-60 lg:max-w-sm"
    >
      <div class="mx-auto h-full">
        <div
          class="flex flex-col sm:flex-row justify-between lg:flex-col h-full"
        >
          <div
            class="text-.5xl md:text-2xl font-medium md:max-w-sm sm:max-w-xs"
          >
            <h1 class="tracking-tight max-w-text-xs text-theme-text">
              <Skeleton :loading="loading" >
                {{ community.name }}
              </Skeleton>
            </h1>
            <p
              class="tracking-tight max-w-text-2xs md:max-w-text-md text-theme-accent"
            >
            <Skeleton
                :count="2"
                as="div"
                class-name="mt-1 w-full"
 
                min-height="10px"
                :loading="loading"
              >
              {{ community.description || '' }}
            </Skeleton>
            </p>
          </div>
          <div class="self-end w-auto sm:h-full md:h-auto">
            <Skeleton as="div" :loading="loading" >
            <img :src="community.icon" class="relative h-44 w-44 mb-5 h-30" />
            </Skeleton>
          </div>
        </div>
        <div
          class="flex md:flex-row lg:flex-col justify-start flex-col max-w-xs -mt-4 md:-mt-7 md:max-w-lg items-start"
        >
          <div v-if="submissions" class="text-sm">
            <Skeleton :minHeight="'10px'" :loading="loading">
            <span
              ><strong v-if="submissions">{{ submissions }}</strong>
              {{ $t('communities.submissions') }}</span
            >
            </Skeleton>
            <div />
          </div>
          <div v-else class="text-sm">
            <Skeleton :minHeight="'10px'" :loading="loading">
            <span
              ><strong v-if="!submissions">0</strong>
              {{ $t('communities.submissions') }}</span
            >
            </Skeleton>
            <div />
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
</template>
<script>
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import Skeleton from '~/components/ui/Skeleton.vue'
export default {
  name: 'CommunityListCardIcon',
  components: { ThemeWrapper, Skeleton },
  props: {
    community: {
      default: () => {},
      type: Object,
    },
    loading: {
      default: true,
      type: Boolean
    }
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
