<template>
 <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
<div></div>
<div class="divide-y divide-gray-200">
  <div class="block mt-6 mb-6">
  <span class="text-gray-700 mb-4">Filter by</span>
  <div class="mt-6 mb-6">
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="radio" class="sr-only" checked/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Month</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Quarter</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Year</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">All time</span>
      </label>
    </div>
  </div>
 </div>
</div> 

<!------------------------>

<div class="pt-4">
  <div class="block">
  <span class="text-gray-700 mb-4">Sort</span>
  <div class="mt-6 mb-6">
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only" checked/>
        <span class="form-checkbox text-transparent rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Reputation</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-transparent rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Submission points</span>
      </label>
    </div>
    <ScoreboardFilter/>
  </div>
 </div>
</div> 
<div></div>

</div>

</template>

<script>
export default {
  name: 'Filter',

}
</script>
  