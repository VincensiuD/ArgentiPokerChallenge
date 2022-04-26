import {
  checkFlush,
  checkStraight,
  checkPlayerPokerRank,
  checkPairsCombination,
  tieBreaker,
} from "../pokerRanks";


import{Player,Card} from '../interfaces';

describe("Checking if player's hand is a flush", () => {
  test("Returns true if player's hand is flush", () => {
    const player1: Player = {
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

    const player2: Player = {
        hands: [
          { rank: 5, suit: "S" },
          { rank: 10, suit: "S" },
          { rank: 11, suit: "S" },
          { rank: 12, suit: "S" },
          { rank: 14, suit: "S" },
        ],
        highestCard: { rank: 14, suit: "2" },
        secondHighestCard: { rank: 12, suit: "S" },
        pokerRank: 0,
      };

    expect(checkFlush(player1)).toBe(false);
    expect(checkFlush(player2)).toBe(true);
  });
});

describe("Checking if player's hand is a straight", () => {
    test("Returns true if player's hand is straight", () => {
      const player1: Player = {
        hands: [
          { rank: 5, suit: "H" },
          { rank: 6, suit: "D" },
          { rank: 7, suit: "S" },
          { rank: 8, suit: "C" },
          { rank: 9, suit: "S" },
        ],
        highestCard: { rank: 9, suit: "S" },
        secondHighestCard: { rank: 8, suit: "C" },
        pokerRank: 0,
      };
  
      const player2: Player = {
          hands: [
            { rank: 5, suit: "S" },
            { rank: 10, suit: "S" },
            { rank: 11, suit: "S" },
            { rank: 12, suit: "S" },
            { rank: 14, suit: "S" },
          ],
          highestCard: { rank: 14, suit: "2" },
          secondHighestCard: { rank: 12, suit: "S" },
          pokerRank: 0,
        };
  
      expect(checkStraight(player1)).toBe(true);
      expect(checkStraight(player2)).toBe(false);
    });
  });