<template>
  <div
    v-if="achievement"
    class="content-wrapper achievement-content mx-auto min-h-screen flex items-center py-16"
  >
    <div class="w-full">
      <div class="flex flex-col md:flex-row border rounded-3xl">
        <div
          class="flex justify-center items-center p-7 md:rounded-l-3xl rounded-t-3xl md:rounded-t-none w-full md:w-1/2 md:bg-none bg-gray-100"
        >
          <div
            :class="[
              'h-52 w-52',
              { 'p-12 rounded-full': isNotCertificateIcon },
            ]"
            :style="{
              backgroundColor: isNotCertificateIcon && backgroundColor,
            }"
          >
            <img :src="achievement?.metadata?.image" alt="certificate badge" />
          </div>
        </div>
        <div class="p-5 md:pt-7 md:px-7 md:pb-14 w-full md:w-1/2">
          <div>
            <h2
              class="font-medium leading-7 text-xl md:text-3xl mb-3 md:mb-1.5"
            >
              {{ achievement?.metadata?.name }}
            </h2>
            <p class="text-gray-700 md:text-base text-sm">
              {{
                achievement?.metadata?.narrative ||
                achievement?.metadata?.description
              }}
            </p>
          </div>

          <div class="mt-5 flex flex-col md:gap-6 gap-5">
            <AchievementViewItem :name="$t('profile.achievement.award')">
              <div
                class="inline-flex items-center space-x-2 pr-3 bg-gray-200 p-1 rounded-full"
              >
                <Avatar :user="achievement?.user"  size="small-fixed" />
                <p class="text-sm md:text-base">
                  {{ achievement?.metadata?.recipientName }}
                </p>
              </div>
            </AchievementViewItem>

            <AchievementViewItem :name="$t('profile.achievement.issued')">
              {{ achievement?.metadata?.issuerName }}
            </AchievementViewItem>

            <AchievementViewItem :name="$t('profile.achievement.date')">
              {{ issuedOn }}
            </AchievementViewItem>

            <AchievementViewItem
              v-if="achievement?.metadata?.comment"
              :name="$t('profile.achievement.comment')"
              mobile-block
              items-start
            >
              {{ achievement?.metadata?.comment }}
            </AchievementViewItem>

            <AchievementViewItem
              v-if="achievement?.metadata?.linkToWork"
              :name="$t('profile.achievement.link')"
              mobile-block
            >
              <AchievementLinkField :link="achievement?.metadata?.linkToWork" />
            </AchievementViewItem>
            <div v-if="mintable">
              <AchievementViewItem v-if="belongsToCurrentUser && !minted" :name="$t('profile.achievement.ipfs-metadata')">
                <a
                  :href="metadataPreviewURL"
                  target="_blank"
                  class="underline"
                  >Preview</a
                >
              </AchievementViewItem>
              <div class="w-full flex">
                <MintCertificate
                  v-if="!achievementMinted && belongsToCurrentUser"
                  :show="showMintCertificate"
                  @close="showMintCertificate = false"
                />
                <ArrowButton
                  v-if="belongsToCurrentUser && !minted"
                  target="__blank"
                  type="primary"
                  class="flex ml-auto mt-5"
                  @click="showMintCertificate = true"
                >
                  Mint certificate
                </ArrowButton>
              </div>
            </div>
          </div>

          <div
            v-if="minted"
            class="pt-5 mt-5 flex flex-col md:gap-3 gap-3 border-t border-t-solid"
          >
            <AchievementViewItem :name="$t('profile.achievement.issued-to')">
              <a :href="addressURL" target="_blank" class="text-xs underline">{{
                receiver
              }}</a>
            </AchievementViewItem>
            <!-- <AchievementViewItem :name="$t('profile.achievement.contract')">
              <a :href="contractURL" target="_blank" class="text-xs">
                {{ contract }}</a
              >
            </AchievementViewItem>
            <AchievementViewItem :name="$t('profile.achievement.token-id')">
              <span class="text-xs"> {{ achievement.minting.tokenId }}</span> -->
            <!-- </AchievementViewItem> -->
            <AchievementViewItem :name="$t('profile.achievement.mint-tx')">
              <a :href="txURL" target="_blank" class="text-xs underline">
                {{ achievement.minting.tx }}</a
              >
            </AchievementViewItem>
            <AchievementViewItem
              :name="$t('profile.achievement.ipfs-metadata')"
            >
              <a :href="ipfsUrl" target="_blank" class="text-xs underline">
                {{ achievement.minting.tokenURI }}</a
              >
            </AchievementViewItem>
          </div>
        </div>
      </div>
      <div class="text-center pt-16">
        <ul class="relative">
          <NavItem type="logo" class="w-8 h-8 md:w-11 md:h-11">
            <Logo />
          </NavItem>
          <NavItem type="brand mx-0.5">
            {{ $t('app.name') }}
          </NavItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '~/components/layout/Logo'
