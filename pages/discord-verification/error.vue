<template>
  <div
    class="flex justify-center min-h-screen w-full"
  >
    <div class="relative p-6 text-center">
<!--      error image -->
      <img
        src="@/assets/img/discord/error.jpeg"
        alt="error"
        class="w-32 h-32 mx-auto" />

      <h1 class="text-3xl font-medium mb-6">
        {{ $t('discord-verification.error.title') }}
      </h1>
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
export default {
  components: {
    ArrowButton,
  },
  scrollToTop: true,
}
</script>
