<template>
  <main class="flex border border-midGray mx-28 rounded-3xl">
    <div
      class="flex justify-center items-center bg-midGray p-7 rounded-l-3xl w-1/2"
    >
      <img :src="image" alt="certificate badge" />
    </div>
    <div class="p-7 w-1/2">
      <div>
        <h2 class="font-medium text-3xl text-[#111827] mb-1">
          Introduction to Blockchain
        </h2>
        <p class="text-gray-700">
          This certificate is awarded for passing solidity development knowledge
          from the Solidity Development 101 course
        </p>
      </div>

      <div class="mt-5">
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Awarded to</p>
          <div class="flex items-center bg-midGray rounded-full p-1">
            <img
              :src="profilePic"
              alt="user pic"
              class="h-7 w-7 rounded-full"
            />
            <p class="text-sm px-2">Goldon Norman</p>
          </div>
        </div>
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Hash verification</p>
          <div class="flex items-center bg-midGray rounded-full p-0.5">
            <!-- <img :src="profilePic" alt="user pic" class="h-5 w-5 rounded-full" /> -->
            <div class="h-5 w-5 rounded-full bg-blue-700" />
            <p class="text-xs font-medium tracking-wide text-gray-500 px-2">
              VERIFIED
            </p>
          </div>
        </div>
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Issued by</p>
          <p class="text-gray-500">Dacade.org</p>
        </div>
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Date</p>
          <p class="text-gray-500 flex-1">29 June 2021</p>
        </div>
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Comment</p>
          <p class="text-gray-500 flex-1">
            The submission from the learner was great; they had clean
            implementation.
          </p>
        </div>
        <div class="flex mb-5 items-center">
          <p class="font-medium w-48">Link</p>
          <div class="border-2 border-midGray flex-1 relative p-2 rounded">
            <p class="text-gray-500 flex-1">
              https://dacade.org/communities/near
            </p>
            <div
              class="bg-gradient-to-l from-gray-200 absolute h-full w-full top-0 flex justify-end items-center pr-2"
            >
              <button
                class="p-1 py-0 bg-white border border-blue-600 text-blue-600"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Achievement',
  data() {
    return {
      image: require('~/assets/img/cert/intro.svg'),
      profilePic: require('~/assets/img/moritz-pic.png'),
    }
  },
}
</script>
