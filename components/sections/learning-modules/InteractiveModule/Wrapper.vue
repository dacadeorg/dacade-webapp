<template>
  <div class="pt-14">
    <h3 class="leading-normal text-default capitalize font-medium">
      {{ sectionTitle }}
    </h3>
    <p class="text-sm pb-3 pt-1">
      <span
        :style="{
          color: colors.textAccent,
        }"
      >
        {{ duration }}
      </span>
      Interactive lessons
    </p>
    <Progress :percentage="percentage" community-styles/>
    <div class="pt-9">
      <h3 class="leading-normal text-default capitalize font-medium">
        {{ title }}
      </h3>
      <span class="pt-1 text-gray-500 text-sm">{{ subtitle }}</span>
    </div>
    <div class="pt-6">
      <!--equivalent to children in react-->
      <slot/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Progress from '@/components/ui/Progress'

export default {
  name: 'InteractiveModuleWrapper',
  components: {
    Progress,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    sectionTitle: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: ''
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),

  },
}
</script>
