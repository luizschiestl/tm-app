export function PrimaryButton({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`font-info text-info py-2 px-12 rounded bg-primary shadow-button text-white uppercase transition-colors duration-300 hover:bg-success ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
