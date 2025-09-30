# CSS Mask Animation Project

## Описание

Проект демонстрирует технику компенсации трансформаций для создания эффекта "окна" в фоновое изображение. Внешний блок (outer-div) анимируется с трансформациями (translate, rotate, scale), а внутренний блок (inner-div) применяет обратные трансформации для компенсации, создавая иллюзию неподвижного фона.

## Структура проекта

```
src/
├── App.vue              # Главный компонент с логикой анимации
├── components/
│   └── Rectangle.vue    # Компонент прямоугольника с логикой компенсации
└── utils.js            # Утилиты для расчета позиций и offsets
```

## Как это работает

### 1. Анимация (App.vue)

В `App.vue` находится вся логика анимации:

- Вычисляется progress анимации через `Math.sin()`
- Изменяются параметры: позиция (xPos), rotation, scale
- Transform применяется напрямую через `style.transform`
- После применения transform вызывается `updateOffset()` для синхронной компенсации

```javascript
rotation.value = progress * 45; // 0° → 45°
scale.value = 1 + progress; // 1 → 2
outerDiv.style.transform = `translateX(${xPos}px) translateY(100px) rotate(${rotation}deg) scale(${scale})`;
updateOffset(); // Компенсация
```

### 2. Компенсация (Rectangle.vue)

Компонент `Rectangle` отвечает за:

- Вычисление offset между центром outer-div и центром страницы
- Применение обратных трансформаций для компенсации

**ВАЖНО: Порядок трансформаций для компенсации должен быть обратным!**

Если outer-div применяет: `translateX() translateY() rotate() scale()`

То inner-div должен применять: `rotate() scale() translateX() translateY()`

```css
/* Rectangle.vue - inner-div */
transform: rotate(var(--rotation, 0deg)) /* Обратный поворот */ scale(
    var(--scale, 1)
  )
  /* Обратный масштаб */ translateX(var(--x-offset, 0px)) /* Компенсация позиции */
  translateY(var(--y-offset, 0px));
```

### 3. Утилиты (utils.js)

#### `getCenter(element)`

Возвращает координаты центра элемента в viewport.

#### `getPageCenter()`

Возвращает координаты центра страницы.

#### `getOuterOffset(pageCenter, outerCenter)`

Вычисляет смещение между центром страницы и центром outer-div.

#### `applyOuterOffset(innerDiv, offset, rotation, scale)`

Применяет CSS переменные для компенсации:

- `--x-offset`, `--y-offset` - компенсация позиции
- `--rotation` - инвертированный угол поворота (отрицательный)
- `--scale` - обратный масштаб (1/scale)

## Принцип работы компенсации

1. **Outer-div** двигается, поворачивается и масштабируется
2. **Inner-div** занимает весь viewport (100vw × 100vh) и центрируется через margin
3. Inner-div применяет **обратные** трансформации в **обратном** порядке
4. Результат: фон внутри inner-div выглядит неподвижным относительно страницы

## Известные проблемы

### Задержка компенсации

Может наблюдаться небольшая задержка между движением outer-div и компенсацией inner-div из-за:

- `getBoundingClientRect()` может читать значения до применения CSS transform
- Браузер применяет CSS transform асинхронно
- Два разных этапа обработки (применение transform → чтение DOM → применение offset)

**Текущее решение**: Все вычисления выполняются в одном `requestAnimationFrame` цикле для минимизации задержки.

## Использование

```vue
<template>
  <Rectangle ref="rectangle" :rotation="rotation" :scale="scale" />
</template>

<script setup>
import Rectangle from "./components/Rectangle.vue";
import { ref, onMounted } from "vue";

const rectangle = ref(null);
const rotation = ref(0);
const scale = ref(1);

onMounted(() => {
  const animate = () => {
    // Изменяем параметры анимации
    rotation.value = /* ... */;
    scale.value = /* ... */;

    // Применяем transform
    rectangle.value.outerDiv.style.transform = /* ... */;

    // Обновляем offset синхронно
    rectangle.value.updateOffset();

    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
</script>
```

## Стилизация

### Outer-div

- Размер: 150px × 150px
- Border: 2px solid red
- `overflow: hidden` - обрезает inner-div
- `transform-origin: center center` - точка трансформации в центре

### Inner-div

- Размер: 100vw × 100vh (на весь viewport)
- Центрируется через `margin-left: calc(-50vw + 50%)` и `margin-top: calc(-50vh + 50%)`
- `transform-origin: center center` - та же точка трансформации
- `pointer-events: none` - не перехватывает события мыши
- Опциональные эффекты: `opacity`, `filter: blur()`
