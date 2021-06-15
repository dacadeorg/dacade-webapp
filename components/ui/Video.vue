<template>
  <div
    class="relative mt-7 w-screen md:w-full -ml-5 md:ml-auto"
    :style="{
      paddingTop: '50%',
    }"
  >
    <iframe
      class="w-full h-full absolute top-0"
      :src="url"
      allowfullscreen="allowfullscreen"
      frameborder="0"
    />
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
