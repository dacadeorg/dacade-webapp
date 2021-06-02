<template>
  <div
    class="
      quadratic-card
      relative
      mt-5
      lg:mt-0
      xl:pt-0
      rounded-3.5xl
      overflow-hidden
    "
  >
    <div
      class="
        relative
        z-10
        lg:w-8/12
        lg:p-0
        lg:pb-0
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
      <div class="block absolute lg:bottom-0 lg:left-0 bottom-10 left-9">
        <a href="mailto:moritz@dacade.org">
          <Button
            class="leading-relaxed px-6 py-2"
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
