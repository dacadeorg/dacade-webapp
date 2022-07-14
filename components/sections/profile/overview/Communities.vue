<template>
  <ProfileOverviewSection title="Communities">
    <div class="grid md:grid-cols-2 gap-4">
      <div v-for="(reputation, i) in reputations" :key="i" class="block">
        <CommunityCardSmall title="Celo Blockchain" :data="reputation"/>
      </div>
    </div>
  </ProfileOverviewSection>

</template>

<script>
import {mapGetters} from "vuex";
import CommunityCardSmall from "~/components/cards/community/Small";
import ProfileOverviewSection from "~/components/sections/profile/overview/Section";

export default {
  name: "ProfileOverviewCommunities",
  components: {ProfileOverviewSection, CommunityCardSmall},
  computed: {
    ...mapGetters({
      reputations: 'user/reputations/list',
    }),
  }
}
</script>
