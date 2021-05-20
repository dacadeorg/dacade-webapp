<template>
  <section>
    <div v-if="balance && Object.keys(balance).length" class="mt-4">
      <h4>
        <b> Balance: </b>
      </h4>
      <div v-if="balance.DCN" class="mb-4">
        <h4>
          Dacade coins:
          <b class="dark-white">
            {{ parseFloat(balance.DCN).toFixed(0) }}
            <coin />
          </b>
        </h4>
      </div>
      <div v-for="(balances, key) in balance" :key="key" class="mb-4">
        <div v-if="key !== 'DCN'">
          <h4>
            {{ key }} token:
            <b class="earning-color">
              {{ parseFloat(balances).toFixed(0) }}$
            </b>
          </h4>
          <balance-conditions :coin-name="key" />
        </div>
      </div>
    </div>
    <div v-else class="mb-6">
      <h4>
        <b> Balance: </b>
        <span class="dark-white">
          <b>0</b>
        </span>
        <coin height="22" />
      </h4>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import BalanceConditions from '@/components/profile/wallet/index.vue'

export default {
  components: {
    BalanceConditions,
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
      balance: 'user/balance',
    }),
  },
  methods: {
    jobsDone() {
      this.removeErrors()
    },
  },
}
</script>
