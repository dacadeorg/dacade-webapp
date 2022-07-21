<template>
  <div class="py-5.5">
    <div class="flex items-center">
      <h6
        class="text-xs leading-relaxed font-semibold pb-5 text-gray-500 uppercase"
      >
        {{ title }}
      </h6>
      <!--      <div-->
      <!--        v-if="seeAll"-->
      <!--        class="text-primary flex items-center ml-auto cursor-pointer"-->
      <!--        @click="$emit('showAll')"-->
      <!--      >-->
      <!--        <span class="mr-2 text-sm"><a>See all</a></span>-->
      <!--        <span><Angleright/></span>-->
      <!--      </div>-->
    </div>

    <slot />
    <!--    <div-->
    <!--      v-if="seeMore" class="text-primary flex items-center pt-5 cursor-pointer text-sm space-x-2"-->
    <!--      @click="$emit('loadMore')">-->
    <!--      <span class="block"><PlusIcon/></span>-->
    <!--      <span class="block leading-none">See more</span>-->
    <!--    </div>-->
  </div>
</template>

<script>
// import PlusIcon from '~/assets/icons/plus.svg?inline'
// import Angleright from '~/assets/icons/angle-right.svg?inline'

export default {
  name: 'ProfileOverviewSection',
  // components: {PlusIcon, Angleright},
  props: {
    title: {
      type: String,
      default: '',
    },
    seeMore: {
      type: Boolean,
      default: false,
    },
    seeAll: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
