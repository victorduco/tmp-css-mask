<template>
  <div
    class="center-block"
    ref="draggable"
    :style="transformStyle"
    @mousedown="startDrag"
  >
    <div class="element-id">{{ id }}</div>
  </div>
</template>

<script setup>
import { useMaskElement } from '../composables/useMaskElement.js';

const props = defineProps(['config']);
const maskInstance = useMaskElement(props.config);

// Деструктуризируем все необходимые данные и методы
const {
  id,
  element,
  transforms,
  background,
  pseudoBg,
  ui,
  rotateMode,
  isDragging,
  draggable,
  transformStyle,
  syncBackground,
  startDrag,
  onDrag,
  stopDrag,
} = maskInstance;
</script>

<style scoped>
/* Стили уже определены в style.css, но можно добавить компонент-специфичные стили */
</style>