import NavItem from '~/components/ui/NavItem'
import Avatar from '~/components/ui/Avatar'
import DateManager from '~/utilities/DateManager'
import AchievementViewItem from '~/components/sections/profile/achievements/ListItem'
import AchievementLinkField from '~/components/sections/profile/achievements/LinkField'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
import ArrowButton from '@/components/ui/button/Arrow'
import MintCertificate from '@/components/sections/profile/modals/MintCertificate.vue'
import { truncateAddress } from '~/utilities/Address'
import { IPFS_URL } from '~/constants/wallet'
// import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'Achievement',
  components: {
    AchievementLinkField,
    AchievementViewItem,
    Avatar,
    Logo,
    NavItem,
    ArrowButton,
    MintCertificate,
    // Checkmark,
  },
  layout: 'achievement',

  data() {
    return {
      showMintCertificate: false,
    }
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('profile/certificates/find', { id: params.id }),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(
        this.achievement?.metadata?.name,
        this.$t('profile.achievement.title')
      ),
      meta: getMetadataDescription(this.achievement?.metadata?.description),
    }
  },
  computed: {
    ...mapGetters({
      achievement: 'profile/certificates/current',
      achievementMinted: 'profile/certificates/currentMinted',
      user: 'user/get',
    }),
    issuedOn() {
      if (!this.achievement?.metadata?.issuedOn) return null
      return DateManager.intlFormat(
        this.achievement.metadata.issuedOn,
        this.$i18n.locale,
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      )
    },
    backgroundColor() {
      return this.achievement?.community?.colors?.primary
    },
    minted() {
      return !!this.achievement?.minting?.tx
    },
    contract() {
      return truncateAddress(this.achievement?.minting?.contract)
    },
    receiver() {
      return truncateAddress(this.achievement?.minting?.receiver)
    },
    ipfsUrl() {
      return IPFS_URL + this.achievement?.minting?.tokenURI
    },
    txURL() {
      return `${process.env.NUXT_ENV_BLOCK_EXPLORER_URL}/tx/${this.achievement?.minting?.tx}`
    },
    addressURL() {
      return `${process.env.NUXT_ENV_BLOCK_EXPLORER_URL}/address/${this.achievement?.minting?.receiver}`
    },
    contractURL() {
      return `${process.env.NUXT_ENV_BLOCK_EXPLORER_URL}/address/${this.achievement?.minting?.contract}`
    },
    metadataPreviewURL() {
      return `${process.env.NUXT_ENV_API_BASE_URL}/certificates/${this.achievement?.id}/metadata-preview`
    },
    belongsToCurrentUser() {
      if (!this.user) return false
      return this.user.id === this.achievement?.user_id
    },
    mintable() {
      return this.achievement?.community?.can_mint_certificates
    },
    isNotCertificateIcon() {
      return !this.achievement?.metadata?.image?.includes('/img/certificates/')
    },
  },
}
</script>
