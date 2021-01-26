<template>
  <b-modal
    :id="'cash-out-modal' + key"
    title="Cash Out"
    header-text-variant="light"
    hide-footer
  >
    Request to payout {{ balance }}$ in {{ key }} token to
    the {{ key }} address: {{ userWalletAddresses[key] }}
    <div class="text-center">
      <div
        class="btn-cash-out btn mt-4 mb-2 small-shadow"
        @click="
          createPayoutObject(key),
          $bvModal.hide('cash-out-modal' + key)
        "
      >
        Send request
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    method: {
      type: Function,
      default () {
        return 'function'
      }
    }
  },

  data () {
    return {
      userWalletAddresses: null
    }
  },

  computed: {
    ...mapGetters({
      balance: 'user/balance'
    })
  },

  methods: {
    createPayoutObject (e) {
      this.$emit('click')
    }
  }
}
</script>
