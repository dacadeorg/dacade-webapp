<template>
  <section>
    <h2 class="dark-white">
      <b>
        Reputation
      </b>
    </h2>
    <div
      v-if="reputation && Object.keys(reputation).length"
      class="row mt-4"
    >
      <div
        v-for="(rep, key) in reputation"
        :key="rep.key"
        class="col-md-3 mb-4"
      >
        <b-card
          tag="article"
          :style="{ borderBottomColor: communityDataPreview[key].color }"
          class="mb-2 small-shadow text-center bg-dark bg-rep"
        >
          <b-card-text class="text-center mt-4">
            <h4>
              <b class="teaching-color points">{{
                parseFloat(rep).toFixed(0)
              }}</b>
            </h4>
            <h4><b class="teaching-color">REPUTATION</b></h4>
            <h4 class="muted-dark">
              <no-html :value="communityDataPreview[key].name" />
            </h4>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <div v-else class="mb-4">
      <p>
        You didn't earn any reputation in a community yet.
      </p>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  computed: {
    ...mapGetters({
      user: 'user/data',
      reputation: 'user/reputation',
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  methods: {
    jobsDone () {
      this.removeErrors()
    }
  }
}
</script>

<style scoped>
.bg-rep {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.32rem;
  padding-bottom: 3em;
}

/* .bg-black {
  background: black;
}

/* .DCN-icon {
  vertical-align: -2px;
  margin-left: -4px;
} */

/* .overlay-text {
  font-size: 1.4em;
} */

.points {
  font-style: italic;
  font-size: 3em;
}

/* .unread {
  color: #53d1af;
  border-color: #53d1af;
}

.unread a {
  color: #53d1af;
} */
</style>
