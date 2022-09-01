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
      <button
        class="p-1 py-0 bg-white border border-blue-600 text-blue-600"
        @click="copy"
      >
        {{ $t('profile.achievement.copy-button') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementLinkField',
  props: {
    link: {
      default: null,
      type: String,
    },
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.link)
    },
  },
}
</script>
