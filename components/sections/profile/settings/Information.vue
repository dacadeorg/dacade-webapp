<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >
      <div class="grid grid-cols-2 gap-4">
         <div>data</div>
      </div>
    </ProfileSettingsSection>
  </template>
  
<script>
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'

export default {
  name: 'ProfileSettingsInformation',
  components: { ProfileSettingsSection },
}
</script>