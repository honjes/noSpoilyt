<script setup lang="ts">
import { usePlayer } from "@vue-youtube/core"
import { YoutubeIframe } from "@vue-youtube/component"
import { ref } from "vue"
import { useRoute } from "vue-router"

const videoPlayer = ref()
const videoInput = ref("")
const videoId = ref("")
const playerVars = ref({ time: 0, autoplay: 1 })
const route = useRoute()

usePlayer(videoUrl, videoPlayer)

function getVideoId(e) {
  console.log(videoInput.value)
  if (videoInput === "") {
    return
  } else if (videoInput.value.startsWith("https://youtu.be")) {
    const videoParams = videoInput.value.replace("https://youtu.be/", "").split("?")
    let newId = videoParams[0]

    if (videoParams[1]) {
      const time = videoParams[1].split("t=")[1]
      playerVars.value.start = time
    }
    videoId.value = newId
    console.log(videoPlayer.value)
    return
  } else {
    videoId.value = e.target.value
    playerVars.value = {}
  }
}

function playerStateChange(event) {}
</script>

<template>
  <div>
    <div>
      <input type="text" v-model="videoInput" />
      <button @click="getVideoId">Submit</button>
    </div>
    <div v-if="Video !== ''">
      <YoutubeIframe ref="videoPlayer" :videoId="videoId" :playerVars="playerVars" @state-change="playerStateChange" />
    </div>
  </div>
</template>

<style lang="scss">
.antiSpoil {
  height: 100vh;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: black;
  .ytp-chrome-bottom {
    display: none;
  }
}
</style>

