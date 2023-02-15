<template>
  <component
    :is="component"
    class="btn outline-none focus:outline-none hover:outline-none cursor-pointer relative disabled:border-opacity-60 disabled:cursor-not-allowed"
    :disabled="disabled"
    :type="variant"
    :class="{
      'disabled:bg-gray-100 disabled:text-gray-400':
        type === 'primary' || type === 'secondary',
      'disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent':
        type.includes('outline'),
      'bg-primary hover:bg-primary-dark  text-white': type === 'primary',
      'lg:px-7 px-5': padding,
      'bg-secondary text-primary': type === 'secondary',
      'text-primary border border-solid border-primary bg-transparent hover:bg-primary hover:text-white':
        type === 'outline-primary',
      'text-secondary border border-solid border-secondary bg-transparent hover:bg-secondary hover:text-gray-900':
        type === 'outline-secondary',
      'text-white border border-solid border-white bg-transparent hover:bg-white hover:text-primary':
        type === 'outline-white',
      'text-gray-400 border border-solid border-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-200':
        type === 'outline-gray',
      'bg-transparent text-primary': type === 'link',
      'rounded-full': rounded,
      'community-button': communityStyles,
    }"
    :padding="[padding]"
    :margin="[margin]"
    :style="!disabled ? styles : null"
    :target="target"
    v-bind="{ ...componentProps }"
    v-on="inputListeners"
  >
    <slot />
  </component>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Button',
  props: {
    text: {
      default: '',
      type: [Number, String],
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    rounded: {
      default: true,
      type: Boolean,
    },
    type: {
      default: 'primary',
      type: String,
    },
    variant: {
      default: 'submit',
      type: String,
    },
    padding: {
      default: true,
      type: [Boolean, String],
    },
    margin: {
      default: '',
      type: String,
    },
    customStyle: {
      default: null,
      type: Object,
    },
    link: {
      default: null,
      type: String,
    },
    target: {
      default: '_self',
      type: String,
    },
    communityStyles: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    inputListeners() {
      const vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            vm.$emit('input', event.target.value)
          },
          click(event) {
            if (!vm.link) {
              vm.$emit('click', event)
            }
          },
        }
      )
    },
    styles() {
      let communityStyles = {}
      const isOutline = this.type && this.type.includes('outline')
      if (
        this.communityStyles &&
        this.colors &&
        Object.keys(this.colors).length
      ) {
        communityStyles = {
          borderColor: this.colors.textAccent,
          color: isOutline ? this.colors.textAccent : this.colors.text,
          backgroundColor: isOutline ? 'transparent' : this.colors.textAccent,
          '--button-color--hover': this.colors.text,
          '--button-background-color--hover': this.colors.textAccent,
          '--button-border-color--hover': this.colors.textAccent,
        }
      }

      return {
        ...communityStyles,
        ...(this.customStyle || {}),
      }
    },
    isNuxtLink() {
      return this.link?.startsWith('/')
    },
    component() {
      if (!this.link) return 'button'
      if (this.isNuxtLink) return 'nuxt-link'
      return 'a'
    },
    componentProps() {
      switch (this.component) {
        case 'nuxt-link':
          return {
            to: this.link,
          }
        case 'a':
          return {
            href: this.link,
          }
        default:
          return {}
      }
    },
  },
}
</script>
