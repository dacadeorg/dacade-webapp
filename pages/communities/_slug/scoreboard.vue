<template>
  <ThemeWrapper :colors="colors">
    <Section>
      <div class="lg:flex">
        <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
          <Navigation />
        </div>
        <div class="lg:hidden pt-8 pb-0 w-full lg:py-14">
          <MobileNav show-top-border />
        </div>
        <div class="w-full lg:w-3/4">
          <div
            class="
              pb-5
              w-full
              divide-y divide-y-gray-200
              space-y-4
              bg-gray-50
              lg:max-w-2xl
            "
          >
            <div v-for="(user, i) in users" :key="i" class="px-3">
              <div
                class="
                  h-36
                  md:h-24 md:flex
                  w-full
                  justify-between
                  md:justify-end
                  space-x-5 space-y-0
                  pt-6
                  md:flex-row-reverse md:pt-6
                "
              >
                <div
                  class="
                    relative
                    flex flex-row-reverse
                    md:w-full
                    md:justify-items-stretch
                    md:relative
                    md:text-right
                    md:right-0
                  "
                >
                  <div
                    class="
                      absolute
                      md:relative md:top-0
                      -bottom-28
                      md:-bottom-24
                      font-medium
                      text-gray-500
                      left-5
                      md:left-auto md:right-5
                      px-2
                      py-1
                      h-6
                      text-xs
                      bg-gray-200
                      rounded-full
                    "
                  >
                    {{ user.reputation }}
                  </div>
                </div>
                <div class="w-full md:w-auto">
                  <div class="text-lg font-medium">
                    {{ user.displayName }}
                  </div>
                  <div class="whitespace-nowrap text-base">
                    <span class="font-medium">
                      {{ user.feedbacks }}
                      <span class="font-normal">
                        {{ $t('feedbacks') }}
                      </span>
                    </span>
                  </div>
                </div>

                <div class="relative">
                  <div
                    class="
                      absolute
                      md:relative
                      right-2
                      md:-bottom-10
                      -bottom-14
                      md:top-0
                    "
                  >
                    <Avatar :user="user" size="large" />
                    <Badge
                      class="absolute left-9 top-10 w-6 h-6 bg-theme-accent"
                      value="57"
                      :custom-style="badgeStyles"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </ThemeWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Navigation from '@/components/sections/communities/Navigation'
import Badge from '@/components/ui/Badge'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import Section from '@/components/ui/Section'

export default {
  name: 'ScoreboardList',
  components: {
    Avatar,
    Navigation,
    ThemeWrapper,
    Badge,
    Section,
  },
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
  },
  props: {
    badgeStyles: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      users: [
        {
          displayName: 'Madaline',
          feedbacks: 158,
          reputation: '45REP',
        },
        {
          displayName: 'Bret',
          feedbacks: 157,
          reputation: '45REP',
        },
        {
          displayName: 'Haleigh',
          feedbacks: 158,
          reputation: '45REP',
        },
      ],
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
}
</script>
