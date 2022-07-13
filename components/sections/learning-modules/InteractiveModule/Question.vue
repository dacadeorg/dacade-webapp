<template>
  <div class="relative">
    <p>{{ data.title }}</p>
    <InteractiveModuleAnswer
      v-for="(answer, index) in answers" :key="index" :text="answer"
      :selected="selected === index"
      :correct="correct === index"
      :disable="disable"
      :timer-count="timerCount"
      @retry="$emit('retry')"
      @wrong="$emit('wrong')"
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
      timerCount: 0,
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
  watch: {
    timerCount(value, oldValue) {


      if (value === 0 && oldValue > 0) {
        this.$emit('retry');
        return;
      }

      if (value <= 0) return;

      setTimeout(() => {
        this.timerCount--;
      }, 1000);
    },
    select(value) {
      if (!value) {
        this.timerCount = 14;
      }
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
        return this.$emit('correct', index)
      }
      this.timerCount = 14;
      // this.disable = true;
      this.$emit('wrong', index);
    }
  }
}
</script>
