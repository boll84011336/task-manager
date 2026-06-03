import { ref } from "vue";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  function show(message: string, type: ToastType = "success") {
    const id = Date.now();
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 5000);
  }

  function success(message: string) {
    show(message, "success");
  }
  function error(message: string) {
    show(message, "error");
  }
  function warning(message: string) {
    show(message, "warning");
  }

  return { toasts, success, error, warning };
}
