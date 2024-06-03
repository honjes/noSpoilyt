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
const videoUrl = localStorage.getItem("videoUrl") || ""

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
  } else if (videoInput.value.startsWith("https://www.youtube.com/")) {
    const videoParams = videoInput.value.replace("https://www.youtube.com/watch?v=", "").split("?")
    let newId = videoParams[0]
    let time = 0

    if (videoParams[1]) {
      time = videoParams[1].split("t=")[1]
    }
    videoId.value = newId

    return
  } else {
    videoId.value = e.target.value
    playerVars.value = {}
  }
}

function playerStateChange(event) {
  if (event.data === 1) {
    console.log("video playing")
    console.log("videoPlayer", videoPlayer.value)
    console.log("videoPlayer Video Element", videoPlayer.value.getElementsByTagName("iframe"))
    const player = videoPlayer.value.getElementsByTagName("iframe")[0]
    console.log("player", player.src)
    player.src = `http://localhost:5173/api/https://youtu.be/ftptSbslBDQ?t=18369`
    const antiSpoilBlock = document.createElement("div")
    player.classList.add("antiSpoil")
    antiSpoilBlock.classList.add("antiSpoil")
    console.log(player.getElementsByTagName("video"))
    player.insertAdjacentElement("beforeend", antiSpoilBlock)
    console.log("player", player)
  }
}
</script>

<template>
  <div>
    <iframe :src="videoUrl" />
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
