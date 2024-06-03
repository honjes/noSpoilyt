<script setup lang="ts">
import { usePlayer } from "@vue-youtube/core"
import { ref } from "vue"

interface YTPlayerVars {
  start: number
  autoplay: number
  controls: number
  cc_load_policy: number
  disablekb: number
}

const videoPlayer = ref()
const videoInput = ref("")
const videoId = ref("ftptSbslBDQ")
const playerVarsDefault: YTPlayerVars = { start: 0, autoplay: 1, controls: 0, cc_load_policy: 0, disablekb: 0 }
const playerVars = ref<YTPlayerVars>(playerVarsDefault)
const showIFrame = ref(true)

const startVideos = [
  "Ip0MJm5Ev9k",
  "HBW9pQJHg2o",
  "15-qNmbhTdg",
  "zrIJ3o3uf_E",
  "2sJLktzReAQ",
  "ITEEO-f60eM",
  "5TlFAFlfK2o",
  "b0hL4mJInm0",
  "eqFooFrAOjw",
  "qXStVuXNhb8",
  "U6e19tSdJd8",
]

const { instance } = usePlayer(videoId, videoPlayer, { playerVars: playerVars.value })

function getVideoId(urL: string) {
  if (urL.startsWith("https://youtu.be")) {
    return urL.replace("https://youtu.be/", "").split("?")[0]
  } else if (urL.startsWith("https://www.youtube.com/")) {
    return urL.replace("https://www.youtube.com/watch?v=", "").split("&")[0]
  } else {
    return urL
  }
}

function getVideoTime(urL: string) {
  if (urL.startsWith("https://youtu.be")) {
    const urlSplit = urL.replace("https://youtu.be/", "").split("?")
    if (urlSplit.length <= 1) {
      return false
    } else {
      return urlSplit[1].split("t=")[1]
    }
  } else if (urL.startsWith("https://www.youtube.com/")) {
    const urlSplit = urL.replace("https://www.youtube.com/watch?v=", "").split("t=")
    if (urlSplit.length <= 1) {
      return false
    } else {
      return urlSplit[1]
    }
  } else {
    return false
  }
}

function addVideoId(e) {
  const newVideoId = getVideoId(videoInput.value)
  if (newVideoId === "") {
    return
  } else {
    const videoTime = getVideoTime(videoInput.value)
    console.log("videoTime: ", videoTime)
    let time = 0

    if (videoTime !== false) {
      time = parseInt(videoTime)
    }
    instance.value?.loadVideoById({ ...playerVars.value, videoId: newVideoId, startSeconds: time })
    return
  }
}

/* function addVideoToPlaylistId() {
  const newVideoId = getVideoId(videoInput.value)
  if (newVideoId === "") {
    return
  } else {
    const videoTime = getVideoTime(videoInput.value)
    let time = 0

    if (videoTime !== false) {
      time = parseInt(videoTime)
    }
    instance.value?.loadPlaylist({
      playlist: ["zU9y354XAgM", newVideoId],
      startSeconds: time,
    })
    return
  }
} */

function loadPlaylist() {
  instance.value?.loadPlaylist({ playlist: startVideos, startSeconds: 0 })
}

function skipVideo(direction: "forward" | "backward", amount: number) {
  const player = videoPlayer.value
  console.log("instance: ", instance)
  const currentTime = instance.value?.getCurrentTime()
  console.log("currentTime: ", currentTime)
  const newTime = Math.floor(direction === "forward" ? currentTime + amount : currentTime - amount)
  console.log("newTime: ", newTime)
  instance.value?.seekTo(newTime, false)
}
</script>

<template>
  <div>
    <div><button @click="loadPlaylist">Load Playlist</button></div>
    <div>
      <input type="text" v-model="videoInput" />
      <button @click="addVideoId">See Video</button>
      <button @click="skipVideo('backward', 5 * 60)">-5m</button>
      <button @click="skipVideo('forward', 5 * 60)">+5m</button>
      <button @click="skipVideo('forward', 10 * 60)">+10m</button>
    </div>
    <div v-if="videoId !== '' && showIFrame">
      <div ref="videoPlayer" />
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

