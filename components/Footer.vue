/* eslint-disable vue/no-v-html */
<template>
  <Section padding="pt-20">
    <div
      class="border-t border-t-solid border-gray-200 flex py-8 text-gray-400 text-base"
    >
      <div class="w-1/2">
        <p class="text-with-links block" v-html="$t('footer.text')" />
        <div class="mt-8 flex items-center">
          <a
            v-for="(partner, i) in partners"
            :key="i"
            :href="partner.url"
            :title="partner.name"
            target="__blank"
            class="inline-block mr-4.5"
            :class="{ 'ml-4.5': i > 0 }"
          >
            <img :src="partner.logo" :alt="partner.name">
          </a>
        </div>
      </div>
      <div class="w-1/2 text-right">
        <SocialLink
          v-for="(link, i) in socialLinks"
          :key="i"
          :link="link"
          :last="i === socialLinks.length - 1"
        />
        <p class="mt-8.5">
          <a href="http://policy.dacade.org" target="__blank">{{
            $t("footer.privacy-policy")
          }}</a>
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
// import Button from '@/components/ui/Button'

export default {
  name: 'Footer',
  components: {
    Section,
    SocialLink
    // Button,
  },
  data () {
    return {
      socialLinks: [
        {
          title: 'Telegram',
          url: 'https://t.me/dacade',
          icon: 'telegram-plane'
        },
        {
          title: 'Twitter',
          url: 'https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ',
          icon: 'twitter'
        },
        {
          title: 'Youtube',
          url: 'https://twitter.com/dacadeorg',
          icon: 'youtube'
        }
      ],
      partners: [
        {
          name: 'ApeUnit',
          url: 'https://apeunit.com',
          logo: ApeUnitLogo
        },
        {
          name: 'Octan Group',
          url: 'https://octan.group/',
          logo: OctanLogo
        }
      ]
    }
  }
}
</script>
