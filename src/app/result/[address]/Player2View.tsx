import { Button } from "@/components/Button";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import React, { FC, useState } from "react";

const Player2View: FC = () => {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-200 flex flex-col items-center justify-center p-4">
        <Loading msg="Waiting for player 2 to play" />
        <div className="w-44 mt-4">
          <Button type="submit">Call Timeout</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-200 flex flex-col items-center justify-center p-4">
      <Result won={false} />
    </main>
  );
};

export default Player2View;
