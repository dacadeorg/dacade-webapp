<template>
  <Popup :show="show" @close="close">
    <div class="py-8 overflow-hidden h-full w-full">
      <div
        class="bg-white my-auto lg:w-10/12 w-11/12 rounded-3.5xl relative mx-auto h-screen flex flex-col"
      >
        <div class="w-full flex-none">
          <Header @close="close" />
        </div>
        <div class="overflow-y-scroll flex-1 py-5 md:py-10 lg:p-20">
          <Section>
            <SubmissionView />
          </Section>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
// import { mapGetters } from 'vuex'
import Header from './_partials/Header.vue'
import Popup from '@/components/ui/Popup'
import Section from '@/components/ui/Section'
import SubmissionView from '@/components/sections/submissions/View'

export default {
  name: 'SubmissionPopup',
  components: {
    Popup,
    Header,
    SubmissionView,
    Section,
  },
  props: {
    show: {
      default: false,
      type: Boolean,
    },
    submissionId: {
      default: null,
      type: String,
    },
  },
  watch: {
    submissionId(value) {
      if (!value) return
      this.$store.dispatch('communities/challenges/submissions/find', value)
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
