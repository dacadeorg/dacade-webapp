<template>
  <div
    class="flex justify-center min-h-screen w-full"
  >
    <div class="relative p-6 text-center">
      <img
        src="@/assets/img/discord/success.svg"
        alt="success"
        class="w-32 h-32 mx-auto" />

      <h1 class="text-3xl font-medium mb-6">
        {{ $t('discord-verification.success.title') }}
      </h1>
      <div class="text-center">
        <ArrowButton link="/profile" target="_self">
          {{ $t('success.page.button.profile') }}
        </ArrowButton>
      </div>
    </div>
  </div>

</template>

<script>
import ArrowButton from "~/components/ui/button/Arrow.vue";

export default {
  name: "Success",
  components: {ArrowButton},
  scrollToTop: true
}
</script>
