import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/themes";
import { Logo } from "./Logo";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <>
      <Dialog.Root open={isLoading}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-3 p-4 ">
              <VisuallyHidden>
                <Dialog.Title>Loading</Dialog.Title>
              </VisuallyHidden>
              <Logo />
              <div className="flex gap-2">
                <div
                  className="w-3 h-3 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-3 h-3 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-3 h-3 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
