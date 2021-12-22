<template>
  <div class="py-4 flex">
    <span
      class="
        w-1/5
        py-4
        mr-16
        flex flex-col
        text-gray-700 text-primary
        group-gover:bg-text-primary
        group-hover:text-black
        inline-block
        align-middle
      "
    >
      <span class="font-medium">{{
        $t('communities.navigation.courses')
      }}</span>

      <span class="text-xs font-light mt-2">
        here you can see the courses available and bla bla bla so on and so
        forth</span
      ></span
    >
    <div class="w-4/5 items-center flex flex-col">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        :community="community"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CourseCard from '~/components/cards/course'

export default {
  name: 'ScoreboardList',
  components: {
    CourseCard,
  },
  props: {
    badgeStyles: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      courses: 'communities/courses/list',
      list: 'communities/scoreboard/list',
    }),
  },
}
</script>
