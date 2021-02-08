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
            'add-social-media-verification' + coinName
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
    // onUpdateVerification: {
    //   type: Function,
    //   default () {
    //     return 'function'
    //   }
    // },
    coinName: {
      type: String,
      required: true
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
    // updateUserVerifications (e) {
    //   this.$emit('submit')
    // }

    updateUserVerifications () {
      const verficationObject = {
        userId: this.user.id,
        displayName: this.user.displayName,
        verificationLink: this.inputUserVerifications.socialMedia,
        verificationType: 'socialMedia'
      }
      // console.log(verficationObject)
      this.$store.dispatch('createVerificationRequest', verficationObject)
      // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
      this.$router.go()
    }

  }

}
</script>
