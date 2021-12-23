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
        border-solid border-2 border-gray-200
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
              <span class="inline-block align-middle text-xs">learn more</span>
              <span class="inline-block align-middle">
                <ArrowRightIcon
                  class="ml-7 text-accent group-hover:text-white"
                />
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
          pl-10
          max-w-xs
        "
      >
        <Reward :reward="reward" size="small" class="mb-2" />
        <span class="font-light text-xs max-w-xs pt-2">
          By completing this challenge you can earn $100 in sUSC
        </span>
      </div>
      <!-- <Button @click="debug" /> -->
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
        color: this.colors.textAccent,
        borderColor: this.colors.textAccent,
        border: '1px solid',
        backgroundColor: 'transparent',
      }
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
