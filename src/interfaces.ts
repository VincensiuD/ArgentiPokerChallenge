export interface Card {
    rank: number;
    suit: string;
  }
  
export interface Player  {
    hands: Card[];
    pokerRank: number;
    highestCard: Card;
    secondHighestCard: Card;
  };
  
  export interface WinningCounter{
    player1HandsWon: number;
    player2HandsWon: number;
  }