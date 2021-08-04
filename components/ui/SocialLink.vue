<template>
  <a
    :href="link.url"
    target="__blank"
    :title="link.title"
    class="
      h-14
      w-14
      border border-solid
      bg-gray-50
      border-gray-200
      box-border
      inline-flex
      items-center
      justify-center
      text-lg
      rounded-full
    "
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div
      v-if="icon"
      :title="link.title"
      class="w-4.5 inline-block"
      v-html="icon"
    />
  </a>
</template>

<script>
import DiscordIcon from '@/assets/icons/discord.svg?raw'
import TwitterIcon from '@/assets/icons/twitter.svg?raw'
import YoutubeIcon from '@/assets/icons/youtube.svg?raw'
export default {
  name: 'SocialLink',
  props: {
    link: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      icons: {
        discord: DiscordIcon,
        twitter: TwitterIcon,
        youtube: YoutubeIcon,
      },
    }
  },
  computed: {
    icon() {
      return this.icons[this.link.icon]
    },
  },
}
</script>
