import { Player, Card, WinningCounter } from "./interfaces";
import { checkPlayerPokerRank, tieBreaker } from "./pokerRanksFunctions";
import { createPlayerCardsArray } from "./convertersFunctions";

const winningCounter: WinningCounter = {
  player1HandsWon: 0,
  player2HandsWon: 0,
};

const player1: Player = {
  hands: [],
  pokerRank: 0,
  highestCard: <Card>{},
  secondHighestCard: <Card>{},
};
const player2: Player = {
  hands: [],
  pokerRank: 0,
  highestCard: <Card>{},
  secondHighestCard: <Card>{},
};

/**
 * This function check the winner of a single game and add the winner in the counter
 * @param playerA First player
 * @param playerB Second player
 */
export function checkWinner(
  playerA: Player,
  playerB: Player,
  counter: WinningCounter
): void {
  playerA.pokerRank = checkPlayerPokerRank(playerA);
  playerB.pokerRank = checkPlayerPokerRank(playerB);

  if (player1.pokerRank > player2.pokerRank) {
    counter.player1HandsWon += 1;
  } else if (player1.pokerRank < player2.pokerRank) {
    counter.player2HandsWon += 1;
  } else {
    const winner: number = tieBreaker(player1, player2);

    if (winner === 1) {
      counter.player1HandsWon += 1;
    } else if (winner === 2) {
      counter.player2HandsWon += 1;
    }
  }
}

/**
 *
 * @param card1 This function compares 2 cards and determine which cards is higher
 * It is to be used in conjunction of sort function
 * @param card2
 * @returns number
 */
function compare(card1: Card, card2: Card): number {
  let comparison = 0;
  if (card1.rank > card2.rank) {
    comparison = 1;
  } else if (card2.rank > card1.rank) {
    comparison = -1;
  }
  return comparison;
}

/**
 * This function assign cards to each player from a stream of string
 * @param stream string of cards
 */
function assignCards(stream: string) {
  const streamArray: string[] = stream.split(" ");

  const arrayOfAllCards: Card[] = createPlayerCardsArray(streamArray);

  player1.hands = [];
  player2.hands = [];

  for (let j = 0; j < 5; j += 1) {
    player1.hands.push(arrayOfAllCards[j]);
    player2.hands.push(arrayOfAllCards[j + 5]);
  }

  player1.hands = player1.hands.sort(compare);
  player2.hands = player2.hands.sort(compare);
}

/**
 * This function process the data obtained from .txt files that contains one or multiple games,
 * it then splits them by line if there are multiple games, then create cards and assigns it to players
 * and then check who wins
 * @param data data that was read from file
 */
export function dataProcessing(data: any) {
  const newData = data.split(/\r?\n/);

  for (let datum = 0; datum < newData.length; datum += 1) {
    assignCards(newData[datum]);
    checkWinner(player1, player2, winningCounter);
  }

  console.log(`Player 1: ${winningCounter.player1HandsWon} hands`);
  console.log(`Player 2: ${winningCounter.player2HandsWon} hands`);
}
