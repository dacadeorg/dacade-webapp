<template>
  <img class="DCN" src="/img/usp_iso_coin_dacade.png" :height="height" alt="coin">
</template>

<script>

export default {
  name: 'Coin',
  props: {
    height: {
      default: 22,
      type: [Number, String]
    }
  }
}
</script>

<style scoped>
.DCN {
  vertical-align: -4px;
  margin-left: -4px;
}
</style>
