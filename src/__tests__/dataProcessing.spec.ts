/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { Player,Card,WinningCounter } from "../interfaces";
import {checkWinner} from "../dataProcessing";

describe("Testing checkWinner function", () => {
    it("", () => {

        const winningCounter: WinningCounter ={
            player1HandsWon:0,
            player2HandsWon:0
        };

        const player1: Player = {
            hands: [
              { rank: 2, suit: "S" },
              { rank: 3, suit: "H" },
              { rank: 3, suit: "D" },
              { rank: 14, suit: "D" },  
              { rank: 14, suit: "C" },
            ],
            highestCard: { rank: 14, suit: "C" },
            secondHighestCard: { rank: 3, suit: "H" },
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
            highestCard: { rank: 14, suit: "S" },
            secondHighestCard: { rank: 12, suit: "S" },
            pokerRank: 0,
          };

          checkWinner(player1,player2,winningCounter)

      expect(winningCounter.player1HandsWon).toEqual(0);
      expect(winningCounter.player2HandsWon).toEqual(1);
    });
  });
  