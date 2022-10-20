<template>
<div></div>
</template>

<script>
// This component redirects to a new url of the achiements page
// It's just there to catch old links

export default {
  name: 'AchievementRedirect',
  created(){
    this.$router.replace(this.localePath(`/achievements/${this.$route.params.id}`));
  }
}
</script>
