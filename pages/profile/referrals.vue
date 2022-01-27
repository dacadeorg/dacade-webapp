<template>
  <Wrapper>
    <div
      class="
        lg:w-9/12
        xl:w-2/3
        flex flex-col
        rounded-3xl
        border border-solid border-gray-200
        divide-y divide-solid divide-gray-200
        overflow-hidden
      "
    >
      <Referral
        v-for="(referral, i) in referrals"
        :key="i"
        :referral="referral"
      />
    </div>
    <InfiniteLoading
      class="invisible"
      :distance="1000"
      @infinite="nextPage"
    ></InfiniteLoading>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Wrapper from '@/components/sections/profile/Wrapper'
import Referral from '@/components/cards/profile/Referral'

export default {
  name: 'Referrals',
  components: {
    Wrapper,
    Referral,
    InfiniteLoading,
  },
  data() {
    return {
      showButton: true,
      page: 0,
      loading: false,
    }
  },
  fetch({ store, error }) {
    return Promise.all([store.dispatch('user/referrals/all')]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      referrals: 'user/referrals/list',
      user: 'user/get',
    }),
  },
  methods: {
    async nextPage($state) {
      if (this.loading || !this.showButton) {
        $state.complete()
        return
      }
      this.loading = true
      const referralId = this.referrals[this.referrals.length - 1]?.id || null
      const list = await this.$store.dispatch('user/referrals/all', {
        startAfter: referralId,
      })
      this.page = this.page + 1
      this.loading = false

      if (!list.length) {
        this.showButton = false
        $state.complete()
        return
      }

      $state.loaded()
    },
  },
}
</script>
