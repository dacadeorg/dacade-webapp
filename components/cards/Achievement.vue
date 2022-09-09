<template>
  <div class="border border-solid rounded-3.5xl px-7 py-9 w-full">
    <nuxt-link :to="localePath(`/profile/${username}/achievements/${data.id}`)">
      <div class="mx-auto w-full text-left">
        <div
          class="w-20 h-20 p-5 mx-auto rounded-full mb-5"
          :style="{ backgroundColor: data.community.colors.primary }"
        >
          <img :src="data.metadata.image" class="relative" />
        </div>
        <p class="text-sm font-medium text-center">
          {{ data.metadata.name }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AchievementCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
  },
}
</script>
