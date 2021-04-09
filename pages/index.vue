<template>
  <div class="relative">
    <MainSection />
    <CommunitiesSection />
    <TestimonialsSection />
  </div>
</template>
<script>

import MainSection from '@/components/sections/homepage/Main'
import CommunitiesSection from '@/components/sections/homepage/Communities'
import TestimonialsSection from '@/components/sections/homepage/Testimonials'
// import firebase from '@/plugins/firebase'

export default {
  components: {
    MainSection,
    CommunitiesSection,
    TestimonialsSection
  },
  fetch ({ store }) {
    return store.dispatch('communities/all')
  }
  // ,
  // mounted () {
  //   const helloWorld = firebase
  //     .functions()
  //     .httpsCallable('helloWorld')

  //   helloWorld()
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
}
</script>
