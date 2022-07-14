<template>
  <ProfileOverviewSection title="Referrals">
    <div class="flex space-x-4">
      <ReferralsList
        text="Invite your friends to Dacade and earn referral bounties"
      />
    </div>
    <div class="pt-8">
      <Request/>
    </div>
  </ProfileOverviewSection>
</template>

<script>
import ReferralsList from "~/components/list/ReferralsList";
import Request from "~/components/cards/profile/Request";
import ProfileOverviewSection from "~/components/sections/profile/overview/Section";
export default {
  name: "ProfileOverviewReferrals",
  components: {ProfileOverviewSection, Request, ReferralsList}
}
</script>
