import React, { FC } from "react";

interface ResultProps {
  result: 'won' | 'lost' | 'tie';
  msg?: string;
}

const Result: FC<ResultProps> = ({ result, msg }) => {
  const getResultColor = () => {
    switch (result) {
      case 'won':
        return 'text-emerald-500';
      case 'lost':
        return 'text-red-500';
      case 'tie':
        return 'text-blue-500';
    }
  };

  const getResultMessage = () => {
    switch (result) {
      case 'won':
        return '🎉 You Won!';
      case 'lost':
        return '😔 You Lost';
      case 'tie':
        return '🤝 It\'s a Tie!';
    }
  };

  const getResultSubMessage = () => {
    switch (result) {
      case 'won':
        return 'Congratulations on your victory!';
      case 'lost':
        return 'Better luck next time!';
      case 'tie':
        return 'Great minds think alike!';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`text-4xl font-bold ${getResultColor()}`}>
        {getResultMessage()}
      </div>
      <p className={`text-lg ${getResultColor()}`}>
        {getResultSubMessage()}
      </p>
      {msg && <p className="text-lg text-zinc-600">{msg}</p>}
    </div>
  );
};

export default Result;
