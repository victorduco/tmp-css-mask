<script setup>
import { ref, onMounted } from "vue";
import Rectangle from "./components/Rectangle.vue";

const rectangle = ref(null);
const rotation = ref(0);
const scale = ref(1);

onMounted(() => {
  let startTime = Date.now();

  const animate = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = (Math.sin((elapsed * Math.PI) / 1.5) + 1) / 2; // 0 to 1
    const xPos = (progress - 0.5) * 200;

    rotation.value = progress * 45;
    scale.value = 1 + progress;

    if (rectangle.value?.outerDiv) {
      rectangle.value.outerDiv.style.transform = `translateX(${xPos}px) translateY(100px) rotate(${rotation.value}deg) scale(${scale.value})`;
    }

    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
</script>

<template>
  <div class="app">
    <Rectangle ref="rectangle" :rotation="rotation" :scale="scale" />
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
