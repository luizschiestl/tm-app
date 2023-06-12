interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  iconSrc: string;
}

export function Input({ iconSrc, className, ...props }: InputProps) {
  return (
    <span className="relative">
      <img
        src={iconSrc}
        alt="input icon"
        className="w-4 absolute -translate-y-1/2 top-1/2 left-2"
      />
      <input
        className={`placeholder:text-detail-dark text-detail-darker outline-none bg-none p-2 pl-10 border-solid border-t-0 border-l-0 border-r-0 border-b-2 border-b-detail-dark focus:border-b-detail-darker ${className}`}
        {...props}
      />
    </span>
  );
}
