export class Print{
    constructor() {
        //コンピューターの手札
        this.$computerCard1 = document.getElementById("computerCard1");
        this.$computerCard2 = document.getElementById("computerCard2");
        this.$computerCard3 = document.getElementById("computerCard3");
        this.$computerCard4 = document.getElementById("computerCard4");
        this.$computerCard5 = document.getElementById("computerCard5");
        this.$computerCard6 = document.getElementById("computerCard6");
        this.$computerCard7 = document.getElementById("computerCard7");
        this.$computerCard8 = document.getElementById("computerCard8");
        this.comList= [
            this.$computerCard1 ,
            this.$computerCard2 ,
            this.$computerCard3 ,
            this.$computerCard4 ,
            this.$computerCard5 ,
            this.$computerCard6 ,
            this.$computerCard7 ,
            this.$computerCard8
        ]
        //人間の手札
        this.$humanCard1 = document.getElementById("humanCard1");
        this.$humanCard2 = document.getElementById("humanCard2");
        this.$humanCard3 = document.getElementById("humanCard3");
        this.$humanCard4 = document.getElementById("humanCard4");
        this.$humanCard5 = document.getElementById("humanCard5");
        this.$humanCard6 = document.getElementById("humanCard6");
        this.$humanCard7 = document.getElementById("humanCard7");
        this.$humanCard8 = document.getElementById("humanCard8");
        this.humanList= [
            this.$humanCard1 ,
            this.$humanCard2 ,
            this.$humanCard3 ,
            this.$humanCard4 ,
            this.$humanCard5 ,
            this.$humanCard6 ,
            this.$humanCard7 ,
            this.$humanCard8
        ]

        this.$computerSum = document.getElementById("computerSum");
        this.$humanSum = document.getElementById("humanSum");

        this.$info = document.getElementById("info");
        this.$humanInfo = document.getElementById("humanInfo");
        this.$computerInfo = document.getElementById("computerInfo");
    }

    //人間のカードを表示
    changeHumanCard(array){
        for (let i = 0; i < array.length; i++) {this.humanList[i].src = array[i].img;}
    }

    //コンピューターのカードを表示
    changeComputerCard(array){
        for (let i = 0; i < array.length; i++) {this.comList[i].src = array[i].img;}
    }

    //人間の合計値を表示
    changeHumanSum(sum,sumAIn){
        // sumAInがnullだったらsumAInは表示しない｡あと関数を抜ける
        console.log(`sumAIn:${sumAIn}`);
        if (sumAIn != null) {
            this.$humanSum.textContent = `${sum}(${sumAIn})` ;
            return;
        }
        this.$humanSum.textContent = `${sum}` ;
    }

    //コンピューターの合計値を表示
    changeComputerSum(sum,sumAIn){
        // sumAInがnullだったらsumAInは表示しない｡あと関数を抜ける
        if (sumAIn != null) {
            this.$computerSum.textContent = `${sum}(${sumAIn})` ;
            return;
        }
        this.$computerSum.textContent = `${sum}` ;
    }


    changeHumanInfo(text){this.$humanInfo.textContent = text;}

    changeComputerInfo(text){this.$computerInfo.textContent = text;}

    changeInfo(text){this.$info.textContent = text;}

}