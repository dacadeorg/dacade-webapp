<template>
  <div>
    {{ address }}
    <button v-if="!connected" @click="connect">
      Connect button
    </button>
    <button v-if="connected" @click="disconnect">
      Disconnect
    </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      address: 'wallet/address',
      connected: 'wallet/connected'
    }),
  },
  methods: {
    async connect() {
      try {
        await this.$store.dispatch('wallet/connect');
      } catch (e) {
        console.log(e);
      }
    },
    async disconnect() {
      await this.$store.dispatch('wallet/disconnect');
      alert("disconnected")
    },
  },
  mounted() {
    this.$store.dispatch('wallet/check');
  }
};

</script>
