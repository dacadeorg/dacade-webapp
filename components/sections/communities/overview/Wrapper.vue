<template>
  <div class="relative">
    <MainHeaderSection />
    <Section>
      <div class="w-full md:flex gap-36 mx-auto mt-14">
        <div class="w-4/12">
          <CommunitySidebar />
          <slot name="sidebar" />
        </div>
        <div class="w-2/3">
          <slot />
        </div>
      </div>
    </Section>
  </div>
</template>
<script>
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import CommunitySidebar from '@/components/sections/communities/overview/Sidebar'
import Section from '@/components/ui/Section'

export default {
  name: 'CommunityWrapper',
  components: {
    MainHeaderSection,
    Section,
    CommunitySidebar,
  },
}
</script>
