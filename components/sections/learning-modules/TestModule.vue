<template>
  <div class="pt-14">
    <h3 class="leading-normal text-default capitalize font-medium">
      Cryptography
    </h3>
    <p class="text-sm pb-3 pt-1">
      <span
        :style="{
          color: colors.textAccent,
        }"
      >
        15 min
      </span>
      Interactive lessons
    </p>
    <Progress />
    <div class="pt-9">
      <h3 class="leading-normal text-default capitalize font-medium">
        Cryptography
      </h3>
      <span class="pt-1 text-gray-500 text-sm"
        >Knowledge test - Select the best option</span
      >
    </div>
    <div class="pt-4 relative pb-16">
      <h6 class="text-lg">What is cryptography?</h6>
      <div v-if="checked === '1'" class="my-5 relative">
        <div
          class="flex items-center relative z-50 w-full border-2 border-red-100 md:p-6 p-4 border-solid bg-transparent rounded checked-color"
        >
          <span><input type="checkbox" class="w-5 h-5 bg-transparent" /></span>
          <span class="pl-3 text-gray-500"
            >The practice and study of techniques for secure
            communication.</span
          >
        </div>
        <div
          class="bg-red-100 w-full -bottom-12 p-3 z-10 absolute border-2 border-red-100 border-solid text-red-900"
        >
          This answer is wrong. Try again.
        </div>
      </div>

      <div v-else-if="checked === '2'" class="my-5 relative">
        <div
          class="flex items-center relative z-50 w-full border-2 border-green-100 md:p-6 p-4 border-solid bg-transparent rounded checked-color"
        >
          <span><input type="checkbox" class="w-5 h-5 bg-transparent" /></span>
          <span class="pl-3 text-gray-500"
            >The practice and study of techniques for secure
            communication.</span
          >
        </div>
        <div
          class="bg-green-100 w-full -bottom-12 p-3 z-10 absolute border-2 border-green-100 border-solid text-green-600"
        >
          Well done!
        </div>
      </div>

      <div
        v-else
        class="flex items-center w-full border-2 border-red-200 border-solid bg-transparent md:p-6 p-4 my-5 rounded checked-color"
      >
        <span><input type="checkbox" class="w-5 h-5 bg-transparent" /></span>
        <span class="pl-3 text-gray-500"
          >The practice and study of techniques for secure communication.</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Progress from '@/components/ui/Progress'

export default {
  name: 'TestModule',
  components: {
    Progress,
  },
  props: {
    checked: {
      default: '',
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
}
</script>
