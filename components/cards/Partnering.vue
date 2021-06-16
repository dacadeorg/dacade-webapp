<template>
  <div class="relative mt-5 lg:mt-0 xl:pt-0 rounded-3.5xl overflow-hidden">
    <div
      class="
        relative
        z-10
        lg:p-10
        lg:pb-10
        lg:pt-9
        p-8
        pb-24
        w-11/12
        text-primary
        h-full
      "
    >
      <p class="text-2xl font-medium mb-2.5 leading-none">
        {{ $t('page.index.communities.partnering.title') }}
      </p>
      <p class="text-base mt-0 mb-20 lg:mb-0 leading-normal">
        {{ $t('page.index.communities.partnering.subtitle') }}
      </p>
      <div class="mt-24 pb-4">
        <a href="mailto:moritz@dacade.org">
          <Button
            class="
              hover:bg-primary
              group-hover:text-white
              leading-relaxed
              px-6
              py-5
            "
            type="outline-primary"
            :padding="false"
          >
            {{ $t('page.index.communities.partnering.button-text') }}
          </Button>
        </a>
      </div>
    </div>
    <span
      class="block absolute top-0 left-0 bg-primary opacity-5 z-0 w-full h-full"
    />
  </div>
</template>

<script>
import Button from '@/components/ui/Button'
export default {
  name: 'PartneringCard',
  components: {
    Button,
  },
}
</script>
