<template>
  <div class="border border-solid rounded-3.5xl pt-9 w-full">
    <nuxt-link :to="localePath(`/achievements/${data.id}`)">
      <div class="mx-auto w-full text-left px-7">
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
      <!-- <div class="border-t border-solid mt-4 py-4">
        <p class="text-base text-center font-normal">Mintable</p>
      </div> -->
      <div class="border-t flex justify-center items-center rounded-b-3.5xl border-solid bg-gray-100 mt-4 py-4">
        <Checkmark/>
        <p class="text-base text-center font-normal ml-1">NFT</p>
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
  },
  
  computed: {
    ...mapGetters({
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
  },
}
</script>
