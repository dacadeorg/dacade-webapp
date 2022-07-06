<template>
  <div class="relative">
    <p>{{ data.title }}</p>
    <InteractiveModuleAnswer
      v-for="(answer, index) in answers" :key="index" :text="answer"
      :selected="selected === index"
      :correct="correct === index"
      :disable="disable"
      @select="select(index)"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import InteractiveModuleAnswer from "./Answer";

export default {
  name: 'InteractiveModuleQuestion',
  components: {
    InteractiveModuleAnswer,
  },
  props: {
    data: {
      default: null,
      type: Object,
    },
    disable: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    answers() {
      return this.data?.answers?.length ? this.data.answers : [];
    },
    correct() {
      return this.data?.correct ? this.data.correct : 0;
    },
  },
  methods: {
    select(index) {
      if (this.disable) {
        return;
      }
      if (this.selected === index) {
        this.selected = null
        return;
      }
      this.selected = index;
      if (index === this.correct) {
        this.$emit('correct', index)
      }
    }
  }
}
</script>
