<template>
  <ProfileOverviewSection title="Achievements" see-more see-all>
    <div
      class="flex md:flex-row flex-wrap justify-between"
    >
      <AchievementCard/>
      <AchievementCard/>
      <AchievementCard/>
      <AchievementCard/>
    </div>
  </ProfileOverviewSection>
</template>

<script>
import ProfileOverviewSection from "~/components/sections/profile/overview/Section";
import AchievementCard from "~/components/cards/Achievement";

export default {
  name: "ProfileOverviewAchievements",
  components: {AchievementCard, ProfileOverviewSection}
}
</script>
