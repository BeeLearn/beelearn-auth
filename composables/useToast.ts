import { useToast } from "vue-toast-notification";

export default function (...args: Parameters<typeof useToast>) {
  return useToast({
    position: "top-right",
    ...args[0],
  });
}
