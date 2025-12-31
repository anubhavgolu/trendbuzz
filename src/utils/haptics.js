export function hapticTap(duration = 10) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(duration);
  }
}
