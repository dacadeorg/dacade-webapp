<template>
  <b-modal
    :id="userId"
    :title="title"
    header-text-variant="light"
    hide-footer
  >
    <div>
      <p>{{ text }}</p>
      <b-form @submit.prevent="updateWalletAddress(coinName)">
        <b-form-group
          id="input-group-1"
          :label="coinNameWalletAddress"
          label-for="wallet-address"
        >
          <b-form-input
            id="wallet-address"
            v-model="address"
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
              $bvModal.hide('add-address-modal2' + coinName)
            "
          >
            {{ submissionMessage }}
          </b-button>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    coinNameWalletAddress: {
      type: String,
      default: 'idk',
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    modal: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    submissionMessage: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    coinName: {
      type: String,
      required: true
    },
    walletAddress: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      address: ''
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/data'
    })
  },

  methods: {
    // updateWalletAddress (e) {
    //   this.$emit('submit')
    // }

    async updateWalletAddress (coinName) {
      const walletObject = {
        userId: this.user.id,
        walletAddress: this.address,
        token: coinName
      }

      await this.$store.dispatch('user/updateWalletAddress', walletObject)
      this.$emit('update')
    }
  }

}
</script>

<style scoped>

.btn-add {
  color: black;
  border: 2px solid #64686b;
  background: #64686b;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-add:hover {
  color: black;
  cursor: pointer;
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.3);
}

</style>
