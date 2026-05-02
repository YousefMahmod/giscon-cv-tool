interface AvatarProps {
  src?: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
}

export const Avatar = ({ src, alt, size = "md", fallback }: AvatarProps) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  // Generate initials from alt text
  const getInitials = () => {
    if (fallback) return fallback;
    return alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden bg-primary-container flex items-center justify-center`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-on-primary-container">
          {getInitials()}
        </span>
      )}
    </div>
  );
};
