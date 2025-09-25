<template>
  <div id="app">
    <div class="background-block"></div>

    <!-- Множественные mask элементы -->
    <MaskElement
      v-for="maskObj in maskObjects"
      :key="maskObj.id"
      :config="maskObj"
    />

    <!-- Perspective контейнер для отладки (можно убрать) -->
    <div
      class="perspective-container"
      :style="{ perspective: '1000px' }"
    >
    </div>

    <div class="transform-info">
      <h3>Multiple Mask Elements Demo:</h3>
      <div class="control-group">
        <label>Objects Count: {{ maskObjects.length }}</label>
      </div>
      <div class="control-group">
        <button
          @click="startChaos"
          style="
            padding: 10px 20px;
            background: #ff6b6b;
            border: none;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-right: 10px;
          "
        >
          🎭 START CHAOS ANIMATION
        </button>
      </div>
      <div class="info">
        <p>✨ Each element automatically syncs its background</p>
        <p>🎯 Try dragging the elements around</p>
        <p>🌀 Watch how backgrounds stay in sync during animation</p>
      </div>
    </div>

    <div class="scroll-content">
      <p>Дополнительный контент для скролла</p>
      <p>Еще один блок текста</p>
      <p>И еще немного контента</p>
      <p>Чтобы можно было скроллить страницу</p>
      <p>Последний блок контента</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MaskElement from './components/MaskElement.vue';

// Создаем несколько mask объектов с полной конфигурацией
const maskObjects = ref([
  {
    id: 1,
    element: {
      top: 150,
      left: 200,
      width: 200,
      height: 200,
    },
    transforms: {
      perspective: 1000,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1.5,
      skewX: 0,
      skewY: 0,
    },
    background: {
      positionX: -100,
      positionY: -100,
      size: "100vw auto",
      sizeX: "100vw",
      sizeY: "100vh",
    },
    ui: {
      opacity50: false,
    },
    rotateMode: "2d"
  },
  {
    id: 2,
    element: {
      top: 300,
      left: 400,
      width: 250,
      height: 250,
    },
    transforms: {
      perspective: 1000,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 2,
      skewX: 0,
      skewY: 0,
    },
    background: {
      positionX: -100,
      positionY: -100,
      size: "100vw auto",
      sizeX: "100vw",
      sizeY: "100vh",
    },
    ui: {
      opacity50: false,
    },
    rotateMode: "3d"
  },
  {
    id: 3,
    element: {
      top: 100,
      left: 600,
      width: 180,
      height: 180,
    },
    transforms: {
      perspective: 1000,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1.2,
      skewX: 0,
      skewY: 0,
    },
    background: {
      positionX: -100,
      positionY: -100,
      size: "100vw auto",
      sizeX: "100vw",
      sizeY: "100vh",
    },
    ui: {
      opacity50: false,
    },
    rotateMode: "2d"
  }
]);

// Запуск хаотичной анимации всех элементов
const startChaos = () => {
  // Запускаем анимацию для каждого элемента через небольшую задержку
  maskObjects.value.forEach((obj, index) => {
    setTimeout(() => {
      // Создаем новый экземпляр с анимацией для каждого объекта
      const animate = () => {
        const time = Date.now() * 0.001;
        const id = obj.id;

        // Обновляем конфигурацию объекта для хаотичного движения
        obj.transforms.translateX = Math.sin(time * 0.5 + id) * 100;
        obj.transforms.translateY = Math.cos(time * 0.3 + id) * 80;
        obj.transforms.rotateZ = Math.sin(time * 0.2 + id) * 45;
        obj.transforms.scale = 1.5 + Math.sin(time * 0.4 + id) * 0.5;
        obj.element.left = 400 + Math.sin(time * 0.1 + id) * 200;
        obj.element.top = 300 + Math.cos(time * 0.15 + id) * 150;

        requestAnimationFrame(animate);
      };

      animate();
    }, index * 500);
  });
};

onMounted(() => {
  // Автоматически запускаем хаотичную анимацию через 2 секунды
  setTimeout(() => {
    startChaos();
  }, 2000);
});
</script>

<style>
/* Глобальные стили импортируются из style.css */
</style>