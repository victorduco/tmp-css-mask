<script setup>
import { ref, onMounted } from "vue";
import Rectangle from "./components/Rectangle.vue";

const rectangle1 = ref(null);
const rotation1 = ref(0);
const scale1 = ref(1);

const rectangle2 = ref(null);
const rotation2 = ref(0);
const scale2 = ref(1);

onMounted(() => {
  let startTime = Date.now();

  const animate = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = (Math.sin((elapsed * Math.PI) / 1.5) + 1) / 2; // 0 to 1
    const xPos = (progress - 0.5) * 200;

    rotation1.value = progress * 45;
    scale1.value = 1 + progress;

    if (rectangle1.value?.outerDiv) {
      rectangle1.value.outerDiv.style.transform = `translateX(${xPos}px) translateY(100px) rotate(${rotation1.value}deg) scale(${scale1.value})`;
    }

    // Second rectangle with opposite animation
    const progress2 = 1 - progress;
    const xPos2 = (progress2 - 0.5) * 200;

    rotation2.value = progress2 * 45;
    scale2.value = 1 + progress2;

    if (rectangle2.value?.outerDiv) {
      rectangle2.value.outerDiv.style.transform = `translateX(${xPos2}px) translateY(-100px) rotate(${rotation2.value}deg) scale(${scale2.value})`;
    }

    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
</script>

<template>
  <div class="app">
    <Rectangle ref="rectangle1" :rotation="rotation1" :scale="scale1" />
    <Rectangle ref="rectangle2" :rotation="rotation2" :scale="scale2" />
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
</style>
