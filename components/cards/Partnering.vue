<template>
  <div class="quadratic-card relative rounded-3.5xl overflow-hidden">
    <div class="relative z-10 w-8/12 text-primary h-full">
      <p class="text-2xl font-medium mb-2.5 leading-none">
        {{ $t('page.index.communities.partnering.title') }}
      </p>
      <p class="text-base mt-0 leading-normal">
        {{ $t('page.index.communities.partnering.subtitle') }}
      </p>
      <div class="block absolute bottom-0 left-0">
        <Button class="leading-relaxed px-6 py-2" type="outline-primary" :padding="false">
          {{ $t('page.index.communities.partnering.button-text') }}
        </Button>
      </div>
    </div>
    <span class="block absolute top-0 left-0 bg-primary opacity-5 z-0 w-full h-full" />
  </div>
</template>

<script>
import Button from '@/components/ui/Button'
export default {
  name: 'PartneringCard',
  components: {
    Button
  }
}
</script>
