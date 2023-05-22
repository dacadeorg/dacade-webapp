<template>
  <div class="flex items-center justify-center absolute min-h-screen top-0 w-full">
    <div v-if="!completed" class="relative p-6 text-center">
      <h1 class="text-3xl font-medium mb-7">
        {{ $t('notifications.emails.unsubscribe.confirm.title') }}
      </h1>
      <p class="text-lg" v-html="$t('notifications.emails.unsubscribe.confirm.text', {
        appName: $t('app.name'),
      })
        " />
      <div v-if="!completed" class="space-x-8 pt-8">
        <Button :disabled="loading" type="outline-primary" @click="confirm">
          {{
            !loading
            ? $t('notifications.emails.unsubscribe.button.confirm')
            : $t('notifications.emails.unsubscribe.button.loading')
          }}</Button>
        <Button v-if="!loading" link="/" target="_self">{{
          $t('notifications.emails.unsubscribe.button.cancel')
        }}</Button>
      </div>
      <p class="italic pt-6 opacity-80">
        {{ $t('notifications.emails.unsubscribe.warning') }}
      </p>
    </div>
    <div v-else class="relative p-6 text-center">
      <h1 class="text-3xl font-medium mb-7">
        {{ $t('notifications.emails.unsubscribe.success.title') }}
      </h1>
      <p class="text-lg" v-html="$t('notifications.emails.unsubscribe.confirm.text', {
        appName: $t('app.name'),
      })
        " />
      <div class="space-x-5 pt-8">
        <ArrowButton link="/" target="_self">{{
          $t('notifications.emails.unsubscribe.button.home')
        }}</ArrowButton>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/button'
import ArrowButton from '@/components/ui/button/Arrow'
/* eslint-disable no-console */

export default {
  components: {
    Button,
    ArrowButton,
  },
  layout: 'withoutFooter',
  data() {
    return {
      verified: false,
      loading: false,
      completed: false,
    }
  },
  methods: {
    async confirm() {
      if (this.loading || this.completed) return
      this.loading = true
      try {

        const { data } = await this.$api.put(
          'notifications/email/unsubscribe/' + this.$route.params.id
        )
        this.completed = true
        console.log(data)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    cancel() {
      alert('hello')
    },
  },
}
</script>
