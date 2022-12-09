<template>
  <div class="relative">
<!--  full screen loader  -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div class="flex flex-col items-center justify-center w-64 h-64 p-4 text-white bg-gray-900 rounded-lg">
        <svg class="w-12 h-12 animate-spin" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
          />
        </svg>
        <div class="text-center">
          <span class="mt-4 text-xl font-semibold">Syncing your account with discord...</span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

export default {
  scrollToTop: true,
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
  //   call discord api with token param
  //   if success, redirect to /discord-verification/success
  //   else redirect to error page

  this.discordCallback()
  },
  methods: {
    async discordCallback() {
      try{
        const code = this.$route.query.code
        if(!code){
          this.goToErrorPage()
          return
        }
        const res = await this.$api.post('auth/discord', {
          code,
        })
        if(!res){
          this.goToErrorPage()
          return
        }
        await this.$router.push('/discord-verification/success')
      }catch (e) {
        console.log({e})
        this.goToErrorPage()
      }

    },
    goToErrorPage() {
      this.$router.push('/discord-verification/error')
    },
  }

}
</script>
