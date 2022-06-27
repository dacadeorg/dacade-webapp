<template>
  <div class="bg-blue_lighter border border-solid border-blue_light w-full rounded-3.5xl items-center flex md:flex-row flex-col pt-6 pb-4 md:pl-8 pl-5 pr-4">
    <div class="md:w-96">
      <p class="inline-block px-2 text-primary text-lg font-medium pb-3 md:pb-0">{{ text }}</p>
    </div>

    <div class="md:ml-auto mr-auto">
        <Button
          class="hover:bg-primary group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium"
          type="outline-primary"
          :padding="false"
        >
          {{ $t('profile.referrals.button-text') }}
        </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/button'
export default {
  name: 'ReferralsList',
  components: {
     Button 
  },
  props: {
    text: {
      default: '',
      type: String,
    },
  },
}
</script>
