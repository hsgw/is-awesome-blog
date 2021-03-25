export function randomRotateStyle() {
  const deg = 5 - Math.random() * 10
  return {
    transform: `rotate(${deg}deg)`,
  }
}
