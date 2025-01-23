import React, { FC } from "react";

interface ResultProps {
  won: boolean;
}

const Result: FC<ResultProps> = ({ won }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`text-4xl font-bold ${won ? 'text-emerald-500' : 'text-red-500'}`}>
        {won ? '🎉 You Won!' : '😔 You Lost'}
      </div>
      <p className={`text-lg ${won ? 'text-emerald-600' : 'text-red-600'}`}>
        {won 
          ? 'Congratulations on your victory!' 
          : 'Better luck next time!'}
      </p>
    </div>
  );
};

export default Result;