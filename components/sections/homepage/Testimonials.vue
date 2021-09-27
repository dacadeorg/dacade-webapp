/* eslint-disable vue/no-v-html */
<template>
  <Section padding="md:py-32 xl:py-40" type="secondary-light">
    <CommunitStats class="xl:w-1/3 mt-5 md:w-1/2 z-10 max-w-sm" />
    <Stories :list="stories" />
  </Section>
</template>

<script>
import CommunitStats from './partials/testimonials/CommunityStats'
import Stories from './partials/testimonials/Stories'
import Section from '@/components/ui/Section'
// import Button from '@/components/ui/Button'
export default {
  name: 'TestimonialsSection',
  components: {
    Section,
    CommunitStats,
    Stories,
    // Button
  },
  data() {
    return {
      stories: [
        {
          icon: require('~/assets/img/moritz-pic.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/alex.jpg'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/user_jet.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/user_tosin_edit.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/user_susen.png'),
          content:
            "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/gabriela.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/testimonial-sample-7.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/yannick.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
        {
          icon: require('~/assets/img/testimonial-sample-9.png'),
          // content:
          //   "Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.",
        },
      ],
    }
  },
}
</script>
