import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: FC<InputProps> = ({ label, ...props }) => {
  const inputClasses = `w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 hover:border-zinc-400`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={props.id}
        className="text-sm font-medium text-zinc-700 tracking-wide"
      >
        {label}
      </label>
      <input className={inputClasses} {...props} />
    </div>
  );
};
