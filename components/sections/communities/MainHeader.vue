<template>
  <Section :custom-color="community.colors.primary" padding="py-24">
    <div
      class="relative flex"
      :style="{
        color: community.colors.text
      }"
    >
      <div class="w-6/12 flex flex-col justify-between">
        <div class="relative">
          <h1 class="text-7.75xl leading-none mb-5 font-normal">
            {{ community.name }}
          </h1>
          <span class="text-.5xl leading-snug">
            {{ community.description || community.summary }}
          </span>
        </div>
        <div class="relative flex divide-x leading-loose">
          <span class="block py-1 px-3">{{ community.submissions }} Submissions</span>
          <span class="block py-1 px-3">{{ community.feedbacks || 0 }} Feedbacks</span>
        </div>
      </div>
      <div class="w-4/12 text-right ml-auto">
        <img :src="community.icon" class="w-full">
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
import Section from '../../ui/Section.vue'

export default {
  components: {
    Section
  },
  fetch ({ store, params }) {
    return firebase
      .database()
      .ref(`communityData/${params.slug}`)
      .once('value')
      .then((snapShot) => {
        const communityData = snapShot.val()
        store.commit('content/setCommunityData', communityData)
      })
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
