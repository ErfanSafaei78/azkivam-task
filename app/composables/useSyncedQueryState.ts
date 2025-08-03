import type { LocationQueryValue } from "vue-router";

export function useSyncedQueryState<T extends Record<string, unknown>>(
  initialQuery: T,
  parser: {
    [K in keyof T]?: (
      value: LocationQueryValue | LocationQueryValue[] | undefined
    ) => T[K];
  }
): { [K in keyof T]: Ref<T[K]> } {
  const route = useRoute();
  const router = useRouter();

  const state = {} as { [K in keyof T]: Ref<T[K]> };
  Object.keys(initialQuery).forEach((key: keyof T) => {
    state[key] = computed<T[typeof key]>({
      get: () => {
        const routeValue = route.query[key as string];
        return (parser[key]?.(routeValue) ||
          routeValue ||
          initialQuery[key]) as T[typeof key];
      },
      set: (newValue: T[typeof key]) => {
        if (!import.meta.client) return;

        if (newValue == null || newValue === "") {
          router.replace({
            query: { ...route.query, [key]: undefined },
          });
        } else {
          router.replace({
            query: { ...route.query, [key]: newValue.toString() },
          });
        }
      },
    });
  });

  for (const key in initialQuery) {
    state[key].value = initialQuery[key];
  }
  return state;
}
