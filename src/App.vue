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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

  max-width: 110vw;
  max-height: 110vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  row-gap: -200px;
  column-gap: 100px;
  height: -100px;
}

.diamond {
  --element-height: 100px;
  height: var(--element-height);
  margin-bottom: calc(-1 * var(--element-height));
  aspect-ratio: 1;
  border: 0px;
  transform: rotate(45deg);
  justify-self: center;
  align-self: center;
  border-radius: 14%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.diamond-1 {
  grid-column: 1 / 4;
  grid-row: 1 / 4;
  background-color: #8b4513;
}

.diamond-2 {
  grid-column: 3 / 6;
  grid-row: 3 / 6;
  background-color: #4a90e2;
}

.diamond-3 {
  grid-column: 5 / 8;
  grid-row: 1 / 4;
  background-color: #0f4c75;
}

.diamond-4 {
  grid-column: 7 / 10;
  grid-row: 3 / 6;
  background-color: #8b008b;
}
</style>
