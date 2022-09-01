<template>
  <div class="lg:w-9/12 xl:w-2/3">
    <div v-if="referrals && referrals.length" class="w-full relative">
      <div
        class="w-full flex flex-col rounded-3xl border border-solid border-gray-200 divide-y divide-solid divide-gray-200 overflow-hidden"
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
    </div>
    <EmptyState
      v-else
      :title="$t('referrals.empty-state.title')"
      :subtitle="$t('referrals.empty-state.subtitle')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Referral from '@/components/cards/profile/Referral'
import EmptyState from '@/components/ui/EmptyState'
import { getMetadataTitle } from '~/utilities/Metadata'

export default {
  name: 'Referrals',
  components: {
    Referral,
    EmptyState,
    InfiniteLoading,
  },
  layout: 'profile',
  middleware: 'auth',
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
  head() {
    return {
      title: getMetadataTitle(this.$t('navigation.profile.referrals')),
      // meta: getMetadataDescription(this.challenge.description)
    }
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
