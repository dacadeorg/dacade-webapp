<template>
  <div
    class="flex items-center justify-center absolute min-h-screen top-0 w-full"
  >
    <div class="relative p-6 text-center">
      <div v-if="error.statusCode === 404">
        <h1 class="text-3xl font-medium mb-6">
          {{ $t('error.404.title') }}
        </h1>
        <p class="text-lg mb-6">
          {{ $t('error.404.message') }}
        </p>
      </div>
      <div v-else>
        <h1 class="text-3xl font-medium mb-6">
          {{ $t('error.default.title') }}
        </h1>
        <p class="text-lg mb-2">
          {{ $t('error.default.message') }}
        </p>
        <p class="text-lg mb-6">{{ $t('error.page.button.refresh') }}</p>
      </div>
      <div class="text-center">
        <ArrowButton link="/" target="_self" class="inline-flex align-middle"
          >{{ $t('error.page.button.home') }}
        </ArrowButton>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowButton from '@/components/ui/button/Arrow'
export default {
  components: {
    ArrowButton,
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
