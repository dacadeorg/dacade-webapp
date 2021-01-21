<template>
  <section>
    <h2 class="dark-white">
      <b>
        Achievements
      </b>
    </h2>
    <div
      v-if="learningPoints && Object.keys(learningPoints).length"
      class="row mt-4"
    >
      <div
        v-for="(lp, key) in learningPoints"
        :key="lp.key"
        class="col-md-3 mb-4"
      >
        <div v-if="communityDataPreview[key]">
          <b-card
            :img-src="communityDataPreview[key].imgUrl"
            img-alt="Image"
            img-top
            tag="article"
            rounded="circle"
            class="mb-2 small-shadow text-center bg-dark"
          >
            <b-card-text class="text-center">
              <h4>
                <b
                  class="learning-color"
                >{{ lp
                }}<span
                  class="muted-dark"
                >/{{ communityDataPreview[key].submissionPoints }}</span></b>
              </h4>
              <h4><b class="learning-color">Points</b></h4>
              <h4 class="muted-dark">
                <no-html :value="communityDataPreview[key].name" />
              </h4>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <div v-else class="mb-4">
      <p>
        You haven't solved a challenge.
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
      learningPoints: 'user/learningPoints',
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

.points {
  font-style: italic;
  font-size: 3em;
}

</style>
