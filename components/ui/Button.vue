<template>
  <button
    class="outline-none focus:outline-none hover:outline-none cursor-pointer relative"
    :class="{
      'bg-primary text-white': type == 'primary',
      'py-4 px-7': padding,
      'bg-secondary text-black': type == 'secondary',
      'text-primary border border-solid border-primary bg-transparent hover:bg-primary hover:text-white': type == 'outline-primary',
      'text-secondary border border-solid border-secondary bg-transparent hover:bg-secondary hover:text-black': type == 'outline-secondary',
      'text-white border border-solid border-white bg-transparent hover:bg-white hover:text-primary': type == 'outline-white',
      'rounded-full': rounded
    }"
  >
    <!-- {{ text }} -->
    <slot />
  </button>
</template>

<script>
export default {
  name: 'DAButton',
  props: {
    text: {
      default: '',
      type: [Number, String]
    },
    rounded: {
      default: true,
      type: Boolean
    },
    type: {
      default: 'primary',
      type: String
    },
    padding: {
      default: true,
      type: Boolean
    }
  }
}
</script>
