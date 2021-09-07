<template>
  <div class="py-5 md:py-10 w-full bg-gray-50">
    <div
      class="
        w-full
        content-wrapper
        divide-y divide-2
        lg:divide-0 lg:divide-y-0
        divde-gray-100
        flex flex-col
        lg:flex-row
      "
    >
      <div
        class="
          w-full
          lg:w-1/2 lg:min-w-xs
          text-gray-900 text-2xl
          md:text-4xl
          font-medium
          pb-5
          flex-row
        "
      >
        <div>
          {{ $t('faq.title') }}
        </div>
        <div
          class="
            hidden
            text-gray-500 text-base
            font-normal
            lg:inline-block
            mt-2
            max-w-xs
          "
        >
          {{ $t('faq.subtitle') }}
          <a
            class="hover:text-gray-700 underline"
            href="https://discord.gg/U38KQHDtHe"
            target="_blank"
          >
            {{ $t('faq.discord') }}
          </a>
        </div>
      </div>
      <div
        v-if="community.faq"
        class="w-full lg:w-1/2 divide-y divide-2 space-y-4 divde-gray-100"
      >
        <QuestionCard
          v-for="(question, i) in community.faq"
          :key="i"
          :details="question"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import QuestionCard from '@/components/cards/Question'

export default {
  name: 'FaqCard',
  components: { QuestionCard },
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
  },
}
</script>
