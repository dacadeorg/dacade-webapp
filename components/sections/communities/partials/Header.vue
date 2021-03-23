<template>
  <div>
    <h1 class="text-5xl leading-none text-gray-400">
      {{ title }}
    </h1>
    <h2 v-if="subtitle" class="text-5xl leading-none text-default font-normal">
      {{ subtitle }}
    </h2>
    <p v-if="description" class="my-5 text-.5xl w-10/12 leading-snug text-gray-700">
      {{ description }}
    </p>
  </div>
</template>
<script>
/* eslint-disable no-console */
// import RewardsSection from './partials/overview/Rewards'

export default {
  name: 'Header',
  props: {
    title: {
      default: null,
      type: String
    },
    subtitle: {
      default: null,
      type: String
    },
    description: {
      default: null,
      type: String
    }
  }
}
</script>
