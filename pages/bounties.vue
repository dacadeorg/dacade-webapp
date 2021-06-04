<template>
  <div class="flex flex-col justify-center content-wrapper">
    <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">Bounties</h1>
    <div class="bg-gray-300">Hello</div>
    <!-- <BountyList /> -->
    <!-- <div v-if="communities" class="row w-full">
      <div
        v-for="community in communities"
        :key="community.key"
        class="flex pb-4"
      >
        <CommunityView :community="community" />
      </div>
    </div>
  </div>
  <div>
    <div class="container-fluid">
      <div v-if="learningPoints" class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <Bounty
            v-for="openBounty in bounties"
            :key="openBounty.id"
            :bounty="openBounty"
          />
        </div>
      </div>
        Hello
    </div> -->
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  fetch({ store }) {
    return store.dispatch('bounties/all')
  },
  computed: {
    ...mapGetters({
      bounties: 'bounties/list',
    }),
  },
  mounted() {
    console.log(this.bounties)
  },
}
</script>
