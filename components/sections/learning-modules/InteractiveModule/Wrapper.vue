<template>
  <div class="pt-14">
    <H3>
      {{ sectionTitle }}
    </H3>
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
      <H3>
        {{ title }}
      </H3>
      <span class="pt-1 text-gray-500 text-sm">{{ subtitle }}</span>
    </div>
    <div class="revolution">
      <!--equivalent to children in react-->
      <slot/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Progress from '@/components/ui/Progress'
import H3 from "~/components/ui/text/H3";

export default {
  name: 'InteractiveModuleWrapper',
  components: {
    H3,
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
