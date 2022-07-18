<template>
  <h3
    class="leading-normal text-default capitalize text-xl md:text-.5xl"
    :class="{ 'font-medium': bold, 'font-normal': !bold }"
  >
   <slot />
  </h3>
</template>

<script>
export default {
  name: "H3",
  props: {
    bold: {
      default: true,
      type: Boolean,
    },
  },
}
</script>
