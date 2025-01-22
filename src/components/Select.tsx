import { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: FC<SelectProps> = ({ label, options, ...props }) => {
  const selectClasses = `w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 hover:border-zinc-400`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={props.id}
        className="text-sm font-medium text-zinc-700 tracking-wide"
      >
        {label}
      </label>
      <select className={selectClasses} {...props}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
