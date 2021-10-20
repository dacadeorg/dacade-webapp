<template>
  <div class="fixed w-screen h-screen inset-0 z-999">
    <div class="relative z-50 w-full h-full flex items-center justify-center">
      <slot />
    </div>
    <div class="opacity-25 absolute inset-0 z-0 bg-black" />
  </div>
</template>

<script>
export default {
  name: 'PopupModal',
}
</script>
