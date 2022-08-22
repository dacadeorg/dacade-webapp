<template>
  <div
    class="flex items-center justify-center absolute min-h-screen top-0 w-full"
  >
    <div class="relative p-6 text-center">
      <h1 class="text-3xl font-medium mb-6">
        {{ title }}
      </h1>
      <p class="text-lg" :class="{'mb-6': !showRefresh, 'mb-2': showRefresh}">
        {{ message }}
      </p>
      <p v-if="showRefresh" class="text-lg mb-6">{{ $t('error.page.button.refresh') }}</p>
      <div class="text-center">
        <ArrowButton link="/" target="_self">
          {{ $t('error.page.button.home') }}
        </ArrowButton>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowButton from '@/components/ui/button/Arrow'
import {getMetadataDescription, getMetadataTitle} from "~/utilities/Metadata";

export default {
  components: {
    ArrowButton,
  },
  layout: 'withoutFooter',
  props: {
    error: {
      type: Object,
      default: () => {
      },
    },
  }, // If you prefer you can set a custom layout for the error page
  head() {
    return {
      title: getMetadataTitle(this.$t('error.title'), this.title),
      meta: getMetadataDescription(this.message)
    }
  },
  computed: {
    title() {
      switch (this.error?.statusCode) {
        case 403:
          return this.$t('error.default.title')
        case 404:
          return this.$t('error.404.title')
        default:
          return this.$t('error.default.title')
      }
    },
    message() {
      switch (this.error?.statusCode) {
        case 403:
          return this.error.message
        case 404:
          return this.$t('error.404.message')
        default:
          return this.$t('error.default.message')
      }
    },
    showRefresh() {
      return this.error?.statusCode !== 403 && this.error?.statusCode !== 404
    }
  }
}
</script>
