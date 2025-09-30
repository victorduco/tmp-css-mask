<script setup>
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import {
  getCenter,
  getPageCenter,
  getOuterOffset,
  getInnerOffset,
  applyInnerOffset,
} from "./utils.js";

// Vars

const outerDiv = ref(null);
const innerDiv = ref(null);

const outerCenter = computed(() => getCenter(outerDiv.value));
const innerCenter = computed(() => getCenter(outerDiv.value));

const pageCenter = computed(() => getPageCenter());

onMounted(() => {
  console.log("outerCenter", outerCenter.value);
  console.log("innerCenter", innerCenter.value);
  console.log("pageCenter", pageCenter.value);
});

// test
const outerOffset = computed(() =>
  getOuterOffset(pageCenter.value, outerCenter.value)
);
const innerOffset = computed(() => getInnerOffset(outerOffset.value));

watchEffect(() => {
  if (!innerDiv.value) return;
  applyInnerOffset(innerDiv.value, innerOffset.value);
});
</script>

<template>
  <div class="app">
    <div ref="outerDiv" class="outer-div">
      <div
        ref="innerDiv"
        class="inner-div"
        :style="{ '--x-offset': innerOffset.x, '--y-offset': innerOffset.y }"
      ></div>
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
  overflow: visible;
  transform: translateX(100px) translateY(100px) rotate(45deg) scale(2);
}

.inner-div {
  /* width: 100vw;
  height: 100vh; */
  /* transform: translateX(--x-offset, 0), translateY(--y-offset, 0); */
  width: 100vw;
  height: 100vh;
  margin-left: calc(-50vw + 50%);
  margin-top: calc(-50vh + 50%);
  opacity: 0.5;
  transform: scale(0.5) rotate(-45deg) translateX(-100px) translateY(-100px);

  background-image: url("./assets/tst-bg.png");
  /* background-color: rgb(0, 0, 0); */
  background-position: 50% 50%;
  background-size: 100vw auto;
  background-repeat: no-repeat;

  pointer-events: none;
}
</style>
