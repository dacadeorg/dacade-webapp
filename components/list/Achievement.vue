<template>
  <div class="text-left relative">
    <div
      :class="{
        'flex md:flex-row items-center justify-center mt-3': !extended,
        'space-y-4 mt-4': extended,
      }"
    >
      <AchievementCard
        v-for="achievement in achievements"
        :key="achievement.id"
        :user="user"
        :details="achievement"
        :extended="extended"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AchievementCard from '@/components/cards/Achievement.vue'
export default {
  name: 'AchievementList',
  components: {
    AchievementCard,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
    extended: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      achievements: 'user/certificates/list',
      user: 'user/get',
    }),
  },
}
</script>
