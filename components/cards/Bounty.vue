<template>
  <div class="bounty mb-4">
    <nuxt-link :to="bounty.link">
      <h5 v-if="bounty.typ === 'review'" class="dark-white">
        <b> Feedback for Submission of {{ bounty.displayName }} </b>
      </h5>
      <h5 v-else class="dark-white">
        <b>
          {{ bounty.typ }}
        </b>
      </h5>
      <div>
        <b :style="{ color: bounty.color }">
          <no-html :value="bounty.lcName" />
        </b>
      </div>
      <div v-if="bounty.bountyText">
        {{ bounty.bountyText }}
      </div>
      <div>
        <span class="muted-dark">Reward:</span>
        <b class="dark-white">
          {{ bounty.reward }}
        </b>
        <coin height="18" />
      </div>
      <div v-if="bounty.hoursLeft && countDown">
        <span class="muted-dark">Time left:</span>
        <b v-if="countDown">
          <span v-if="countDown.days">{{ countDown.days }}d</span>
          <span v-if="countDown.hours || countDown.days"
            >{{ countDown.hours }}h</span
          >
          <span v-if="countDown.minutes || countDown.hours || countDown.days"
            >{{ countDown.minutes }}m</span
          >
          <span>{{ countDown.seconds }}s</span>
        </b>
      </div>
      <div v-if="bounty.typ === 'review'">
        <span class="muted-dark">Feedback:</span>
        <b v-if="bounty.reviews">
          {{ Object.keys(bounty.reviews).length }}
        </b>
        <b v-else> 0 </b>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Bounty',
  props: {
    bounty: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      interval: null,
      countDown: null,
      seconds: null,
    }
  },
  computed: {
    now() {
      return Date.now()
    },
  },
  created() {
    if (this.bounty && this.bounty.endTime) {
      this.counter()
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    counter() {
      this.interval = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime()
        // Find the distance between now and the count down date
        const distance = this.bounty.endTime - now

        this.countDown = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        }
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(this.interval)
          this.countDown = {}
        }
      }, 1000)
    },
  },
}
</script>

<style scoped>
.bounty {
  border: 1.6px solid #0000;
  border-radius: 0.35rem;
  background: #343b42;
  padding: 1em;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}

.bounty a {
  color: #acb2be;
  text-decoration: none;
}

.bounty:hover {
  border: 1.6px solid #53d1af;
  background: #343b42;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
</style>
