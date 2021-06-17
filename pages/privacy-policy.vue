<template>
  <div class="content-wrapper">
    <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <nuxt-content :document="privacy" />
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const privacy = await $content('legal/privacy').fetch()
    return {
      privacy,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
