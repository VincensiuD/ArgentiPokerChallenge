let player1HandsWon: number = 0;
let player2HandsWon: number = 0;
interface Card {
  rank: number;
  suit: string;
}

type Player = {
  hands: Card[];
  pokerRank: number;
  highestCard: Card;
  secondHighestCard: Card;
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

export function createPlayerCard(string: string): Card {
  let stringArray = string.split("");

  return { rank: cardRankConverter(stringArray[0]), suit: stringArray[1] };
}

function createPlayerCardsArray(cards: string[]): Card[] {
  let arrayOfCards: Card[] = [];
  for (let i = 0; i < cards.length; i++) {
    arrayOfCards.push(createPlayerCard(cards[i]));
  }
  return arrayOfCards;
}

function assignCards(stream: string) {
  const streamArray: string[] = stream.split(" ");

  const arrayOfAllCards: Card[] = createPlayerCardsArray(streamArray);

  player1.hands = [];
  player2.hands = [];

  for (let j = 0; j < 5; j++) {
    player1.hands.push(arrayOfAllCards[j]);
    player2.hands.push(arrayOfAllCards[j + 5]);
  }

  function compare(card1: Card, card2: Card): number {
    let comparison = 0;
    if (card1.rank > card2.rank) {
      comparison = 1;
    } else if (card2.rank > card1.rank) {
      comparison = -1;
    }
    return comparison;
  }

  player1.hands = player1.hands.sort(compare);
  player2.hands = player2.hands.sort(compare);
}

function cardRankConverter(rank: string): number {
  // this function changes the rank from string to number
  if (rank === "J") {
    return 11;
  }
  if (rank === "Q") {
    return 12;
  }
  if (rank === "K") {
    return 13;
  }
  if (rank === "A") {
    return 14;
  }
  if (rank === "T") {
    return 10;
  }

  return parseInt(rank, 10);
}

function checkPlayerPokerRank(player: Player) {
  const flush: boolean = checkFlush(player);
  const straight: boolean = checkStraight(player);

  if (flush && straight && player.hands[4].rank === 14) {
    return 10;
  }
  if (flush && straight) {
    return 9;
  }
  if (flush) {
    return 6;
  }
  if (straight) {
    return 5;
  }

  return checkPairsCombination(player);
}

function checkFlush(player: Player): boolean {
  for (let j = 0; j < player.hands.length - 1; j++) {
    if (player.hands[j].suit !== player.hands[j + 1].suit) {
      return false;
    }
  }
  player.highestCard = player.hands[4];

  return true;
}

function checkStraight(player: Player): boolean {
  for (let j = 0; j < player.hands.length - 1; j++) {
    if (player.hands[j].rank !== player.hands[j + 1].rank - 1) {
      return false;
    }
  }
  player.highestCard = player.hands[4];
  return true;
}

function getKeyFromValue(duplicate: number, cardAmountRecord: {}): number {
  const newArr: any = Object.entries(cardAmountRecord).find(
    ([key, value]) => value === duplicate
  );

  const keyInNumber = parseInt(newArr[0], 10);
  return keyInNumber;
}

function getCardFromKey(
  amount: number,
  player: Player,
  cardAmountRecord: {}
): Card {
  const highestPairKey: number = getKeyFromValue(amount, cardAmountRecord);
  return player.hands.find((x) => x.rank === highestPairKey)!;
}

function checkPairsCombination(player: Player): number {
  let rankCount: { [key: number]: number } = {};

  for (let i = 0; i < player.hands.length; i++) {
    if (!rankCount.hasOwnProperty(player.hands[i].rank)) {
      rankCount[player.hands[i].rank] = 0;
    }
    rankCount[player.hands[i].rank] += 1;
  }
  if (Object.keys(rankCount).length === 5) {
    return 1;
  }

  if (Object.values(rankCount).includes(4)) {
    player.highestCard = getCardFromKey(4, player, rankCount);
    player.secondHighestCard = getCardFromKey(1, player, rankCount);

    return 8;
  }
  if (Object.values(rankCount).includes(3)) {
    player.highestCard = getCardFromKey(3, player, rankCount);
    if (Object.values(rankCount).includes(2)) {
      player.secondHighestCard = getCardFromKey(2, player, rankCount);
      return 7;
    }
    return 4;
  }

  if (Object.values(rankCount).includes(2)) {
    if (Object.values(rankCount).length === 3) {
      let pairsArray: Card[] = [];

      const unpairedCard: Card = getCardFromKey(1, player, rankCount);
      const indexOfUnpairedCard: number = player.hands.findIndex(
        (element) => unpairedCard === element
      );

      pairsArray = [...player.hands];
      pairsArray.splice(indexOfUnpairedCard, 1);

      if (pairsArray[1].rank > pairsArray[2].rank) {
        player.highestCard = pairsArray[1];
        player.secondHighestCard = pairsArray[2];
      }

      player.highestCard = pairsArray[2];
      player.secondHighestCard = pairsArray[1];

      return 3;
    }

    player.highestCard = getCardFromKey(2, player, rankCount);
    return 2;
  }
  return 1;
}

function tieBreaker(playerA: Player, playerB: Player): number {
  let output = 0;

  let player1NewArray: Card[] = [];
  let player2NewArray: Card[] = [];

  function compareHighestCard(card1: Card, card2: Card): number {
    return card1.rank > card2.rank ? 1 : card1.rank < card2.rank ? 2 : 0;
  }

  function createNewHandsWithoutPairs(player: Player, amount: number): Card[] {
    let nonPairsArray: Card[] = player.hands.filter(
      (x) => x !== player.highestCard
    );
    if (amount === 2) {
      nonPairsArray = nonPairsArray.filter(
        (x) => x !== player.secondHighestCard
      );
    }
    return nonPairsArray;
  }

  if (playerA.pokerRank === 10) {
    return 0;
  }
  if (playerA.pokerRank === 9 || playerA.pokerRank === 5) {
    return compareHighestCard(playerA.highestCard, playerB.highestCard);
  }
  if (
    playerA.pokerRank === 8 ||
    playerA.pokerRank === 7 ||
    playerA.pokerRank === 4 ||
    playerA.pokerRank === 2
  ) {
    output = compareHighestCard(playerA.highestCard, playerB.highestCard);

    if (output > 0) {
      return output;
    }

    player1NewArray = createNewHandsWithoutPairs(playerA, 1);
    player2NewArray = createNewHandsWithoutPairs(playerB, 1);

    for (let i = player1NewArray.length - 1; i > -1; i--) {
      output = compareHighestCard(player1NewArray[i], player2NewArray[i]);

      if (output !== 0) {
        return output;
      }
    }

    return output;
  }
  if (playerA.pokerRank === 6 || playerB.pokerRank === 1) {
    for (let i = 0; i < 4; i++) {
      output = compareHighestCard(playerA.hands[4 - i], playerB.hands[4 - i]);
      if (output !== 0) {
        return output;
      }
    }
    return 0;
  }
  // last possibility is if the code returns player.pokerRank === 3
  output = compareHighestCard(player1.highestCard, player2.highestCard);

  if (output === 0) {
    output = compareHighestCard(
      player1.secondHighestCard,
      player2.secondHighestCard
    );

    if (output === 0) {
      player1NewArray = createNewHandsWithoutPairs(playerA, 2);
      player2NewArray = createNewHandsWithoutPairs(playerB, 2);

      if (player1NewArray[0] > player2NewArray[0]) {
        return 1;
      }
      if (player1NewArray[0] < player2NewArray[0]) {
        return 2;
      }
    }
  }
  return output;
}

function checkWinner(playerA: Player, playerB: Player) {
  playerA.pokerRank = checkPlayerPokerRank(playerA);
  playerB.pokerRank = checkPlayerPokerRank(playerB);

  if (player1.pokerRank > player2.pokerRank) {
    player1HandsWon++;
  } else if (player1.pokerRank < player2.pokerRank) {
    player2HandsWon++;
  } else {
    let winner: number = tieBreaker(player1, player2);

    if (winner === 1) {
      player1HandsWon++;
    } else if (winner === 2) {
      player2HandsWon++;
    }
  }
}

function sum(a:number, b:number) {
  return a + b;
}
module.exports = sum;

export const main = () => {
  console.log("Welcome to the challenge.");

  const fs = require("fs");

  const data = fs.readFileSync(0, {
    encoding: "utf8",
    flag: "r",
  });

  const newData = data.split(/\r?\n/);

  for (let datum = 0; datum < newData.length; datum++) {
    assignCards(newData[datum]);
    checkWinner(player1, player2);
  }

  console.log(`Player 1: ${player1HandsWon} hands`);
  console.log(`Player 2: ${player2HandsWon} hands`);
};
main();
