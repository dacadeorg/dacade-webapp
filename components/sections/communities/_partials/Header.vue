<template>
  <div>
    <h1
      class="text-4xl md:text-5xl leading-none text-gray-400"
      :class="hideTitleOnMobile ? 'hidden md:flex' : ''"
    >
      {{ title }}
    </h1>
    <h2
      v-if="subtitle"
      class="text-4xl md:text-5xl leading-none text-default font-normal"
    >
      {{ subtitle }}
    </h2>
    <p
      v-if="description"
      class="
        lg:w-7/12
        my-2
        md:my-5
        text-base
        md:text-.5xl
        w-full
        md:w-10/12
        leading-loose
        md:leading-snug
        text-gray-700
      "
    >
      {{ description }}
    </p>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {
  name: 'Header',
  props: {
    hideTitleOnMobile: {
      default: false,
      type: Boolean,
    },
    title: {
      default: null,
      type: String,
    },
    subtitle: {
      default: null,
      type: String,
    },
    description: {
      default: null,
      type: String,
    },
  },
}
</script>
