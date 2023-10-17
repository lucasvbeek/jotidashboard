<script setup>
import areasSound from './assets/bell-ring-01.mp3';
let { data: areas, pending: areasPending, _, refresh } = await useFetch(useRuntimeConfig().public.areasUrl);
let areasLastCheck = Date.now();

let playAreasSound = async function() {
  let audio = new Audio(areasSound);
  audio.play();
}


let refreshAreas = async function() {
  let prevCheckTime = areasLastCheck;
  areasLastCheck = Date.now();

  await refresh();

  if (areas.value.data.filter(x => Date.parse(x.updated_at) > prevCheckTime).length > 0) {
    playAreasSound();
  }
}
useIntervalFn(refreshAreas, 10000);

</script>
<template>
  <div class="min-h-screen bg-neutral-900 grid place-content-center">
    <section class="w-100">
      <div class="flex justify-between items-baseline">
        <h1 class="text-4xl text-gray-50 font-bold">
          Gebied status
        </h1>
        <div class="flex flex-row gap-4 items-baseline">
          <button class="bg-neutral-800 text-gray-400 p-2 rounded-md" @click="playAreasSound">Test sound</button>
          <p v-if="!areasPending" class="text-gray-200 text-lg">Laatste check: {{ useDateFormat(areasLastCheck).value }}</p>
        <p v-if="areasPending" class="text-gray-200 text-lg">Nu aan het checken...</p>
        </div>

      </div>
      <div class="grid grid-cols-6 gap-16 my-8">
        <!-- bg-red-400/10 bg-orange-400/10 bg-green-400/10 -->
        <div v-for="area in areas.data" class="p-12 rounded-md flex justify-center items-center flex-col" :class="'bg-' + area.status + '-400/10 '">
          <!-- text-red-400 text-orange-400 text-green-400 -->
          <h2 v-text="area.name" class="text-2xl text-center" :class="'text-' + area.status + '-400 '" />
          <p class="text-center text-neutral-500" v-text="useDateFormat(area.updated_at, 'HH:mm').value"></p>
        </div>
      </div>
    </section>
  </div>
</template>
