<template>
  <div
    class="
      px-5
      pt-5
      pb-8
      bg-gray-50
      rounded-3xl
      min-h-2xs
      w-full
      border-solid border-2 border-gray-100
      md:mt-0
    "
  >
    <nuxt-link
      :to="
        localePath($navigation.community.learningModulePath(learningModule.id))
      "
    >
      <div class="flex flex-col">
        <div class="w-full">
          <h4 class="font-medium block text-xl">
            {{ learningModule.title }}
          </h4>
          <span
            v-if="learningModule.duration"
            class="
              text-xxs
              mt-4
              uppercase
              font-semibold
              px-2
              mb-2
              bg-gray-200
              rounded-3xl
              inline-block
              text-gray-500
            "
            >{{ duration(learningModule.duration) }}</span
          >
        </div>
        <span v-if="learningModule.description" class="text-sm mt-4 rounded-3xl"
          ><p class="line-clamp-3">
            {{ learningModule.description }}
          </p></span
        >
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import DateManager from '@/utilities/DateManager'

export default {
  name: 'CourseCard',
  props: {
    course: {
      default: () => {
        return {}
      },
      type: Object,
    },
    learningModule: {
      default: () => ({}),
      type: Object,
    },
  },
  methods: {
    duration(value) {
      if (!value) {
        return 0
      }
      return DateManager.humanize(value)
    },
  },
}
</script>
