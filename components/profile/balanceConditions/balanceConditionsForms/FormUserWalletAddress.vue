<template>
  <!-- <div> -->
  <b-modal
    :id="id"
    :title="title"
    header-text-variant="light"
    hide-footer
  >
    <div>
      <p>{{ text }}</p>
      <b-form @submit.prevent="updateWalletAddress(key)">
        <b-form-group
          id="input-group-1"
          :label="coinNameWalletAddress"
          label-for="wallet-address"
        >
          <b-form-input
            id="wallet-address"
            v-model="addresses[coinName]"
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
            Submit new Address
          </b-button>
        </div>
      </b-form>
    </div>
  </b-modal>
  <!-- </div> -->
</template>

<script>

export default {
  props: {
    coinNameWalletAddress: {
      type: String,
      default: 'idk',
      required: true
    },
    onAddressChange: {
      type: Function,
      default () {
        return 'function'
      }
    },
    id: {
      type: String,
      required: true
    },
    modal: {
      type: String,
      required: true
    },
    // className: {
    //   type: String,
    //   required: true
    // },
    message: {
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

<style scoped>
.btn-cash-out {
  color: black;
  border: 2px solid #ffcc00;
  background: #ffcc00;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-cash-out:hover {
  cursor: pointer;
  border: 2px solid white;
}

.btn-edit {
  color: #64686b;
  background-color: none;
  border: 1.6px solid #64686b;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-edit:hover {
  color: black;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

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

.bg-black {
  background: black;
}

.DCN-icon {
  vertical-align: -2px;
  margin-left: -4px;
}

.notification {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-left: 6px solid #acb2be;
  border-radius: 0.35rem;
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  font-weight: bold;
  padding: 1em;
  padding-right: 2em;
  display: inline-block;
}

.overlay-text {
  font-size: 1.4em;
}

.social-media-post {
  border: none;
  border: 1.6px solid white;
  border-radius: 0.35rem;
  color: rgba(255, 255, 255, 1);
  font-style: italic;
  font-weight: bold;
  padding: 0.8em;
}

.unread {
  color: #53d1af;
  border-color: #53d1af;
}

.unread a {
  color: #53d1af;
}
</style>
