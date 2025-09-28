export function updateOuterPosition(centerDivElement) {
  if (!centerDivElement) {
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
  const rect = centerDivElement.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

export function getOuterCenter(rect) {
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  return { x, y };
}

export function getPageCenter() {
  return {
    x: window.scrollX + window.innerWidth / 2,
    y: window.scrollY + window.innerHeight / 2,
  };
}
