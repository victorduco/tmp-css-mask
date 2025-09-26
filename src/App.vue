<script setup></script>

<template>
  <div class="diamond-grid">
    <div class="diamond diamond-1"></div>
    <div class="diamond diamond-2"></div>
    <div class="diamond diamond-3"></div>
    <div class="diamond diamond-4"></div>
  </div>
</template>

<style scoped>
.diamond-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  max-width: 140vw;
  max-height: 140vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 40px;
}

.diamond {
  width: 300px;
  height: 300px;
  border: 2px solid;
}

.diamond-1 {
  grid-column: 1;
  grid-row: 1;
  background: linear-gradient(135deg, #2c1810, #3d2914);
  border-color: #8b4513;
  box-shadow: 0 0 30px rgba(139, 69, 19, 0.2);
}

.diamond-2 {
  grid-column: 2;
  grid-row: 1;
  background: linear-gradient(135deg, #0f1419, #1a2332);
  border-color: #4a90e2;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.2);
}

.diamond-3 {
  grid-column: 1;
  grid-row: 2;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-color: #0f4c75;
  box-shadow: 0 0 30px rgba(15, 76, 117, 0.3);
}

.diamond-4 {
  grid-column: 2;
  grid-row: 2;
  background: linear-gradient(135deg, #2d1b2e, #42213d);
  border-color: #8b008b;
  box-shadow: 0 0 30px rgba(139, 0, 139, 0.2);
}
</style>
