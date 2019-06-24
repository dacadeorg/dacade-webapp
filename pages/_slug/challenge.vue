<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        <p><i class="dacade-note">{{ communityData.challengeDescription }}</i></p>
        <h4>Challenge:</h4>
        <div v-html="communityData.challenge"></div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/submissions`
    }
  }
}
</script>
<style scoped>

</style>
