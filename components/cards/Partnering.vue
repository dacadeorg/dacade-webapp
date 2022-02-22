<template>
  <div class="relative lg:mt-0 xl:pt-0 rounded-3.5xl overflow-hidden">
    <div
      class="
        relative
        z-10
        lg:p-6 lg:pb-3 lg:pt-9
        p-7
        w-full
        text-primary
        h-full
        flex flex-col
        justify-between
        divide-y-2 divide-y divide-dotted divide-theme-accent
      "
    >
      <div class="max-w-sm">
        <p class="text-2xl font-medium mb-2.5 leading-none">
          {{ $t('page.index.communities.partnering.title') }}
        </p>
        <p class="text-base mt-0 mb-20 lg:mb-0 leading-normal">
          {{ $t('page.index.communities.partnering.subtitle') }}
        </p>
      </div>
      <div class="mt-4 flex-none flex justify-between">
        <div class="flex flex-col space-y-0">
          <div class="mt-4 font-light text-theme-accent w-48">
            {{ $t('partnering.card.text') }}
          </div>
        </div>
        <div class="mt-4 align-middle">
          <a href="mailto:moritz@dacade.org">
            <Button
              class="
                hover:bg-primary
                group-hover:text-white
                leading-relaxed
                lg:px-7
                px-5
                font-medium
              "
              type="outline-primary"
              :padding="false"
            >
              {{ $t('page.index.communities.partnering.button-text') }}
            </Button>
          </a>
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
export default {
  name: 'PartneringCard',
  components: {
    Button,
  },
}
</script>
