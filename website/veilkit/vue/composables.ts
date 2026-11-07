import { ref, onMounted, onUnmounted, watch } from 'vue';
import { AntiFlickerController } from '../core/antiflicker';
import { progressController } from '../core/progress';
import { loadingManager } from '../core/manager';

export function useProgress() {
  return {
    start: () => progressController.start(),
    set: (n: number) => progressController.set(n),
    inc: (amount?: number) => progressController.inc(amount),
    done: () => progressController.done(),
    fail: () => progressController.fail(),
  };
}

export function useDelayedLoading(
  loadingRef: { value: boolean },
  options: { delay?: number; minVisible?: number } = {},
) {
  const visible = ref(false);
  let controller: AntiFlickerController | null = null;

  onMounted(() => {
    controller = new AntiFlickerController({
      delay: options.delay !== undefined ? options.delay : 150,
      minVisible: options.minVisible !== undefined ? options.minVisible : 300,
      onShow: () => { visible.value = true; },
      onHide: () => { visible.value = false; },
    });

    if (loadingRef.value) {
      controller.start();
    }
  });

  watch(
    () => loadingRef.value,
    (val) => {
      if (!controller) return;
      if (val) controller.start();
      else controller.finish();
    },
  );

  onUnmounted(() => {
    if (controller) {
      controller.destroy();
      controller = null;
    }
  });

  return visible;
}

export function useLoading<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>,
  options: { delay?: number; minVisible?: number } = {},
) {
  const loading = ref(false);
  const data = ref<T | null>(null) as { value: T | null };
  const error = ref<Error | null>(null);

  const visibleLoading = useDelayedLoading(loading, options);

  const execute = async (...args: Args): Promise<T> => {
    loading.value = true;
    error.value = null;
    const reqId = loadingManager.start();

    try {
      const res = await asyncFn(...args);
      data.value = res;
      return res;
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      loadingManager.stop(reqId);
      loading.value = false;
    }
  };

  return {
    loading: visibleLoading,
    rawLoading: loading,
    data,
    error,
    execute,
  };
}
