<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getCenter,
  getPageCenter,
  getOuterOffset,
  applyOuterOffset,
} from "../utils.js";

const props = defineProps({
  rotation: {
    type: Number,
    default: 0,
  },
  scale: {
    type: Number,
    default: 1,
  },
});

const outerDiv = ref(null);
const innerDiv = ref(null);

const outerCenter = ref({ x: 0, y: 0 });
const pageCenter = computed(() => getPageCenter());

onMounted(() => {
  const updatePosition = () => {
    if (outerDiv.value && innerDiv.value) {
      outerCenter.value = getCenter(outerDiv.value);
      const offset = getOuterOffset(pageCenter.value, outerCenter.value);
      applyOuterOffset(innerDiv.value, offset, props.rotation, props.scale);
    }
    requestAnimationFrame(updatePosition);
  };
  requestAnimationFrame(updatePosition);
});

defineExpose({ outerDiv });
</script>

<template>
  <div ref="outerDiv" class="outer-div">
    <div ref="innerDiv" class="inner-div"></div>
  </div>
</template>

<style scoped>
.outer-div {
  width: 150px;
  height: 150px;
  border: 2px solid red;
  overflow: hidden;
  transform-origin: center center;
}

/* Order of transformation compenstation must be the opposite to the original */
.inner-div {
  transform: rotate(var(--rotation, 0deg)) scale(var(--scale, 1))
    translateX(var(--x-offset, 0px)) translateY(var(--y-offset, 0px));
  transform-origin: center center;
  width: 100vw;
  height: 100vh;
  margin-left: calc(-50vw + 50%);
  margin-top: calc(-50vh + 50%);
  opacity: 0.5;
  filter: blur(2px);

  background-image: url("../assets/tst-bg.png");
  background-position: 50% 50%;
  background-size: 100vw auto;
  background-repeat: no-repeat;

  pointer-events: none;
}
</style>
