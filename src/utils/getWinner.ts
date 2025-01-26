export enum Move {
  Null = 0,
  Rock = 1,
  Paper = 2,
  Scissors = 3,
  Lizard = 4,
  Spock = 5,
}
export function getWinner(_c1: Move, _c2: Move): boolean {
  if (_c1 === _c2) {
    return false; // They played the same so no winner
  }
  if (_c1 === Move.Null) {
    return false; // They did not play
  }

  if (Number(_c1) % 2 === Number(_c2) % 2) {
    return Number(_c1) < Number(_c2);
  } else {
    return Number(_c1) > Number(_c2);
  }
}

export function declareWinner(player1: Move, player2: Move): number {
  if (getWinner(player1, player2)) {
    return 1;
  } else if (getWinner(player2, player1)) {
    return 2;
  } else {
    return 0;
  }
}
