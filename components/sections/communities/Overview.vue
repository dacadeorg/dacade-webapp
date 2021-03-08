<template>
  <div class="py-4">
    <div class="text-.5xl">
      <h3 class="font-medium leading-loose">
        {{ $t('communities.reward') }}
      </h3>
      <p class="font-normal leading-loose">
        {{ $t('communities.overview.subtitle') }}
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import Section from '../../ui/Section.vue'

export default {
  name: 'OverviewSection',
  components: {
    // Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
