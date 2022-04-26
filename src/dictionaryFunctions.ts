import { Player,Card } from "./interfaces";
/**
 * Obtain the key of a dictionary from its value.
 * @param duplicate the value of which key is being search.
 * @param cardAmountRecord dictionary.
 * @returns the key in number.
 */
export function getKeyFromValue(duplicate: number, cardAmountRecord: {}): number {
    const newArr: any = Object.entries(cardAmountRecord).find(
      ([key, value]) => value === duplicate
    );
  
    const keyInNumber = parseInt(newArr[0], 10);
    return keyInNumber;
  }
  

 /**
  * getCardFromKey returns a Card object from a given key. 
  * It is mainly used to retrieve a Card object that is part of a pair in the player's hand.
  * @param amount the amount of card that has pairs, which is also the value in the dictionary.
  * @param player Player object.
  * @param cardAmountRecord a dictionary that stores the key and value of card.
  * @returns a card object.
  */ 
  export function getCardFromKey(
    amount: number,
    player: Player,
    cardAmountRecord: {}
  ): Card {
    const highestPairKey: number = getKeyFromValue(amount, cardAmountRecord);
    return player.hands.find((x) => x.rank === highestPairKey)!;
  }
  