<template>
  <div class="relative flex items-center">
    <div class="flex md:w-28 w-40">
      <div class="relative border-2 border-solid border-white rounded-full">
        <img
          src="~/assets/img/yannick.png"
          alt=""
          class="md:w-10 md:h-10 w-8 h-8 rounded-full"
        />
      </div>
      <div class="absolute z-10 left-7 border-2 border-solid border-white rounded-full">
        <img
          src="~/assets/img/gabriela.png"
          alt=""
          class="md:w-10 md:h-10 w-8 h-8 rounded-full"
        />
      </div>
      <div class="left-14 z-20 absolute border-2 border-solid border-white rounded-full">
        <img
          src="~/assets/img/alex.jpg"
          alt=""
          class="md:w-10 md:h-10 w-8 h-8 rounded-full"
        />
      </div>
    </div>
    <div class=" text-sm md:flex text-gray-500 md:font-medium font-normal relative">
      <span class="md:inline-block">3 Friends have used your invite code</span>
      <span class=" border-r-2 hidden md:block border-solid border-gray-300 px-1 "/>
      <span class="md:inline-block md:px-3">4 Pending invitations</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Request',
  components: {},
}
</script>
