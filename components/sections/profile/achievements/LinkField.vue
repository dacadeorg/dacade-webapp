<template>
  <div class="border relative p-2 rounded">
    <p
      :title="link"
      class="text-gray-500 line-clamp-1 break-all flex-1 text-sm md:text-base overflow-hidden"
    >
      {{ link }}
    </p>
    <div
      class="bg-gradient-to-l input-background absolute h-full w-40 top-0 flex justify-end items-center pr-2 right-0"
    >
    <nuxt-link :to="localePath(`/submissions/${currentSubmissionId}`)">

      <button
        class="p-1 py-0 bg-white border border-blue-600 text-blue-600"
        @click="copy"
      >
        {{ $t('profile.achievement.open') }}
      </button>

    </nuxt-link>
    </div>
  </div>
  
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'AchievementLinkField',
  props: {
    link: {
      default: null,
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      authUser: 'user/get',
      current: 'profile/certificates/current',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
    currentSubmissionId() {
      return this.current.submission.id
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.link)
    },
  },
}
</script>
