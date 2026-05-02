import { Overlay } from "@app/components/ui/Overlay";
import { Logo } from "./Logo";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <>
      <Overlay isOpen={isLoading} blur opacity="dark" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="sidebar" />
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
      </div>
    </>
  );
}
