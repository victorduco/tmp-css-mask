export function applyInnerOffset(innerDivElement, innerOffset) {
  if (!innerDivElement || !innerOffset) return;
  innerDivElement.style.setProperty("--x-offset", innerOffset.x + "px");
  innerDivElement.style.setProperty("--y-offset", innerOffset.y + "px");
}

export function getCenter(centerDivElement) {
  if (!centerDivElement) {
    return { x: 0, y: 0 };
  }
  const rect = centerDivElement.getBoundingClientRect();
  const x = (rect.left + rect.right) / 2;
  const y = (rect.top + rect.bottom) / 2;
  return { x, y };
}

export function getPageCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function getOuterOffset(pageCenter, outerCenter) {
  return {
    x: pageCenter.x - outerCenter.x,
    y: pageCenter.y - outerCenter.y,
  };
}

export function getInnerOffset(outerOffset) {
  if (!outerOffset) {
    return { x: 0, y: 0 };
  } else {
    return { x: -outerOffset.x, y: -outerOffset.y };
  }
}
