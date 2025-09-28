<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { updateOuterPosition, getOuterCenter, getPageCenter } from "./utils.js";

const outerDiv = ref(null);

// Rect в координатах страницы
const outerRect = ref(null);
function readOuterRect() {
  const el = outerDiv.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  outerRect.value = {
    left: r.left + window.scrollX,
    top: r.top + window.scrollY,
    width: r.width,
    height: r.height,
  };
}

// Смещение центра блока относительно центра страницы
const innerOffset = computed(() => {
  if (!outerRect.value) return { offsetX: 0, offsetY: 0 };
  const oc = getOuterCenter(outerRect.value);
  const pc = getPageCenter();
  return { offsetX: oc.x - pc.x, offsetY: oc.y - pc.y };
});

// Храним последний rect (не обязательно, но пусть будет)
const outerPosition = ref({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
});

// Берём rect из utils (без мутаций transform)
function applyOuterPosition() {
  const res = updateOuterPosition(outerDiv.value);
  if (res) {
    outerPosition.value = res;
    outerRect.value = {
      left: res.left,
      top: res.top,
      width: res.width,
      height: res.height,
    };
  }
}

// Фон внутри блока двигаем, чтобы совпал со страницей
const innerDivPosition = computed(() => ({
  backgroundPosition: `calc(50% + ${innerOffset.value.offsetX}px) calc(50% + ${innerOffset.value.offsetY}px)`,
}));

// Управляем transform только через Vue
const currentX = ref(0);
const currentY = ref(0);

watch(
  innerOffset,
  (o) => {
    currentX.value = -o.offsetX;
    currentY.value = -o.offsetY;
  },
  { immediate: false }
);

function onScrollOrResize() {
  requestAnimationFrame(readOuterRect);
}

let ro;
onMounted(() => {
  readOuterRect();
  applyOuterPosition();

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScrollOrResize);
  window.removeEventListener("resize", onScrollOrResize);
});
</script>

<template>
  <div class="app">
    <svg width="0" height="0" aria-hidden="true">
      <defs>
        <filter id="red-tint">
          <feColorMatrix
            type="matrix"
            values="1.2 0 0 0 0.1
                    0   1 0 0 0
                    0   0 1 0 0
                    0   0 0 1 0"
          />
        </filter>
      </defs>
    </svg>

    <div
      ref="outerDiv"
      class="center-div"
      :style="{ transform: `translate(${currentX}px, ${currentY}px)` }"
    >
      <div class="inner-div" :style="innerDivPosition"></div>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 200vh;
  background-image: url("./assets/tst-bg.png");
  background-position: 50% 50%;
  background-size: 100% auto;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.center-div {
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  opacity: 0.5;
  position: relative;
  overflow: visible;
}

.inner-div {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;

  background-image: url("./assets/tst-bg.png");
  background-position: 50% 50%;
  background-size: 100% auto;
  background-repeat: no-repeat;

  pointer-events: none;
  filter: url(#red-tint);
}
</style>
