<template>
  <DefaultLayout>
    <Wrapper>
      <nuxt />
    </Wrapper>
  </DefaultLayout>
</template>
<script>
import Wrapper from '@/components/sections/profile/Wrapper'
import DefaultLayout from '@/components/layout/Default'
export default {
  components: {
    Wrapper,
    DefaultLayout,
  },
  layout: 'default',
}
</script>
