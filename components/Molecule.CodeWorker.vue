<template>
  <div />
</template>

<script setup lang="ts">
if (process.client) {
  const channel = new BroadcastChannel("highlight");
  const worker = new Worker("/highlight-worker.js", { type: "module" });

  channel.onmessage = (e) => {
    const { channelID, input, lang } = e.data;
    const cache = sessionStorage.getItem(channelID);

    if (cache) {
      channel.postMessage({ channelID, highlight: cache });
      return;
    }

    worker.postMessage({ channelID, input, lang });
  };
  worker.onmessage = (e) => {
    const { channelID, highlight } = e.data;
    sessionStorage.setItem(channelID, highlight);
    channel.postMessage({ channelID, highlight });
  };
}
</script>

<style scoped></style>
