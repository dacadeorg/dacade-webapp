/* eslint-disable vue/no-v-html */
<template>
  <Section padding="py-32" type="secondary-light">
    <CommunitStats class="xl:w-1/3 mt-48 md:w-1/2 z-10 max-w-sm" />
    <Stories :list="stories" />
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import CommunitStats from './partials/testimonials/CommunityStats'
import Stories from './partials/testimonials/Stories'
// import Button from '@/components/ui/Button'
export default {
  name: 'TestimonialsSection',
  components: {
    Section,
    CommunitStats,
    Stories
    // Button
  },
  data () {
    return {
      stories: [
        {
          icon: require('~/assets/img/testimonial-sample.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-2.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-3.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-4.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-5.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-6.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-7.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-8.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        },
        {
          icon: require('~/assets/img/testimonial-sample-9.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."
        }
      ]
    }
  }
}
</script>
