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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  min-width: 600px;
  min-height: 350px;
  width: 130vw;
  height: 200vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  row-gap: 0;
  column-gap: 400px;
}

.diamond {
  width: 110%;
  aspect-ratio: 1;
  border: 2px solid;
  transform: rotate(45deg);
  justify-self: center;
  align-self: center;
  border-radius: 30px;
}

.diamond-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  background-color: #8b4513;
  box-shadow: 0 0 30px rgba(139, 69, 19, 0.2);
}

.diamond-2 {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  background-color: #4a90e2;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.2);
}

.diamond-3 {
  grid-column: 3 / 5;
  grid-row: 1 / 3;
  background-color: #0f4c75;
  box-shadow: 0 0 30px rgba(15, 76, 117, 0.3);
}

.diamond-4 {
  grid-column: 4 / 6;
  grid-row: 2 / 4;
  background-color: #8b008b;
  box-shadow: 0 0 30px rgba(139, 0, 139, 0.2);
}
</style>
