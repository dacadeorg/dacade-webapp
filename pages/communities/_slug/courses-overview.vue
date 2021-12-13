<template>
  <div class="py-4 flex flex-col text-gray-700">
    <Header :subtitle="$t('communities.navigation.courses')" />
    <div
      class="
        h-36
        md:h-24 md:flex
        w-full
        justify-between
        md:justify-end
        space-x-5 space-y-0
        pt-6
        md:flex-row-reverse md:pt-6
      "
    >
      <span>HELLO</span>
    </div>

    <div
      class="
        my-24
        w-full
        divide-y divide-gray-200
        space-y-4
        bg-gray-50
        lg:max-w-2xl
        rounded-3.5xl
        overflow-hidden
      "
    >
      <div
        v-for="course in courses"
        :key="course.id"
        class="relative py-8 w-full bg-gray-200 text-black"
      >
        <nuxt-link
          class="text-white"
          :to="$navigation.community.coursePath('', course.slug)"
          >{{ course.name }}</nuxt-link
        >
      </div>
      <Button
        class="
          group-hover:bg-primary
          bg-gray-200
          border
          text-primary
          group-hover:text-white
          border-primary
        "
      >
        <span
          class="
            text-primary
            group-gover:bg-text-primary
            group-hover:text-white
            py-0
            inline-block
            align-middle
          "
          >{{ $t('page.index.main.button') }}</span
        >
        <span class="inline-block align-middle">
          <ArrowRightIcon class="ml-7 text-primary group-hover:text-white" />
        </span>
      </Button>
      <!-- <div v-for="(reward, i) in course.challenge.rewards" :key="i">
        <Reward :reward="reward" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/sections/communities/_partials/Header'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
// import Reward from '@/components/ui/Reward'

export default {
  name: 'ScoreboardList',
  components: {
    Header,
    Button,
    ArrowRightIcon,
    // Reward,
  },
  props: {
    badgeStyles: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/all', params.slug),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      courses: 'communities/courses/list',
      // course: 'communities/courses/current',
    }),
  },
}
</script>
