import { Card } from "./interfaces";

/**
 * cardRankConverter converts the rank of card to a numerical value that the rank represent
 * @param rank which is the number/letters written in the card
 * @returns number/ numerical value of the card
 */
 export function cardRankConverter(rank: string): number {
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

/**
 * createPlayerCard creates a card object from string.
 * @param string code that represent rank and suit of card.
 * @returns a Card object with rank and suit properties.
 */ 
export function createPlayerCard(string: string): Card {
    const stringArray = string.split("");
  
    return { rank: cardRankConverter(stringArray[0]), suit: stringArray[1] };
  }
  
/**
 * Create an array of Cards from array of strings.
 * @param cards array of strings.
 * @returns array of Card objects.
 */
export function createPlayerCardsArray(cards: string[]): Card[] {
  const arrayOfCards: Card[] = [];
  for (let i = 0; i < cards.length; i+=1) {
    arrayOfCards.push(createPlayerCard(cards[i]));
  }
  return arrayOfCards;
}

