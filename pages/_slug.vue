<template>
  <div>
    <Navigation />
    {{ user }}
    {{ userData }}
    <div class="container">
      <nuxt-child :community-data="communityData" />
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
import { mapGetters, mapActions } from 'vuex'
/* eslint-disable no-console */

export default {
  components: {
    Navigation
  },
  data() {
    return {
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`LCData/${params.slug}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      communityData.key = params.slug // snapShot.key
      return { communityData }
    })
  },
  computed: {
    ...mapGetters({
      user: 'user',
      userData: 'getUsersData'
    })
  },
  created() {
    console.log('created')
    console.log('user:' + this.user)
    if (this.user) {
      this.getUsersDataStore(this.user.id)
    }
  },
  methods: {
    ...mapActions({
      getUsersDataStore: 'getUsersDataDb'
    })
  }
}
</script>
