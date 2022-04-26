/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  checkFlush,
  checkStraight,
  checkPlayerPokerRank,
  checkPairsCombination,
  tieBreaker,
  createNewHandsWithoutPairs,
  compareHighestCard,
} from "../pokerRanks";

import { Player, Card } from "../interfaces";

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

describe("Checking if player's hand is a full house", () => {
  test("Returns 7 if player's hand is full house", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 9, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 5, suit: "D" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(7);
  });
});

describe("Checking if player's hand has a double pairs", () => {
  test("Returns 3 if player's hand has a double pairs", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 8, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 8, suit: "S" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(3);
  });
});

describe("Checking if player's hand has a single pair", () => {
  test("Returns 2 if player's hand has a single pair", () => {
    const player1: Player = {
      hands: [
        { rank: 2, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 8, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 8, suit: "S" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(2);
  });
});

describe("Checking if player's hand has a 3 of a kind combination", () => {
  test("Returns 4 if player's hand has a 3 of a kind combination", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "D" },
        { rank: 8, suit: "H" },
        { rank: 9, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 8, suit: "H" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(4);
  });
});

describe("Checking if player's hand is a full house", () => {
  test("Returns 7 if player's hand is full house", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 9, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 5, suit: "D" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(7);
  });
});

describe("Checking if player's hand has a double pairs", () => {
  test("Returns 3 if player's hand has a double pairs", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 8, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 8, suit: "S" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(3);
  });
});

describe("Checking if player's hand has a single pair", () => {
  test("Returns 2 if player's hand has a single pair", () => {
    const player1: Player = {
      hands: [
        { rank: 2, suit: "D" },
        { rank: 5, suit: "H" },
        { rank: 8, suit: "S" },
        { rank: 9, suit: "C" },
        { rank: 9, suit: "H" },
      ],
      highestCard: { rank: 9, suit: "H" },
      secondHighestCard: { rank: 8, suit: "S" },
      pokerRank: 0,
    };

    expect(checkPairsCombination(player1)).toBe(2);
  });
});

describe("Checking the player's poker rank", () => {
  test("Expect to return 10 since the player has royal flush hand", () => {
    const player1: Player = {
      hands: [
        { rank: 10, suit: "H" },
        { rank: 11, suit: "H" },
        { rank: 12, suit: "H" },
        { rank: 13, suit: "H" },
        { rank: 14, suit: "H" },
      ],
      highestCard: { rank: 14, suit: "H" },
      secondHighestCard: { rank: 13, suit: "H" },
      pokerRank: 0,
    };

    expect(checkPlayerPokerRank(player1)).toBe(10);
  });
});

describe("Checking the player's poker rank", () => {
  test("Expect to return 6 since the player has a flush hand", () => {
    const player1: Player = {
      hands: [
        { rank: 5, suit: "H" },
        { rank: 10, suit: "H" },
        { rank: 12, suit: "H" },
        { rank: 13, suit: "H" },
        { rank: 14, suit: "H" },
      ],
      highestCard: { rank: 14, suit: "H" },
      secondHighestCard: { rank: 13, suit: "H" },
      pokerRank: 0,
    };

    expect(checkPlayerPokerRank(player1)).toBe(6);
  });
});

describe("Checking the player's poker rank", () => {
  test("Expect to return 1 since the player only has highest card combination", () => {
    const player1: Player = {
      hands: [
        { rank: 3, suit: "H" },
        { rank: 11, suit: "D" },
        { rank: 12, suit: "H" },
        { rank: 13, suit: "H" },
        { rank: 14, suit: "H" },
      ],
      highestCard: { rank: 14, suit: "H" },
      secondHighestCard: { rank: 13, suit: "H" },
      pokerRank: 0,
    };

    expect(checkPlayerPokerRank(player1)).toBe(1);
  });
});

describe("Checking the tiebreaker function result when both players have the same rank", () => {
  test("Expect to return 2 since the player 2 has higher unpaired card", () => {
    const player1: Player = {
      hands: [
        { rank: 10, suit: "H" },
        { rank: 10, suit: "S" },
        { rank: 12, suit: "H" },
        { rank: 14, suit: "D" },
        { rank: 14, suit: "H" },
      ],
      highestCard: { rank: 14, suit: "H" },
      secondHighestCard: { rank: 10, suit: "H" },
      pokerRank: 0,
    };

    const player2: Player = {
      hands: [
        { rank: 10, suit: "C" },
        { rank: 10, suit: "D" },
        { rank: 13, suit: "H" },
        { rank: 14, suit: "C" },
        { rank: 14, suit: "S" },
      ],
      highestCard: { rank: 14, suit: "S" },
      secondHighestCard: { rank: 10, suit: "C" },
      pokerRank: 0,
    };

    expect(tieBreaker(player1, player2)).toBe(2);
  });
});

describe("Comparing 2 cards to determine which one has higher rank", () => {
  test("Expect to match output: 1 if card 1 is higher, 2 if card 2 is higher, or 0 when tie ", () => {
    const cards1: Card[] = [
      { rank: 5, suit: "H" },
      { rank: 10, suit: "H" },
      { rank: 12, suit: "H" },
      { rank: 13, suit: "H" },
    ];

    const cards2: Card[] = [
      { rank: 6, suit: "H" },
      { rank: 12, suit: "H" },
      { rank: 12, suit: "H" },
      { rank: 3, suit: "H" },
    ];

    const output: number[] = [2, 2, 0, 1];
    for (let index = 0; index < cards1.length; index += 1) {
      expect(compareHighestCard(cards1[index], cards2[index])).toEqual(
        output[index]
      );
    }
  });
});

describe("Testing createNewHandsWithoutPairs function", () => {
  test("Expect to create a new array that contains player's unpaired card(s) ", () => {
    const player2: Player = {
      hands: [
        { rank: 10, suit: "C" },
        { rank: 10, suit: "D" },
        { rank: 13, suit: "H" },
        { rank: 14, suit: "C" },
        { rank: 14, suit: "S" },
      ],
      highestCard: { rank: 14, suit: "S" },
      secondHighestCard: { rank: 10, suit: "C" },
      pokerRank: 0,
    };

    const output: Card[] = [{ rank: 13, suit: "H" }];
    expect(createNewHandsWithoutPairs(player2, 2)).toEqual(output);
  });
});
