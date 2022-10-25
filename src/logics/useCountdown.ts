export default function UseCountDown() {
  const count = ref(60);
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (count.value > 0) {
        count.value--;
      } else {
        pause();
      }
    },
    1000,
    {
      immediate: false,
    }
  );
  const start = (seconds: number) => {
    if (isActive.value) return;
    count.value = seconds;
    resume();
  };
  return { count, start, isActive };
}
