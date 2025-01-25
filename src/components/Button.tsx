import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
}

const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

export const Button: FC<ButtonProps> = ({ children, loading = false, disabled, ...props }) => {
  return (
    <button
      className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner /> : null}
      {children}
    </button>
  );
};
