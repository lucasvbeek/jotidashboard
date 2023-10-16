<script setup>
let { data: areas, pending: areasPending, _, refresh } = await useFetch("https://jotihunt.nl/api/2.0/areas");
let areasLastCheck = useDateFormat(Date.now());

let refreshAreas = async function() {
  areasLastCheck = useDateFormat(Date.now());

  await refresh();
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
        <p v-if="!areasPending" class="text-gray-200 text-lg">Laatste check: {{ areasLastCheck }}</p>
        <p v-if="areasPending" class="text-gray-200 text-lg">Nu aan het checken...</p>
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
