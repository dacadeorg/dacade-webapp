/* eslint-disable vue/no-v-html */
<template>
  <Section padding="py-32" type="secondary-light">
    <CommunitStats class="w-1/3 z-10" />
    <div class="absolute w-full h-full -top-10 left-0 z-">
      <span
        class="border border-solid boder-gray-200 flex items-center justify-center mx-auto rounded-full"
        :style="{
          width: '57vw',
          height: '57vw'
        }"
      >
        <span
          class="border border-solid boder-gray-200 block mx-auto rounded-full"
          :style="{
            width: '33vw',
            height: '33vw'
          }"
        />
      </span>
    </div>
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import CommunitStats from './partials/testimonials/CommunityStats'
// import Button from '@/components/ui/Button'
export default {
  name: 'TestimonialsSection',
  components: {
    Section,
    CommunitStats
    // Button
  },
  data () {
    return {}
  }
}
</script>
