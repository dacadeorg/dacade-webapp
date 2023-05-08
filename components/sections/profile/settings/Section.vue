<template>
    <div class="py-5.5">
      <div class="flex items-center">
        <h6
          class="text-xs leading-relaxed font-semibold pb-5 text-gray-500 uppercase"
        >
          {{ title }}
        </h6>
      </div>
  
      <slot />
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'ProfileOverviewSection',
    props: {
      title: {
        type: String,
        default: '',
      },
      seeMore: {
        type: Boolean,
        default: false,
      },
      seeAll: {
        type: Boolean,
        default: false,
      },
    },
  }
  </script>
  