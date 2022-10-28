<template>
  <div class="w-full lg:w-9/12 xl:w-2/">
    <div v-if="!cashable">
      <Hint class="mb-5"
        >{{ $t('profile.wallets.missing-info.warning') }}
        <span
          class="underline cursor-pointer"
          @click="showEditProfile = true"
          >{{ $t('profile.wallets.missing-info.action') }}</span
        ></Hint
      >
      <EditProfile :show="showEditProfile" @close="showEditProfile = false" />
    </div>
    <WalletCard
      v-for="wallet in wallets"
      :key="wallet.id"
      :details="wallet"
      :disabled="!cashable"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import EditProfile from '@/components/sections/profile/modals/EditProfile'
import WalletCard from '@/components/cards/Wallet'
import Hint from '@/components/ui/Hint'
import {getMetadataTitle} from '~/utilities/Metadata'

export default {
  name: 'Wallet',

  components: {
    WalletCard,
    EditProfile,
    Hint,
  },
  layout: 'profile',
  middleware: 'auth',
  data: () => ({
    showEditProfile: false,
  }),
  fetch({ store, error }) {
    return store.dispatch('user/wallets/all').catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.$t('navigation.profile.wallets')),
      // meta: getMetadataDescription(this.challenge.description)
    }
  },
  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
      user: 'user/get',
    }),
    cashable() {
      return this.user?.firstName && this.user?.lastName
    },
  },
}
</script>
