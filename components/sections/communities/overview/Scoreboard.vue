<template>
  <SectionWrapper
    :title="$t('communities.overview.scoreboard.title')"
    :description="$t('communities.overview.scoreboard.description')"
  >
    <div
      class="
        w-full
        flex flex-col
        divide-y divide-solid divide-gray-200
        border border-gray-200 border-solid
        rounded-3xl
        overflow-hidden
      "
    >
      <ScoreboardCard
        v-for="(item, i) in list.slice(0, items)"
        :key="i"
        :index="i + 1"
        :value="item"
      />
      <div
        v-if="items < list.length"
        class="
          flex
          w-full
          md:flex
          space-x-5 space-y-0
          md:flex-row-reverse
          overflow-hidden
          bg-gray-50
          px-4
          py-8
          items-center
          justify-center
        "
      >
        <Button
          class="py-2 leading-tight px-5"
          :custom-style="buttonStyle"
          @click="loadMore"
        >
          <span class="inline-block align-middle text-sm">{{
            $t('course.scoreboard.button')
          }}</span>
          <span class="inline-block align-middle">
            <ArrowDownIcon class="ml-7 text-accent group-hover:text-white" />
          </span>
        </Button>
      </div>
    </div>
  </SectionWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import SectionWrapper from './_partials/SectionWrapper'
import ScoreboardCard from '@/components/cards/Scoreboard'
import Button from '@/components/ui/Button'
import ArrowDownIcon from '~/assets/icons/arrow-down.svg?inline'

export default {
  name: 'ScoreboardOverview',
  components: {
    ScoreboardCard,
    SectionWrapper,
    Button,
    ArrowDownIcon,
  },
  data() {
    return {
      items: 3,
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      list: 'communities/scoreboard/list',
      colors: 'ui/colors',
    }),
    buttonStyle() {
      return {
        color: this.colors.textAccent,
        borderColor: this.colors.textAccent,
        border: '1px solid',
        backgroundColor: 'transparent',
      }
    },
  },
  methods: {
    loadMore() {
      this.items = this.items + 10
    },
  },
}
</script>
