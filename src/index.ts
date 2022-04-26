import {Player,Card} from './interfaces'
import { checkPlayerPokerRank,tieBreaker } from './pokerRanks';
import { createPlayerCardsArray } from './converters';


const fs = require("fs");

let player1HandsWonCounter: number = 0;
let player2HandsWonCounter: number = 0;

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
 * This function check the winner of a single game and add the winner in the counter.
 * @param playerA First player.
 * @param playerB Second player.
 */
export function checkWinner(playerA: Player, playerB: Player):void {
  playerA.pokerRank = checkPlayerPokerRank(playerA);
  playerB.pokerRank = checkPlayerPokerRank(playerB);

  if (player1.pokerRank > player2.pokerRank) {
    player1HandsWonCounter+=1;
  } else if (player1.pokerRank < player2.pokerRank) {
    player2HandsWonCounter+=1;
  } else {
    const winner: number = tieBreaker(player1, player2);

    if (winner === 1) {
      player1HandsWonCounter+=1;
    } else if (winner === 2) {
      player2HandsWonCounter+=1;
    }
  }
}

/**
 * This function is to be used in the sort function to compare the rank of card
 * @param card1 
 * @param card2 
 * @returns number
 */
export function compare(card1: Card, card2: Card): number {
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

  for (let j = 0; j < 5; j+=1) {
    player1.hands.push(arrayOfAllCards[j]);
    player2.hands.push(arrayOfAllCards[j + 5]);
  }

  player1.hands = player1.hands.sort(compare);
  player2.hands = player2.hands.sort(compare);
}

/**
 * This function process the data obtained from .txt files that contains one or multiple games,
 * it then splits them by line if there are multiple games, then create cards and assigns it to players,
 * and then check who wins.
 * @param data data that was read from file.
 */
function dataProcessing(data: any){
  const newData = data.split(/\r?\n/);

  for (let datum = 0; datum < newData.length; datum+=1) {
    assignCards(newData[datum]);
    checkWinner(player1, player2);
  }

  console.log(`Player 1: ${player1HandsWonCounter} hands`);
  console.log(`Player 2: ${player2HandsWonCounter} hands`);
};


 const main = () => {
  console.log("Welcome to the challenge.");

  const data = fs.readFileSync(0, {
    encoding: "utf8",
    flag: "r",
  });

  dataProcessing(data);
}

main();
