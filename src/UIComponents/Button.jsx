import clsx from "clsx";

export function Button({
  className,
  variant = "default",
  children,
  ...props
}) {
  const variants = {
    default: "btn btn-primary",
    outline: "btn btn-outline-primary",
    danger: "btn btn-danger",
  };

  return (
    <button
      className={clsx(
        variants[variant],
        "rounded-3",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
