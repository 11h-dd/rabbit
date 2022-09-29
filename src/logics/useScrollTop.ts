export default function userScrollTop() {
  const scrollTop = ref(0);
  const onScrollHandler = () => {
    scrollTop.value = document.documentElement.scrollTop;
  };
  onMounted(() => {
    window.addEventListener("scroll", onScrollHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScrollHandler);
  });
  return scrollTop;
}
