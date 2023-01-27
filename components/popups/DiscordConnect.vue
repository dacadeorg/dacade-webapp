<!-- eslint-disable camelcase -->
<template>
  <!--     connecting to discord modal -->
  <Modal :show="showDiscordModal" size="medium">
    <div class="px-6 pt-6">
      <div class="pb-7">
        <p class="text-.5xl font-medium leading-snug">
          {{ $t('profile.header.discord') }}
        </p>
      </div>

      <div class="pb-7 flex space-x-3">
        <Loader v-if="discordLoading" class="h-6 w-6 text-green-400 pt-6" />
        <p
          :class="
            discordError
              ? 'bg-red-50 text-red-700'
              : discordSuccess
              ? 'bg-green-50 text-green-700'
              : 'bg-white'
          "
          class="p-3 rounded text-.2xl font-medium leading-snug flex-1"
        >
          {{ getDiscordMessage() }}
        </p>
      </div>

      <div class="pb-7">
        <Button
          :disabled="discordLoading"
          class="-ml-4 font-semibold border-none!"
          type="outline-primary"
          @click="closeModal()"
        >
          {{ $t('profile.header.discord.close') }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '~/components/ui/Modal.vue'
import Loader from '~/components/ui/Loader.vue'
import Button from '@/components/ui/button'
export default {
  name: 'DiscordConnect',
  components: {
    Loader,
    Modal,
    Button,
  },
  data() {
    return {
      discordError: false,
      discordSuccess: false,
      discordLoading: false,
      showDiscordModal: false,
    }
  },
  mounted() {
    //   call discord api with token param
    this.discordCallback()
  },
  methods: {
    closeModal() {
      this.showDiscordModal = false
      this.discordError = false
      this.discordSuccess = false
      this.discordLoading = false
    },

    getDiscordMessage() {
      if (this.discordError) {
        return this.discordError
      }
      if (this.discordSuccess) {
        return this.$t('profile.header.discord.success')
      }
      return this.$t('profile.header.discord.connect')
    },

    async discordCallback() {
      try {
        const { code } = this.$route.query
        if (!code) {
          return
        }

        this.discordLoading = true
        this.showDiscordModal = true

        // eslint-disable-next-line camelcase
        const res = await this.$api.post('auth/discord', {
          code,
        })
        if (!res) {
          this.discordError = true
          return
        }
        this.discordSuccess = true
        await this.$store.dispatch('user/fetch')
      } catch (e) {
        console.log({e})
        this.discordError = e?.message?.message || this.$t('profile.header.discord.error')
      } finally {
        this.discordLoading = false
        this.$router.replace({ query: {} });
      }
    },
  },
}
</script>
