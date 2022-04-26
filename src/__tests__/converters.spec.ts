/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import{cardRankConverter,createPlayerCard,createPlayerCardsArray}from'../converters'



describe("Create a Card object from string", ( )=>{
    test("Convert string in inputs to card object in outputs", () => {
      const inputs = ["2S","TH"];
      const outputs = [{rank:2,suit:"S"},{rank:10,suit:"H"}];
  
      for(let index = 0; index <2; index+=1){
        expect(createPlayerCard(inputs[index])).toEqual(outputs[index]);
      } 
    });
  });

  describe("Rank converter,converts rank to number", ( )=>{
    test("convert rank in inputs to number in outputs", () => {
      const inputs = ["T","Q","J","K","3","2","A"];
      const outputs = [10,12,11,13,3,2,14];
  
      for(let index = 0; index <outputs.length; index+=1){
        expect(cardRankConverter(inputs[index])).toEqual(outputs[index]);
      }
      
    });
  });

  describe("Creating a new array of Card objects from array of strings", ( )=>{
    test("convert rank in inputs to number in outputs", () => {
      const inputs = ["TH","QD","8S"];
      const outputs = [{rank:10,suit:"H"},{rank:12,suit:"D"},{rank:8,suit:"S"}];
  
    
        expect(createPlayerCardsArray(inputs)).toEqual(outputs);
      
    });
  });