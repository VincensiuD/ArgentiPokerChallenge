/* eslint-disable no-undef */

import {compare} from '../index';
import { Card } from '../interfaces';

describe("Main test suite", () => {
  it("True to be true", () => {
    expect(true).toBe(true);
  });
});

describe("Check sort function", () => {
  it("returning comparison", () => {
    const card1:Card = {rank:9, suit:"H"};
    const card2:Card = {rank:9, suit:"J"};
    const card3:Card = {rank:11, suit:"J"};

    expect(compare(card1,card2)).toEqual(0);
    expect(compare(card1,card3)).toEqual(-1);
  });
});