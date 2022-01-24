<template>
  <div
    class="
      flex
      lg:flex
      p-2
      divide-x divide-gray-200
      bg-gray-50
      rounded-3xl
      group
      text-gray-700
      md:p-7
      mb-4
      w-full
      border-solid border border-gray-200
    "
  >
    <div class="flex flex-col pr-20 justify-between w-2/3">
      <div class="flex flex-col">
        <div class="text-lg font-medium leading-normal">
          {{ course.name }}
        </div>
        <div
          class="
            mt-2
            text-xxs
            px-2.5
            py-0.5
            bg-gray-200
            text-gray-500
            rounded-3xl
            max-w-max
            tracking-wider
            uppercase
            font-medium
          "
        >
          {{ $t('course.challenge.level') }}
        </div>
        <div class="text-sm mt-3 pb-2 max-w-xxs">
          {{ course.challenge.description }}
          {{ reward.amount }}
        </div>
      </div>
      <div>
        <nuxt-link :to="path">
          <Button
            :padding="false"
            class="py-2 px-5"
            :community-styles="true"
            type="outline-primary"
          >
            <span class="inline-block align-middle text-sm">{{
              $t('course.challenge.button')
            }}</span>
            <span class="inline-block align-middle">
              <ArrowRightIcon class="ml-7 text-accent hover:text-white" />
            </span>
          </Button>
        </nuxt-link>
      </div>
    </div>

    <div
      class="
        text-base text-left
        md:flex
        flex-start flex flex-col
        space-y-4
        pl-7
        pb-10
        w-1/3
        tracking-wider
      "
    >
      <Reward :reward="reward" size="small" />
      <div class="font-light text-sm max-w-xs pb-2 text-gray-700">
        {{ $t('course.challenge.description-1') }}
        {{ reward.amount }}
        {{ $t('course.challenge.description-2') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Reward from '@/components/cards/course/_partials/Reward.vue'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
export default {
  name: 'CourseCard',
  components: {
    Reward,
    Button,
    ArrowRightIcon,
  },
  props: {
    course: {
      default: () => {
        return {}
      },
      type: Object,
    },
    community: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    path() {
      return `/communities/${this.community.slug}/courses/${this.course.slug}`
    },
    reward() {
      return this.course?.challenge?.rewards?.find(
        (entity) => entity.type === 'SUBMISSION'
      )
    },
  },
  methods: {
    debug(event) {
      console.log('course', this.course)
      console.log('course challenge', this.course.slug)
      console.log('colors', this.colors)
    },
  },
}
</script>
