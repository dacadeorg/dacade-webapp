<template>
  <a href="mailto:moritz@dacade.org">
    <div class="group relative p-5 rounded-3.5xl overflow-hidden">
      <div class="relative z-10 text-primary h-full">
        <p class="text-2xl font-medium mb-2.5 leading-none">
          {{ $t('page.index.communities.partnering.title') }}
        </p>
        <p class="text-base mt-0 mb-20 lg:mb-0 leading-normal">
          {{ $t('page.index.communities.partnering.subtitle') }}
        </p>
        <div class="mt-24 lg:bottom-0 lg:left-0 bottom-10 left-9">
          <a href="mailto:moritz@dacade.org">
            <Button
              class="
                group-hover:bg-primary group-hover:text-white
                leading-relaxed
                px-6
                py-2
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
        class="
          block
          absolute
          top-0
          left-0
          bg-primary
          opacity-5
          z-0
          w-full
          h-full
        "
      />
    </div>
  </a>
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
