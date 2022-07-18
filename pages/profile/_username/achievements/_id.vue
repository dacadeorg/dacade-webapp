<template>
   <main class="flex flex-col md:flex-row border border-midGray md:mx-28 mx-2 rounded-3xl">
       <div class="flex justify-center items-center  p-7 md:rounded-l-3xl rounded-t-3xl md:rounded-t-none w-full md:w-1/2 md:bg-none bg-gray-200">
           <img :src="image" alt="certificate badge" />
       </div>
       <div class="p-2 md:p-7 w-full md:w-1/2">
           <div>
               <h2 class="font-medium text-xl md:text-3xl text-[#111827] mb-3 md:mb-1" >Introduction to Blockchain</h2>
               <p class="text-gray-700 md:text-base text-xs">This certificate is awarded for passing solidity development knowledge from the Solidity Development 101 course</p>
           </div>

           <div class="mt-5">
               <div class="flex mb-5 items-center ">
                   <p class="font-medium w-48 text-sm md:text-base">Awarded to</p>
                   <div class="flex items-center bg-midGray rounded-full">
                       <img :src="profilePic" alt="user pic" class="h-7 w-7 rounded-full" />
                       <p class="text-xs md:text-base px-2">Goldon Norman</p>
                   </div>
               </div>
               <div class="flex mb-5 items-center">
                   <p class="font-medium w-48 text-sm md:text-base">Hash verification</p>
                   <div class="flex items-center bg-midGray rounded-full p-0.5">
                       <!-- <img :src="profilePic" alt="user pic" class="h-5 w-5 rounded-full" /> -->
                       <div class="h-5 w-5 rounded-full bg-blue-700" />
                       <p class="text-xs md:text-base font-medium tracking-wide text-gray-500 px-2">VERIFIED</p>
                   </div>
               </div>
                <div class="flex mb-5 items-center">
                   <p class="font-medium w-48 text-sm md:text-base">Issued by</p>
                   <p class="text-gray-500 text-xs md:text-base">Dacade.org</p>
               </div>
               <div class="flex mb-5 items-center">
                   <p class="font-medium w-48 text-sm md:text-base">Date</p>
                   <p class="text-gray-500 flex-1 text-sm md:text-base">29 June 2021</p>
               </div>
               <div class="flex flex-col md:flex-row mb-5 items-start md:items-center">
                   <p class="font-medium w-48 text-sm md:text-base">Comment</p>
                   <p class="text-gray-500 flex-1 text-xs md:text-base">The submission from the learner was great; they had  clean implementation.</p>
               </div>
               <div class="flex flex-col md:flex-row mb-5 items-start md:items-center">
                   <p class="font-medium w-48 text-sm md:text-base">Link</p>
                   <div class="border-2 border-midGray flex-1 relative p-2 rounded md:w-max w-full">
                    <p class="text-gray-500 flex-1 text-xs md:text-base">https://dacade.org/communities/near</p>
                    <div class="bg-gradient-to-l from-gray-200 absolute h-full w-full top-0 flex justify-end items-center pr-2">
                        <button class="p-1 py-0 bg-white border border-blue-600 text-blue-600">Copy</button>
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
