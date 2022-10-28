<template>
  <div>
    <Button v-if="!connected" @click="connect">
      Connect wallet
    </Button>
    <Button v-if="connected" @click="disconnect">
      Disconnect wallet
    </Button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Button from "~/components/ui/button";

export default {
  components: {Button},
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
