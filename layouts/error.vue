<template>
  <div
    class="flex items-center justify-center absolute min-h-screen top-0 w-full"
  >
    <div class="relative p-6 text-center">
      <div v-if="error.statusCode === 404">
        <h1 class="text-3xl font-medium mb-6">
          {{ $t('error.404.title.not-found') }}
        </h1>
        <p class="text-lg mb-6">
          {{ $t('error.404.message.page') }}
        </p>
      </div>
      <div v-else>
        <h1 class="text-3xl font-medium mb-6">{{ $t('error.404.title') }}</h1>
        <p class="text-lg mb-2">
          {{ $t('error.404.message.petition') }}
        </p>
        <p class="text-lg mb-6">{{ $t('error.page.button.refresh') }}</p>
      </div>
      <div class="text-center">
        <Button
          link="/"
          target="_self"
          class="inline-flex btn-primary btn-lg py-2 px-5 align-middle"
          ><span class="text-sm">{{ $t('error.page.button.home') }}</span>
          <span class="text-white mt-0.5 pl-4">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/button'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
export default {
  components: {
    Button,
    ArrowRight,
  },
  layout: 'withoutFooter',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  }, // If you prefers you can set a custom layout for the error page
}
</script>
