<template>
  <span> {{ currency }} {{ token }}</span>
</template>

<script>
import { formatCurrency } from '@coingecko/cryptoformat'
export default {
  name: 'Currency',
  props: {
    value: {
      default: 0,
      type: Number,
    },
    token: {
      default: '',
      type: String,
    },
  },
  computed: {
    currency() {
      return formatCurrency(this.value, this.token, 'en', true, {
        decimalPlaces: 2,
        significantFigures: 3,
      })
    },
  },
}
</script>
