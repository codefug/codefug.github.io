export default function throttle(callback: () => void, delay: number) {
  let waiting = false;
  return function curringFunc() {
    if (!waiting) {
      callback();
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
}
