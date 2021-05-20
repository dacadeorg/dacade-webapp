<template>
  <div v-if="verificationPending === true" class="notification">
    <span>
      <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
    </span>
    Social media verification request pending.
  </div>
  <div v-else>
    <div
      v-b-modal="'add-social-media-verification' + coinName"
      class="btn-add btn mt-2 mb-4 small-shadow"
    >
      Add social media verification
    </div>
    <b-modal
      :id="'add-social-media-verification' + coinName"
      title="Add social media verification"
      header-text-variant="light"
      hide-footer
    >
      <div>
        <update-verification :coin-name="coinName" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdateVerification from '@/components/profile/wallet/forms/UpdateVerification.vue'

export default {
  components: {
    UpdateVerification,
  },
  props: {
    verificationPending: {
      type: Boolean,
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
    }),
  },
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
</style>
