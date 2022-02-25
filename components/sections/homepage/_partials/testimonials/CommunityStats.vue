/* eslint-disable vue/no-v-html */
<template>
  <div class="p-7 bg-primary rounded-3.5xl text-white relative">
    <h3 class="m-0 text-4.5xl w-3/4">
      {{ $t('testimonials.community.title') }}
    </h3>
    <div class="relative mt-11 mb-5 divide-y divide-white divide-dotted">
      <div v-for="(stat, i) in stats" :key="i" class="py-5">
        <span class="block text-2xl mb-2">{{ stat.count }}</span>
        <p class="text-base w-3/4 m-0">
          <span class="font-medium">{{ stat.title }}</span>
          {{ stat.description }}
        </p>
      </div>
    </div>
    <a target="_blank" href="https://discord.gg/U38KQHDtHe">
      <Button type="outline-white">
        {{ $t('testimonials.community.join', { appName: $t('app.name') }) }}
        <DiscordIcon class="ml-3 align-middle h-6 inline-block" />
      </Button>
    </a>
  </div>
</template>

<script>
import Button from '@/components/ui/button'
import DiscordIcon from '@/assets/icons/discord.svg?inline'
export default {
  name: 'CommunityStats',
  components: {
    Button,
    DiscordIcon,
  },
  data() {
    return {
      stats: [
        {
          title: this.$t('testimonials.community.stats.card-1.title'),
          description: this.$t(
            'testimonials.community.stats.card-1.description'
          ),
          count: 1000,
        },
        {
          title: this.$t('testimonials.community.stats.card-2.title'),
          description: this.$t(
            'testimonials.community.stats.card-2.description'
          ),
          count: 1500,
        },
        {
          title: this.$t('testimonials.community.stats.card-3.title'),
          description: this.$t(
            'testimonials.community.stats.card-3.description'
          ),
          count: 3500,
        },
      ],
    }
  },
}
</script>
