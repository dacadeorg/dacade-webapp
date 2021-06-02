/* eslint-disable vue/no-v-html */
<template>
  <Section padding="p-0">
    <div class="lg:w-3/4 lg:py-24 pt-24 pb-8">
      <h1
        class="lg:text-8xl md:text-6xl text-5xl leading-none tracking-tighter"
      >
        {{ $t('page.index.main.title') }}
      </h1>
      <p
        class="
          lg:text-8xl
          md:text-6xl
          text-2xl
          py-2
          lg:py-0
          md:py-0
          sm:py-0
          text-black
          lg:text-gray-400
          md:text-gray-400
          sm:text-gray-400
          leading-none
          tracking-tighter
        "
      >
        {{ $t('page.index.main.subtitle') }}
      </p>
    </div>
    <div class="lg:flex md:flex">
      <div class="w-2/5 hidden lg:block">
        <nuxt-link to="/communities">
          <Button :padding="false" class="pl-7.5">
            <span class="py-2 inline-block align-middle pr-5.75">{{
              $t('page.index.main.button')
            }}</span>
            <span class="inline-block -py-1 pr-3 align-middle">
              <ArrowRightIcon class="ml-17" />
            </span>
          </Button>
        </nuxt-link>
        <VideoPopup />
      </div>
      <div v-for="(card, i) in cards" :key="i" class="lg:w-1/5 pr-8.5">
        <NumberedCard
          :index="i + 1"
          :title="$t(card.title)"
          :text="$t(card.body)"
        />
      </div>
    </div>

    <!-- <div class="lg:hidden pt-10">
      <nuxt-link to="/communities">
        <Button :padding="false" class="pl-7.5">
          <span class="py-4 inline-block text-lg align-middle pr-5.75">{{
            $t('page.index.main.button')
          }}</span>
          <span class="inline-block py-3 pr-3 align-middle">
            <PlayIcon />
          </span>
        </Button>
      </nuxt-link>
      <span class="lg:block md:block hidden text-primary-dark mt-4.5 text-base">
        <span class="font-medium">{{ $t('app.name') }}</span>
        <span class="font-light">{{
          $t('page.index.main.button.description')
        }}</span>
      </span>
    </div> -->
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import NumberedCard from '@/components/cards/Numbered'
import VideoPopup from '@/components/popups/Video'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'MainSection',
  components: {
    Section,
    ArrowRightIcon,
    Button,
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
