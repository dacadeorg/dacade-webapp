/* eslint-disable vue/no-v-html */
<template>
  <Section padding="p-0">
    <div class="w-3/4 py-24">
      <h1 class="text-8xl leading-none tracking-tighter">
        {{ $t("page.index.main.title") }}
      </h1>
      <p class="text-8xl text-gray-400 leading-none tracking-tighter">
        {{ $t("page.index.main.subtitle") }}
      </p>
    </div>
    <div class="flex">
      <div class="w-2/5">
        <Button :padding="false" class="pl-7.5">
          <span class="py-4 inline-block align-middle pr-5.75">{{
            $t("page.index.main.button")
          }}</span>
          <span class="inline-block py-3 pr-3 align-middle">
            <PlayIcon />
          </span>
        </Button>
        <span class="block text-primary-dark mt-4.5 text-base">
          <span class="font-medium">{{ $t("app.name") }}</span>
          <span class="font-light">{{
            $t("page.index.main.button.description")
          }}</span>
        </span>
      </div>
      <div v-for="(card, i) in cards" :key="i" class="w-1/5 pr-8.5">
        <NumberedCard
          :index="i + 1"
          :title="$t(card.title)"
          :text="$t(card.body)"
        />
      </div>
    </div>
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import NumberedCard from '@/components/cards/Numbered'
import PlayIcon from '~/assets/icons/play.svg?inline'
export default {
  name: 'MainSection',
  components: {
    Section,
    Button,
    PlayIcon,
    NumberedCard
  },
  data () {
    return {
      cards: [
        {
          title: 'page.index.main.cards.first.title',
          body: 'page.index.main.cards.first.body'
        },
        {
          title: 'page.index.main.cards.second.title',
          body: 'page.index.main.cards.second.body'
        },
        {
          title: 'page.index.main.cards.third.title',
          body: 'page.index.main.cards.third.body'
        }
      ]
    }
  }
}
</script>
