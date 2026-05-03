import { toast } from "sonner";
import type { AppToastProps } from "../components/AppToast";
import AppToast from "../components/AppToast";

export const showToast = (props: AppToastProps) =>
  toast.custom(
    (id) => (
      <AppToast
        {...props}
        title={props?.title || "Success"}
        onClose={() => {
          toast.dismiss(id);
          props?.onClose?.();
        }}
      />
    ),
    {
      position: "top-right",
    },
  );
