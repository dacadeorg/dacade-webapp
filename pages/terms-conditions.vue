<template>
  <div class="content-wrapper">
    <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <nuxt-content :document="terms" />
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const terms = await $content('legal/terms').fetch()
    return {
      terms,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
