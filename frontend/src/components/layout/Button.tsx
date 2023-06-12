import clsx from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `font-info text-info py-2 px-12 rounded shadow-button  transition-colors duration-300 ${className}`,
        {
          "bg-primary text-white uppercase hover:bg-success":
            variant === "primary",
          "bg-clear text-secondary capitalize hover:bg-clear-dark":
            variant === "secondary",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
