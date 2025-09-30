<script setup>
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import {
  getCenter,
  getPageCenter,
  getOuterOffset,
  getInnerOffset,
  applyOuterOffset,
} from "./utils.js";

// Vars

const outerDiv = ref(null);
const innerDiv = ref(null);

const outerCenter = ref({ x: 0, y: 0 });
const innerCenter = computed(() => getCenter(outerDiv.value));

const pageCenter = computed(() => getPageCenter());

onMounted(() => {
  console.log("outerCenter", outerCenter.value);
  console.log("pageCenter", pageCenter.value);

  let startTime = Date.now();

  // Update position on every frame
  const updatePosition = () => {
    if (outerDiv.value && innerDiv.value) {
      // Animate outer div position
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (Math.sin((elapsed * Math.PI) / 1.5) + 1) / 2; // 0 to 1
      const xPos = (progress - 0.5) * 200;
      const rotation = progress * 45;
      const scale = 1 + progress;
      outerDiv.value.style.transform = `translateX(${xPos}px) translateY(100px) rotate(${rotation}deg) scale(${scale})`;

      // Update inner div offset
      outerCenter.value = getCenter(outerDiv.value);
      const offset = getOuterOffset(pageCenter.value, outerCenter.value);
      applyOuterOffset(innerDiv.value, offset, rotation, scale);
    }
    requestAnimationFrame(updatePosition);
  };
  requestAnimationFrame(updatePosition);
});
</script>

<template>
  <div class="app">
    <div ref="outerDiv" class="outer-div">
      <div ref="innerDiv" class="inner-div"></div>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/tst-bg.png");
  background-position: 50% 50%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-div {
  width: 150px;
  height: 150px;
  border: 2px solid red;
  overflow: hidden;
  transform: translateY(100px);
  transform-origin: center center;
}

.inner-div {
  transform: scale(var(--scale, 1)) rotate(var(--rotation, 0deg))
    translateX(var(--x-offset, 0px)) translateY(var(--y-offset, 0px));
  transform-origin: center center;
  width: 100vw;
  height: 100vh;
  margin-left: calc(-50vw + 50%);
  margin-top: calc(-50vh + 50%);
  opacity: 0.8;
  filter: blur(2px);
  /* transform: translateX(-100px) translateY(-100px); */

  background-image: url("./assets/tst-bg.png");
  /* background-color: rgb(0, 0, 0); */
  background-position: 50% 50%;
  background-size: 100vw auto;
  background-repeat: no-repeat;

  pointer-events: none;
}
</style>
