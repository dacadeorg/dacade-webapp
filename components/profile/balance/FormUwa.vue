<template>
  <b-form @submit.prevent="updateWalletAddress(key)">
    <b-form-group
      id="input-group-1"
      :label="test"
      label-for="wallet-address"
    >
      <b-form-input
        id="wallet-address"
        v-model="addresses[key]"
        type="text"
        required
        placeholder="Enter new wallet address"
      />
    </b-form-group>
    <div class="text-center">
      <b-button
        type="submit"
        class="btn-add btn mt-2 mb-2 small-shadow"
        @click="
          $bvModal.hide('add-address-modal2' + key)
        "
      >
        Submit new Address
      </b-button>
    </div>
  </b-form>
</template>

<script>

export default {
  props: {
    test: {
      type: String,
      default: 'idk',
      required: true
    },
    method: {
      type: Function,
      default () {
        return 'function'
      }
    }
  },

  data () {
    return {
      addresses: []
    }
  },

  methods: {
    updateWalletAddress (e) {
      this.$emit('submit')
    }
  }
}
</script>
