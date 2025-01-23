import React, { FC } from "react";

interface LoadingProps {
  msg: string;
}

const Loading: FC<LoadingProps> = ({ msg }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-emerald-600 font-medium">{msg}</p>
    </div>
  );
};

export default Loading;
