import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full"
      {...props}
    >
      {children}
    </button>
  );
};
