import { Player } from "./Player.js";

export class Computer extends Player{
    isSumUnder16(){
        if (this.sum < 16) {
            return true;
        }
        console.log(`comDeck > 16`);
        return false;
    }

    isSumAInUnder16(){
        if (this.sumAIn < 16) { return true;}
        return false;
    }
}