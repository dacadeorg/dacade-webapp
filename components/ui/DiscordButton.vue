<template>
  <a
    class="fixed bottom-5 right-5 z-999 md:w-10 w-14 cursor-pointer"
    href="https://discord.gg/eHYZr9dzan"
    target="_blank"
  >
    <DiscordButton />
  </a>
</template>
<script>
import DiscordButton from '~/assets/icons/discordButton.svg?inline'
export default {
  components: {
    DiscordButton,
  },
}
</script>
