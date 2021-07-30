<template>
  <div
    class="
      relative
      mt-7
      lg:w-full
      lg:h-auto
      aspect-w-16 aspect-h-11
      md:aspect-h-10
      lg:aspect-h-9
      md:w-full
      h-auto
      md:m-auto
      md:ml-auto
    "
  >
    <iframe :src="url" allowfullscreen="allowfullscreen" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    url: {
      default: null,
      type: String,
    },
  },
}
</script>
