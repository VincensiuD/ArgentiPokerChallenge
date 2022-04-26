import {Player, Card} from './interfaces';
import { getCardFromKey } from './dictionaryFunctions';

/**
 * This function checks if the player's hand fulfils the flush (all same suits) criteria
 * @param player Player object, which contains the player's hands
 * @returns true if all cards in player's hand have the same suit, false otherwise
 */
export function checkFlush(player: Player): boolean {
    for (let j = 0; j < player.hands.length - 1; j+=1) {
      if (player.hands[j].suit !== player.hands[j + 1].suit) {
        return false;
      }
    }
    player.highestCard = player.hands[4];
  
    return true;
  }

  /**
 * This function checks if the player's hand fulfils the straight (sequential rank) criteria
 * @param player Player object, which contains the player's hands
 * @returns true if all cards in the player's hand form a sequential rank, false otherwise
 */
 export function checkStraight(player: Player): boolean {
    for (let j = 0; j < player.hands.length - 1; j+=1) {
      if (player.hands[j].rank !== player.hands[j + 1].rank - 1) {
        return false;
      }
    }
    player.highestCard = player.hands[4];
    return true;
  }

  /**
   * This function will check whether player's hand has any kind of pair combinations
   * pair combination includes: single pair, double pair, 3 of a kind, full house or 4 of a kind
   * @param player Player object, which contains the player's hands
   * @returns true if any of the pair combination mentioned above exists in the player's hand
   */
 export function checkPairsCombination(player: Player): number {
    const rankCount: { [key: number]: number } = {};
  
    for (let i = 0; i < player.hands.length; i+=1) {
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
  

/**
 * This function calculate the rank of player's poker hand
 * @param player Player object, which contains the player's hands
 * @returns the rank of the player's hand in number, e.g. royal flush = 10, full house = 7 etc
 */
 export function checkPlayerPokerRank(player: Player) {
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

/**
 * This function will be executed if both players have the same rank. 
 * It will determine the highest rank of each player's card or in case of pairs,
 * it will determine the rank of the cards that have the pair from each player and assign the player
 * with highest rank card as the winner
 * @param playerA First player
 * @param playerB Second player
 * @returns number 1 if the first player wins, or 2 if the second player wins, 0 if tie
 */
 export function tieBreaker(playerA: Player, playerB: Player): number {
    let output = 0;
  
    let playerANewArray: Card[] = [];
    let playerBNewArray: Card[] = [];
  
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
  
      playerANewArray = createNewHandsWithoutPairs(playerA, 1);
      playerBNewArray = createNewHandsWithoutPairs(playerB, 1);
  
      for (let i = playerANewArray.length - 1; i > -1; i-=1) {
        output = compareHighestCard(playerANewArray[i], playerBNewArray[i]);
  
        if (output !== 0) {
          return output;
        }
      }
  
      return output;
    }
    if (playerA.pokerRank === 6 || playerB.pokerRank === 1) {
      for (let i = 0; i < 4; i+=1) {
        output = compareHighestCard(playerA.hands[4 - i], playerB.hands[4 - i]);
        if (output !== 0) {
          return output;
        }
      }
      return 0;
    }
    
    output = compareHighestCard(playerA.highestCard, playerB.highestCard);
  
    if (output === 0) {
      output = compareHighestCard(
        playerA.secondHighestCard,
        playerB.secondHighestCard
      );
  
      if (output === 0) {
        playerANewArray = createNewHandsWithoutPairs(playerA, 2);
        playerBNewArray = createNewHandsWithoutPairs(playerB, 2);
  
        if (playerANewArray[0] > playerBNewArray[0]) {
          return 1;
        }
        if (playerANewArray[0] < playerBNewArray[0]) {
          return 2;
        }
      }
    }
    return output;
  }
  
 
  