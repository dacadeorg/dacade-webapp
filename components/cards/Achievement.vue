<template>
  <div
    class="border border-solid rounded-3.5xl pt-9 overflow-hidden w-full h-full"
  >
    <nuxt-link
      :to="localePath(`/achievements/${data.id}`)"
      class="block h-full relative"
    >
      <div class="h-full flex flex-col">
        <div class="mx-auto flex-grow w-full text-left px-7">
          <div
            class="w-20 h-20 p-5 mx-auto rounded-full mb-5"
            :style="{ backgroundColor: data.community.colors.primary }"
          >
            <img :src="data.metadata.image" class="relative" />
          </div>
          <p class="text-sm font-medium text-center">
            {{ data.metadata.name }}
          </p>
        </div>
        <div
          class="rounded-b-3.5xl border-t border-solid mt-4 py-4 bort flex flex-none justify-center items-center space-x-1"
          :class="{ 'bg-gray-100': minted, 'invisible': !mintable }"
        >
          <div v-if="minted"><Checkmark /></div>
          <p class="text-base text-center font-normal">
            {{
              badgeText
            }}
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Checkmark from '~/assets/icons/checkMarkIcon.svg?inline'

export default {
  name: 'AchievementCard',
  components: {
    Checkmark,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    minting: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
    minted() {
      return !!this.data?.minting?.tx && this.mintable
    },
    mintable() {
      return this.data?.community?.can_mint_certificates
    },
    badgeText(){
      if(!this.mintable){
        return 'Minting N/A'
      }
      return  !this.minted && !this.minting ? this.$t('profile.achievement.mintable') : 'NFT'; 
    }
  },
}
</script>
