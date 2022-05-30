<template>
  <div
    class="relative lg:mt-0 xl:pt-0 rounded-3.5xl overflow-hidden mt-5 md:mt-0 border border-solid border-grayLight md:border-none"
  >
    <div
      class="relative z-10 p-6 lg:pb-3 w-full text-primary h-full min-h-xs flex flex-col justify-between divide-y-2 divide-y divide-dotted divide-theme-accent"
    >
      <div class="max-w-sm">
        <p class="text-2xl font-medium mb-2.5 leading-none">
          <Skeleton :loading="loading">
          {{ $t('page.index.communities.partnering.title') }}
          </Skeleton>
        </p>
        <p class="text-base mt-0 mb-20 lg:mb-0 leading-normal">
          <Skeleton
            :count="2"
            as="div"
            class-name="mt-1 w-full"

            min-height="10px"
            :loading="loading"
          >
            {{ $t('page.index.communities.partnering.subtitle') }}
          </Skeleton>
        </p>
      </div>
      <div class="mt-4 flex-none md:flex justify-between">
        <div class="md:flex md:flex-col space-y-0">
          <div class="mt-4 font-light text-theme-accent md:w-48">
            <Skeleton
            :count="2"
            as="div"
            class-name="mt-1 w-full"
            min-height="10px"
            :loading="loading"
          >
            {{ $t('partnering.card.text') }}
            </Skeleton>
          </div>
        </div>
        <div class="mt-4 align-middle">
          <Skeleton as="div" pill :loading="loading">
          <a href="mailto:moritz@dacade.org">
            <Button
              class="hover:bg-primary group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium"
              type="outline-primary"
              :padding="false"
            >
              {{ $t('page.index.communities.partnering.button-text') }}
            </Button>
          </a>
          </Skeleton>
        </div>
      </div>
      <!-- <div class="self-start absolute bottom-8">
        <a href="mailto:moritz@dacade.org">
          <Button
            class="
              hover:bg-primary
              group-hover:text-white
              leading-relaxed
              px-6
              py-1.5
            "
            type="outline-primary"
            :padding="false"
          >
            {{ $t('page.index.communities.partnering.button-text') }}
          </Button>
        </a>
      </div> -->
    </div>
    <span
      class="block absolute top-0 left-0 bg-primary opacity-5 z-0 w-full h-full"
    />
  </div>
</template>

<script>
import Button from '@/components/ui/button'
import Skeleton from '@/components/ui/Skeleton.vue'
export default {
  name: 'PartneringCard',
  components: {
    Button,
    Skeleton
  },

  props: {
    loading: {
      default: false,
      type: Boolean
    }
  }
}
</script>
