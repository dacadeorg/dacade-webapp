<template>
  <div class="">
    <div>
      <span v-click-outside="externalClick">
        <li
          class="inline-block align-middle relative"
          :class="[show === true ? 'z-50' : 'z-10']"
          @click="toggle"
        >
          <Button
            :custom-style="buttonStyles"
            :padding="false"
            type="secondary"
            class="p-0.5 pr-5 bg-gray-100 bg-opacity-75 hover:bg-gray-50"
          >
            <Avatar :user="user" />
            <span
              v-if="mainWallet"
              :style="{
                color: buttonStyles.color ? buttonStyles.color : null,
              }"
              class="align-middle ml-2.5 font-medium text-gray-500"
            >
              <Currency :value="mainWallet.balance" :token="mainWallet.token" />
            </span>
          </Button>
        </li>
        <div
          v-show="show"
          :style="{
            width: 'calc(100vw - 40px)',
            maxWidth: '340px',
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'hidden scroll',
          }"
          class="
            absolute
            top-14
            right-0
            z-40
            bg-white
            rounded-3.5xl
            no-scrollbar
            text-gray-900
          "
        >
          <div class="divide-y divide-gray-200">
            <div class="flex justify-between hover:bg-gray-50">
              <div class="w-full p-4 text-left flex">
                <div class="pr-3.5"><Avatar :user="user" size="medium" /></div>
                <div class="pt-2">
                  <span
                    class="
                      font-medium
                      text-base
                      block
                      leading-normal
                      capitalize
                    "
                    >{{ user.displayName }}</span
                  >
                  <nuxt-link
                    class="self-end text-sm block leading-normal"
                    to="/profile"
                  >
                    {{ $t('nav.view-profile') }}
                  </nuxt-link>
                </div>
              </div>
              <div
                class="
                  mr-4
                  mb-6
                  text-gray-500
                  self-end
                  text-right
                  whitespace-nowrap
                  align-text-bottom
                  font-normal
                  cursor-pointer
                  text-sm
                "
                @click="logout"
              >
                <span>{{ $t('nav.sign-out') }}</span>
              </div>
            </div>
            <div class="p-4">
              <BalanceList />
            </div>
            <div v-show="reputations.length > 1" class="p-4">
              <ReputationList />
            </div>
            <div class="p-4 flex justify-center bg-indigo-50">
              <div
                :class="[show === true ? 'z-50' : 'z-10']"
                @click="toggleInvite"
              >
                <Button
                  :loading="loading"
                  :padding="false"
                  :disabled="loading"
                  type="outline-primary"
                  class="flex btn-primary btn-lg py-2 px-5 align-middle"
                >
                  <span class="text-sm">{{
                    $t('nav.view-profile-codes')
                  }}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </span>
      <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
    </div>
    <div>
      <!-- <span v-click-outside="externalClickReferral"> -->
      <div
        v-show="showReferral"
        :style="{
          width: '35vw',
          maxHeight: 'calc(100vh - 90px)',
          maxWidth: '25vw',
          overflow: 'hidden scroll',
        }"
        class="
          absolute
          z-40
          top-0
          right-52
          bg-white
          rounded-3.5xl
          text-gray-900
          no-scrollbar
        "
      >
        <section class=""></section>
        <section class="ml-8">
          <div class="flex justify-between mr-2">
            <h1 class="text-3xl mt-7 mb-3 text-left">
              <div v-for="community in communities" :key="community.key">
                {{ community }}
              </div>
              {{ $t('modal.referral.bottom.ref-title') }}
              {{ $t('app.name') }}
            </h1>
            <button
              class="bg-gray-100 self-start mt-2 px-2.5 py-2.5"
              @click="toggleInvite"
            >
              <Crossmark class="text-xl text-gray-600 w-6" />
            </button>
          </div>

          <div>
            <p class="text-xl text-left font-light mb-8 mr-8">
              {{ $t('modal.referral.bottom.ref-text-1') }}
              {{ user.displayName }}
              {{ $t('modal.referral.bottom.ref-text-2') }}
              {{ $t('modal.referral.bottom.ref-text-3') }}
            </p>
          </div>
          <div class="mr-8 mb-5">
            <Input
              id="input-referral"
              name="referral"
              :placeholder="$t('modal.referral.link.placeholder')"
              :label="$t('modal.referral.link.label')"
              :value="form.referralCode"
              @input="form.referralCode = $event"
            />
          </div>
          <!-- <div class="relative flex bg-gray-200 mb-5"> -->
          <div class="mr-8">
            <Input
              id="input-referral-2"
              name="referral"
              :placeholder="$t('modal.referral.code.placeholder')"
              :label="$t('modal.referral.code.label')"
              :value="form.referralCode"
              @input="form.referralCode = $event"
            />
            <!-- <button class="absolute">copy</button> -->
          </div>
          <!-- </div> -->
          <div class="mr-8">
            <Referral
              v-for="referral in referrals"
              :key="referral.name"
              :referral="referral"
            />
          </div>
          <hr size="8px" color="black" />
          <p class="text-left pt-4 mr-8">
            {{ $t('modal.referral.bottom.message') }}
          </p>
        </section>
      </div>
      <!-- </span> -->
      <div v-if="showReferral" class="opacity-25 fixed inset-0 z-30 bg-black" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import Referral from '@/components/cards/Referral.vue'
import BalanceList from '@/components/list/Balance'
import ReputationList from '@/components/list/Reputation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Currency from '@/components/ui/Currency'
import Input from '@/components/ui/Input'
import Crossmark from '~/assets/icons/crossmark-2.svg?inline'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Avatar,
    Button,
    BalanceList,
    ReputationList,
    Currency,
    Crossmark,
    Input,
    Referral,
  },
  props: {
    buttonStyles: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      showReferral: false,
      form: {
        referralCode: 'https://www.dacade.org/invite/paul-123',
      },
    }
  },
  computed: {
    ...mapGetters({
      mainWallet: 'user/wallets/main',
      wallets: 'user/wallets/list',
      reputations: 'user/reputations/list',
      user: 'user/get',
    }),
    referrals() {
      return [
        {
          name: 'Celo Development 101',
          icon: '/img/communities/celo.svg',
          type: 'Referral',
          colors: {
            text: '#fff',
            accent: '#2E3337',
            textAccent: '#34b276',
            primary: '#35C07D',
          },
          reward: {
            amount: 25,
            token: 'cUSD',
          },
          url: 'https://forms.gle/PLjPugvJpj9m2Qn7A',
        },
        {
          name: 'Tezos Starter Course',
          image: '/img/communities/tacode.webp',
          type: 'Challenge',
          colors: {
            text: '#0D61FF',
            accent: '#0D61FF',
            textAccent: '#fff',
            primary: '#0D61FF',
          },
          reward: {
            amount: 12,
            token: 'tez',
          },
          url: 'https://tacode.dev/courses/dev-starter',
        },
      ]
    },
  },
  created() {
    this.$store.dispatch('user/wallets/all')
    this.$store.dispatch('user/reputations/all')
  },
  methods: {
    toggle() {
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    toggleInvite() {
      this.showReferral = !this.showReferral
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.showReferral)
    },
    externalClick() {
      if (this.show) {
        this.show = false
        this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      }
    },
    externalClickReferral() {
      if (this.showReferral) {
        // this.showReferral = false
        this.showReferral = !this.showReferral
        // this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      }
    },
    logout() {
      this.externalClick()
      this.$store.dispatch('auth/logout')
      this.$router.push('/communities')
    },
  },
}
</script>
