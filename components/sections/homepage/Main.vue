/* eslint-disable vue/no-v-html */
<template>
  <Section padding="p-0">
    <div class="w-full lg:py-24 pt-24 pb-8">
      <h1
        class="lg:text-8xl md:text-6xl text-5xl leading-none tracking-tighter"
      >
        {{ $t('page.index.main.title') }}
      </h1>
      <p
        class="lg:text-8xl md:text-6xl text-2xl py-2 lg:py-0 md:py-0 sm:py-0 text-black lg:text-gray-400 md:text-gray-400 sm:text-gray-400 leading-none tracking-tighter"
      >
        {{ $t('page.index.main.subtitle') }}
      </p>
    </div>
    <div class="flex justify-between">
      <div class="w-full max-w-xs hidden lg:block">
        <nuxt-link :to="localePath('/communities')">
          <ArrowButton min-width-class="min-w-62" class="py-4 pl-7.5 pr-5.75"
            >{{ $t('page.index.main.button') }}
          </ArrowButton>
        </nuxt-link>
        <VideoPopup />
      </div>
      <div
        class="flex flex-col md:flex-row md:divide-y-0 divide-y divide-gray-900 divide-dotted space-y-5 md:space-y-0 space-x-0 md:space-x-5 justify-end"
      >
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="w-full lg:max-w-.5xs pt-5 md:pt-0"
        >
          <NumberedCard
            :index="i + 1"
            :title="$t(card.title)"
            :text="$t(card.body)"
          />
        </div>
      </div>
    </div>

    <div class="lg:hidden pt-10">
      <nuxt-link :to="localePath('/communities')">
        <ArrowButton min-width-class="min-w-62" class="py-4 pl-7.5 pr-5.75"
          >{{ $t('page.index.main.button') }}
        </ArrowButton>
      </nuxt-link>
      <VideoPopup />

      <!-- <span class="lg:block md:block hidden text-primary-dark mt-4.5 text-base">
        <span class="font-medium">{{ $t('app.name') }}</span>
        <span class="font-light">{{
          $t('page.index.main.button.description')
        }}</span>
      </span> -->
    </div>
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import NumberedCard from '@/components/cards/Numbered'
import VideoPopup from '@/components/popups/Video'
import ArrowButton from '@/components/ui/button/Arrow'


export default {
  name: 'MainSection',
  components: {
    Section,
    ArrowButton,
    VideoPopup,
    NumberedCard,
  },
  data() {
    return {
      cards: [
        {
          title: 'page.index.main.cards.first.title',
          body: 'page.index.main.cards.first.body',
        },
        {
          title: 'page.index.main.cards.second.title',
          body: 'page.index.main.cards.second.body',
        },
        {
          title: 'page.index.main.cards.third.title',
          body: 'page.index.main.cards.third.body',
        },
      ],
    }
  },

}
</script>
