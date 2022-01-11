<template>
  <div class="flex flex-col">
    <h4 class="font-medium inline-block text-xl">
      {{ learningModule.title }}
    </h4>
    <span
      v-if="learningModule.duration"
      class="text-xxs mt-4 px-2 mb-2 bg-gray-200 rounded-3xl max-w-max"
      >{{ duration(learningModule.duration) }}</span
    >
    <span
      v-if="learningModule.description"
      class="text-sm mt-4 px-2 mb-2 rounded-3xl max-w-max"
      >{{ learningModule.description }}</span
    >
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
      default: '',
      type: String,
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
