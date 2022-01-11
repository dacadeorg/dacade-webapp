<template>
  <SectionWrapper
    :title="$t('communities.overview.courses.title')"
    :description="$t('communities.overview.courses.description')"
  >
    <CourseCard
      v-for="course in courses"
      :key="course.id"
      :course="course"
      :community="community"
    />
  </SectionWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import SectionWrapper from './_partials/SectionWrapper'
import CourseCard from '~/components/cards/course'

export default {
  name: 'CoursesOverview',
  components: {
    CourseCard,
    SectionWrapper,
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
