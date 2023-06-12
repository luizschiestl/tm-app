import clsx from "clsx";
import success from "../../assets/success.svg";
import error from "../../assets/error.svg";

interface MessageProps {
  message: string;
  type: "error" | "success";
  show?: boolean;
}

export function Message({ message, type, show }: MessageProps) {
  return (
    <div
      className={clsx(
        "rounded-xs flex items-center p-2 gap-2 font-title transition-all",
        {
          "bg-success-light text-success": type === "success",
          "bg-danger-light text-danger": type === "error",
          "scale-y-0 h-0 -my-4": !show,
          "scale-y-100": show,
        }
      )}
    >
      <img
        src={type === "success" ? success : error}
        alt="icon"
        className="w-4"
      />
      <p>{message}</p>
    </div>
  );
}
