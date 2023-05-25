<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <DropdownPopup>
    <div class="divide-y divide-gray-200">
      <div class="flex justify-between hover:bg-gray-50">
        <div class="w-full p-4 text-left flex items-center">
          <div class="pr-3.5">
            <Avatar
              :user="user"
              size="medium"
              :use-link="false"
              hide-verification-badge
            />
          </div>
          <div>
            <div class="flex items-center space-x-1">
              <span
                class="font-medium text-base block leading-normal capitalize"
                >{{ username }}</span
              >
              <span class="block pt-0.5">
                <VerifiedIcon v-if="isKycVerified" class="w-3.5 h-3.5" />
              </span>
            </div>
            <nuxt-link
              class="self-end text-sm block leading-normal"
              :to="localePath('/profile')"
            >
              {{ $t('nav.view-profile') }}
            </nuxt-link>
          </div>
        </div>
        <div
          class="mr-4 mb-6 text-gray-500 self-end text-right whitespace-nowrap align-text-bottom font-normal cursor-pointer text-sm"
          @click="logout"
        >
          <span>{{ $t('nav.sign-out') }}</span>
        </div>
      </div>
      <div v-if="wallets.length" class="p-4">
        <BalanceList />
      </div>
      <div v-if="reputations.length" class="p-4">
        <ReputationList />
      </div>
      <div v-if="showLanguageSwitcher">
        <LanguageList />
      </div>
      <div class="p-4 flex justify-center bg-indigo-50">
        <div class="z-10">
          <Button
            :padding="false"
            type="outline-primary"
            class="flex btn-primary btn-lg py-2 px-5 align-middle text-sm"
            @click="toggleInvite"
            >{{ $t('nav.view-profile-codes') }}
          </Button>
        </div>
      </div>
    </div>
  </DropdownPopup>
</template>

<script>
import { mapGetters } from 'vuex'
import BalanceList from '@/components/list/Balance'
import ReputationList from '@/components/list/Reputation'
import LanguageList from '@/components/list/Language'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/button'
import DropdownPopup from '~/components/ui/DropdownPopup'
import VerifiedIcon from '~/assets/icons/verified.svg?inline-block'

export default {
  name: 'UserProfileDropdown',
  components: {
    Avatar,
    Button,
    BalanceList,
    ReputationList,
    LanguageList,
    DropdownPopup,
    VerifiedIcon,
  },
  props: {
    buttonStyles: {
      default: null,
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
      reputations: 'user/reputations/list',
      user: 'user/get',
      isKycVerified: 'user/isKycVerified',
    }),
    showLanguageSwitcher() {
      return process.env.NUXT_ENV_SHOW_LANGUAGE_SELECTOR === 'true'
    },
    username() {
      return this.user?.displayName
    },
  },
  methods: {
    logout() {
      this.$emit('close')
      this.$store.dispatch('auth/logout')
      this.$router.push(this.localePath('/communities'))
    },
    toggleInvite() {
      this.$emit('close')
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
  },
}
</script>
