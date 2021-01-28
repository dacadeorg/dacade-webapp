<template>
  <b-form @submit.prevent="updateUserVerifications()">
    <p>
      Please make a post with your dacade username on
      an active social media account and submit the
      link to the post below.
    </p>
    <b>
      Example:
    </b>
    <div class="social-media-post mb-4">
      Verifying my dacade.org username
      {{ user.displayName }}.
    </div>
    <b-form-group
      id="input-group-verification"
      label-for="wallet-address"
    >
      <b-form-input
        id="wallet-address"
        v-model="
          inputUserVerifications['socialMedia']
        "
        type="text"
        required
        placeholder="Verification Link"
      />
    </b-form-group>
    <div class="text-center">
      <b-button
        type="submit"
        class="btn-add btn mt-2 mb-2 small-shadow"
        @click="
          $bvModal.hide(
            'add-social-media-verification' + key
          )
        "
      >
        Submit Verification
      </b-button>
    </div>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    onUpdateVerification: {
      type: Function,
      default () {
        return 'function'
      }
    }
  },

  data () {
    return {
      inputUserVerifications: []

    }
  },
  computed: {
    ...mapGetters({
      user: 'user/data'
    })
  },
  methods: {
    updateUserVerifications (e) {
      this.$emit('submit')
    }

  }

}
</script>
