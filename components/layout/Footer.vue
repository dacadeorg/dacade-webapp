<template>
  <Section
    padding="pt-20"
    :type="backgroundColor ? 'secondary-light' : 'default'"
  >
    <div
      class="border-t border-t-solid border-gray-200 lg:flex md:flex py-8 text-gray-400 text-base lg:text-left text-center"
    >
      <div
        class="lg:w-1/2 w-full lg:border-none md:border-none border-b border-b-solid border-gray-200"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-with-links block" v-html="$t('footer.text')" />
        <div
          class="mt-8 mb-12 lg:mb-0 flex justify-center lg:justify-start items-center space-x-9"
        >
          <a
            v-for="(partner, i) in partners"
            :key="i"
            :href="partner.url"
            :title="partner.name"
            target="__blank"
            class="inline-block"
          >
            <img :src="partner.logo" :alt="partner.name" />
          </a>
        </div>
      </div>
      <div class="lg:w-1/2 w-full mt-6 md:mt-0 lg:text-right">
        <div class="space-x-2">
          <SocialLink v-for="(link, i) in socialLinks" :key="i" :link="link" />
        </div>
        <p class="mt-8.5">
          <nuxt-link :to="localePath('/privacy-policy')" target="__blank">{{
            $t('footer.privacy-policy')
          }}</nuxt-link>
        </p>
      </div>
    </div>
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import SocialLink from '@/components/ui/SocialLink'
import ApeUnitLogo from '@/assets/icons/partners/apeunit.svg?data'
import OctanLogo from '@/assets/icons/partners/octan.svg?data'
import CeloLogo from '@/assets/icons/partners/celo.svg?data'
export default {
  name: 'Footer',
  components: {
    Section,
    SocialLink,
  },
  props: {
    backgroundColor: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      socialLinks: [
        {
          title: 'Discord',
          url: 'https://discord.gg/U38KQHDtHe',
          icon: 'discord',
        },
        {
          title: 'Twitter',
          url: 'https://twitter.com/dacadeorg',
          icon: 'twitter',
        },
        {
          title: 'Youtube',
          url: 'https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ',
          icon: 'youtube',
        },
      ],
      partners: [
        {
          name: 'ApeUnit',
          url: 'https://apeunit.com',
          logo: ApeUnitLogo,
        },
        {
          name: 'Octan Group',
          url: 'https://octan.group/',
          logo: OctanLogo,
        },
        {
          name: 'Celo',
          url: 'https://celo.org',
          logo: CeloLogo,
        },
      ],
    }
  },
}
</script>
