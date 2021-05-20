<template>
  <Wrapper />
</template>

<script>
import Wrapper from '@/components/sections/profile/Wrapper'
// import Firebase from '@/plugins/firebase'

export default {
  name: 'Profile',
  components: {
    Wrapper,
  },
  mounted() {
    // Firebase.auth().currentUser.getIdToken().then(e => console.log(e))
  },
}
</script>
