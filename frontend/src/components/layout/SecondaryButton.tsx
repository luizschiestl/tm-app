export function SecondaryButton({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`font-info text-info py-2 px-12 rounded bg-clear shadow-button text-secondary capitalize transition-colors hover:bg-clear-dark ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
