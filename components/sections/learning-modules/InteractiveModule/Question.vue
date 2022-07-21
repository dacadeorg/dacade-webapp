<template>
  <div class="relative">
    <h4 class="pt-6 font-normal">{{ data.title }}</h4>
    <InteractiveModuleAnswer
      v-for="(answer, index) in randomizedAnswers"
      :key="index"
      :text="answer.text"
      :selected="selected === answer.id"
      :correct="correct === answer.id"
      :disable="disable"
      :timer-count="timerCount"
      @retry="$emit('retry')"
      @wrong="$emit('wrong')"
      @select="select(answer.id)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InteractiveModuleAnswer from './Answer'

const RETRY_TIME = 14

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
    },
  },
  data() {
    return {
      selected: null,
      timerCount: 0,
      randomizedAnswers: [],
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    answers() {
      return this.data?.answers?.length
        ? this.data.answers.map((answer, index) => ({
            text: answer,
            id: index,
          }))
        : []
    },
    correct() {
      return this.data?.correct ? this.data.correct : 0
    },
  },
  watch: {
    timerCount(value, oldValue) {
      if (value === 0 && oldValue > 0) {
        this.$emit('retry')
        this.selected = null
        this.shuffle(this.answers)
        return
      }

      if (value <= 0) return

      setTimeout(() => {
        this.timerCount--
      }, 1000)
    },
    answers(value) {
      this.shuffle(value)
    },
  },
  mounted() {
    this.shuffle(this.answers)
  },
  methods: {
    select(index) {
      if (this.disable) {
        return
      }
      if (this.selected === index) {
        this.selected = null
        return
      }
      this.selected = index
      if (index === this.correct) {
        return this.$emit('correct', index)
      }
      this.triggerRetryCountdown()
      // this.disable = true;
      this.$emit('wrong', index)
    },
    shuffle(array) {
      this.randomizedAnswers = [...array]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      this.$forceUpdate()
    },
    triggerRetryCountdown() {
      this.timerCount = RETRY_TIME
    },
  },
}
</script>
