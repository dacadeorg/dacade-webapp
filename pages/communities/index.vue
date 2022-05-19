<template>
  <div class="flex flex-col justify-center content-wrapper">
    <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
      <!-- {{ $t('nav.communities') }} -->
      <Skeletor width="50%" height="200" />
    </h1>
    <!-- <div v-if="communities" class="row w-full">
      <div
        v-for="community in communities"
        :key="community.key"
        class="flex pb-4"
      >
        <CommunityListCard :community="community" />
      </div>
    </div> -->
    <Skeletor v-for="i in 5" :key="i"  w="200" h="200" :size="100" as="div" />
  </div>
</template>

<script>
import { Skeletor } from 'v-skeletor'
import { mapGetters } from 'vuex'
// import CommunityListCard from '@/components/cards/community/List'
import 'v-skeletor/dist/v-skeletor.css';

export default {
  components: {
    // CommunityListCard,
    Skeletor
  },
  fetch({ store, error }) {
    return store.dispatch('communities/all').catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      communities: 'communities/list',
    }),

    isLoading() {
      return this.$store.state.communities.loading
    }
  },
    created(){
    // const fxn = getters.loading
    console.log(this.isLoading, "LOADIN!!!!")
  },
}
</script>

<style scoped>
  .v-skeletor{
    background-color: rebeccapurple;
  }
</style>
