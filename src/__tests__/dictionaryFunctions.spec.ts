/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { getKeyFromValue, getCardFromKey } from "../dictionaryFunctions";
import { Card, Player } from "../interfaces";

describe("Retrieving the key of a dictionary from the value", () => {
  test("should return the key from the dictionary in number type", () => {
    const dictionary1 = { 5: 1, 9: 2, 11: 1, 12: 1 };
    const input1: number = 2;
    const output1: number = 9;

    const dictionary2 = { 8: 3, 14: 2 };
    const input2: number = 3;
    const output2: number = 8;

    expect(getKeyFromValue(input1, dictionary1)).toEqual(output1);
    expect(getKeyFromValue(input2, dictionary2)).toEqual(output2);
  });
});

describe("Retrieving one of the Card object that is part of a pair in player's hand", () => {
  test("Returns a card object", () => {
    const dictionary = { 5: 1, 8: 1, 12: 3 };
    const player: Player = {
      hands: [
        { rank: 5, suit: "H" },
        { rank: 12, suit: "D" },
        { rank: 12, suit: "S" },
        { rank: 12, suit: "C" },
        { rank: 8, suit: "S" },
      ],
      highestCard: { rank: 12, suit: "D" },
      secondHighestCard: { rank: 8, suit: "S" },
      pokerRank: 0,
    };
    const input: number = 3;
    const output: Card = { rank: 12, suit: "D" };

    expect(getCardFromKey(input, player, dictionary).rank).toEqual(output.rank);
  });
});
