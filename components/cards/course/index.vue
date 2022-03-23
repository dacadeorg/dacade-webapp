<template>
  <div
    class="
      flex flex-col
      sm:flex-row
      p-6
      divide-y
      sm:divide-y-0 sm:divide-x
      divide-gray-200
      bg-gray-50
      rounded-3xl
      group
      text-gray-700
      sm:p-7
      mb-4
      w-full
      border-solid border border-gray-200
    "
  >
    <div
      class="
        flex flex-col
        sm:pr-20
        justify-between
        w-full
        sm:w-3/5
        lg:w-2/3
        pb-6
        sm:pb-0
      "
    >
      <div class="flex flex-col">
        <div class="text-lg font-medium leading-normal">
          {{ course.name }}
        </div>
        <div
          v-if="course.level"
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
          {{ $t(`course.challenge.level-${course.level}`) }}
        </div>
        <div class="text-sm mt-3 pb-2 max-w-xxs">
          {{ course.description }}
        </div>
      </div>
      <div class="hidden sm:block">
        <nuxt-link :to="localePath(path)">
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
        sm:flex
        flex-start flex flex-col
        pt-6
        sm:pt-0
        space-y-4
        pb-5
        sm:pl-7 sm:pb-10
        w-full
        sm:w-2/5
        lg:w-1/3
        tracking-wider
      "
    >
      <Reward :reward="reward" size="small" />
      <div class="font-light text-sm max-w-xs pb-2 text-gray-700">
        {{
          $t(
            reward.stable
              ? 'course.challenge.reward.stable.description'
              : 'course.challenge.reward.description',
            {
              currency: `$`,
              amount: `${reward.amount}`,
              token: reward.token,
            }
          )
        }}
      </div>
    </div>
    <div class="block sm:hidden pt-6">
      <nuxt-link :to="localePath(path)">
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
</template>

<script>
import { mapGetters } from 'vuex'
import Reward from '@/components/cards/course/_partials/Reward.vue'
import Button from '@/components/ui/button'
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
