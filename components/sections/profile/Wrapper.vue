<template>
  <Section padding="py-12">
    <Header v-if="isAuthenticated" />
    <div v-if="isAuthenticated" class="lg:flex">
      <div class="lg:w-1/4">
        <Navigation />
      </div>
      <div class="lg:w-3/4">
        <slot />
      </div>
    </div>
  </Section>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/sections/profile/Header'
import Navigation from '@/components/sections/profile/Navigation'
import Section from '@/components/ui/Section'

export default {
  name: 'ProfileWrapper',
  components: {
    Header,
    Section,
    Navigation,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/check',
    }),
  },
}
</script>
