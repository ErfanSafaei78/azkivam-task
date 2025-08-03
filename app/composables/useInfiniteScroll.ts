export function useInfiniteScroll() {
  const observer = ref<IntersectionObserver | null>(null);

  const observeLastChild = (
    containerRef: Ref<HTMLElement | null>,
    callback: () => void,
    hasMore: Ref<boolean>
  ) => {
    if (!import.meta.client || !containerRef.value) return;
    const children = containerRef.value.children;
    if (!children.length) return;

    const lastChild = children[children.length - 1];
    if (!lastChild) return;
    if (observer.value) observer.value.disconnect();
    observer.value = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && hasMore.value) {
        callback();
      }
    });
    observer.value.observe(lastChild);
  };

  onUnmounted(() => {
    if (observer.value) observer.value.disconnect();
  });

  return {
    observeLastChild,
    unObserve: () => {
      if (observer.value) observer.value.disconnect();
    },
  };
}
