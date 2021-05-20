<template>
  <div
    class="lg:pt-5 sm:pt-5 md:pt-5 pt-14 absolute text-sm lg:text-gray-700 md:text-gray-700 sm:text-gray-700 cursor-pointer text-primary font-medium lg:font-normal md:font-normal sm:font-normal"
  >
    <div v-if="hasAddress">
      <a href="#">Set Address</a>
    </div>
    <div v-else>
      <a href="#">Change Address</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Wallet',
  computed: {
    hasAddress () {
      return false
    }
  }
}
</script>
