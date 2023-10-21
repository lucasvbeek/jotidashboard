<script setup>
import sound from "../assets/bell-ring-01.mp3";
let {
  data: articles,
  pending: pending,
  _,
  refresh,
} = await useFetch(useRuntimeConfig().public.articlesUrl, {server: false});
let lastCheck = Date.now();

let playSound = async function () {
  let audio = new Audio(sound);
  audio.play();
};

let refreshArticles = async function () {
  let prevCheckTime = lastCheck;
  lastCheck = Date.now();

  await refresh();

  if (
    articles.value.data.filter((x) => Date.parse(x.publish_at) > prevCheckTime)
      .length > 0
  ) {
    playSound();
  }
};
useIntervalFn(refreshArticles, 5000);
</script>
<template>
  <section class="w-100 my-16">
    <div class="flex justify-between items-baseline">
      <h1 class="text-4xl text-gray-50 font-bold">Berichten</h1>
      <div class="flex flex-row gap-4 items-baseline">
        <button
          class="bg-neutral-800 text-gray-400 p-2 rounded-md"
          @click="playSound"
        >
          Test sound
        </button>
        <p v-if="!pending" class="text-gray-200 text-lg">
          Laatste check: {{ useDateFormat(lastCheck).value }}
        </p>
        <p v-if="pending" class="text-gray-200 text-lg">
          Nu aan het checken...
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-16 my-8">

      <div v-for="article in articles.data.slice(0, 3)" class="py-12 px-16 bg-neutral-800">
        <div class="flex justify-between">
            <h2 v-text="article.title" class="text-gray-200 text-2xl" />
            <p class="text-gray-300 text-xl" v-if="article.message.max_points">{{ article.message.max_points }} punten</p>
        </div>

        <div class="mt-8 max-w-6xl prose prose-invert" v-html="article.message.content" />

        <p class="text-gray-200 mt-16">Gepubliceerd op {{ useDateFormat(article.publish_at, 'DD-MM HH:mm').value }}</p>

      </div>
    </div>
  </section>
</template>
