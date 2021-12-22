<template>
  <nuxt-link :to="{ path: path }">
    <div
      class="
        flex
        lg:flex
        p-2
        divide-x divide-dotted divide-gray-500
        bg-gray-100
        rounded-3xl
        group
        text-gray-700
        md:p-7
        mb-4
        w-11/12
      "
    >
      <div class="flex flex-col pr-20">
        <!-- <div class="w-full"> -->
        <div class="text-xl font-medium pb-2">
          {{ course.name }}
        </div>
        <!-- </div> -->
        <div class="text-xxs px-2 mb-2 bg-gray-200 rounded-3xl max-w-max">
          BEGINNER
        </div>
        <div class="text-xs pb-2 mb-5 max-w-xxs">
          {{ course.challenge.description }}
        </div>
        <div class="align-start" :colors="community.colors">
          <nuxt-link :to="path">
            <Button class="py-0" :custom-style="buttonStyle">
              <span
                class="
                  text-primary
                  group-gover:bg-text-primary
                  group-hover:text-white
                  inline-block
                  align-middle
                  text-xs
                "
                >learn more</span
              >
              <span class="inline-block align-middle">
                <ArrowRightIcon
                  class="ml-7 text-primary group-hover:text-white"
                />
              </span>
            </Button>
          </nuxt-link>
        </div>
      </div>
      <div>
        <!-- <div
        class="
          text-base text-left
          md:flex
          flex-start flex flex-col
          pl-10
          max-w-xs
        "
      >
        <span class="font-light text-xxs pb-2"> REWARD </span>
        <span class="font-light text-5xl pb-2">
          {{ reward.amount }}
        </span> -->
        <Reward :reward="reward" size="small" class="mb-2" />
        <span class="font-light text-xs max-w-xs">
          By completing this challenge you can earn $100 in sUSC
        </span>
        <!-- <Button @click="debug" /> -->
      </div>
    </div>
  </nuxt-link>
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
    buttonStyle() {
      return {
        borderColor: this.colors.themeAccent,
        color: this.colors.themeAccent,
        backgroundColor: 'transparent',
      }
    },
    methods: {
      debug(event) {
        console.log('course', this.course)
        console.log('course challenge', this.course.slug)
      },
      amount() {
        if (this.course.challenge.reward.type === 'SUBMISSION') {
          const a = this.course.challenge.rewards.map((i) => i.amount)
          return a
        }
      },
    },
  },
}
</script>
