<template>
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
      max-w-3xl
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
        description of the course description of the course description of the
        course
      </div>
      <div class="align-start">
        <Button
          class="
            group-hover:bg-primary
            bg-gray-200
            border
            group-hover:text-white
            border-primary
          "
        >
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
            <ArrowRightIcon class="ml-7 text-primary group-hover:text-white" />
          </span>
        </Button>
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
      <span class="font-light text-xxs pb-2"> REWARD </span>
      <span class="font-light text-5xl pb-2"> 100$ </span>
      <Reward
        :reward="course.challenge.rewards[0]"
        size="medium"
        class="mb-2"
      />
      <span class="font-light text-xs max-w-xs">
        By completing this challenge you can earn $100 in sUSC
      </span>
    </div>
  </div>
</template>

<script>
import Reward from '@/components/ui/Reward.vue'
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
  },
}
</script>
