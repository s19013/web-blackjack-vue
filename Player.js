export class Player{
    constructor() {
        this.myDeck = [];
        this.sum = 0;
        this.sumAIn = 0;

        //フラグ
        //今回は全部フラグで管理しようと思う -> 統一性を持たせるため
        //全部ゲッターでとる
        this.AInMyDeckFlag =false;
        this.tenInMyDeckFlag = false;
        this.burstFlag=false;
        this.burstAInFlag=false;
        this.bjFlag =false;

    }

    //引数に受け取ったカードを加える
    addCard(card){this.myDeck.push(card);}

    //myDeck内のカードの合計を計算
    sumCard(){
        this.sum=0; //一回リセットしてから
        for (let i = 0; i < this.myDeck.length; i++) {this.sum+=this.myDeck[i].value;}
    }

    //myDeck内にAがある時の計算
    sumCardAIn(){
        this.checkAInMyDeck();//<-これを先に動かさないと色々不便
        if (this.AInMyDeckFlag === true) {
            this.sumAIn = 0; //一回リセットしてから
            this.sumAIn = this.sum + 10;
        }
    }


    //myDeckの中にAが入っているか確認する
    checkAInMyDeck(){
        for (let i = 0; i < this.myDeck.length; i++) {
            if (this.myDeck[i].value == 1) {
                this.AInMyDeckFlag=true;
                return;
            }
        }
        this.AInMyDeckFlag=false;
    }

    //myDeckの中に10札が入っているか確認する
    checkTenInMyDeck(){
        for (let i = 0; i < this.myDeck.length; i++) {
            if (this.myDeck[i].value==10) {
                this.tenInMyDeckFlag=true;
                return;
            }
        }
        this.tenInMyDeckFlag=false;
    }

    //BJを達成しているか確認調べる
    checkBJ(){
        this.checkAInMyDeck();
        this.checkTenInMyDeck();
        if (this.myDeck.length==2 &&
            this.AInMyDeckFlag == true &&
            this.tenInMyDeckFlag==true) {
                this.bjFlag = true;
                return;
            }
        this.bjFlag = false;
    }

    //自分がバーストしているか調べる
    checkBurst(){
        if (this.sum > 21) {this.burstFlag = true;}
        else {this.burstFlag = false;}
    }

    checkBurstAIn(){
        if (this.sumAIn > 21) {this.burstAInFlag = true;}
        else{this.burstAInFlag = false;}
    }

    //ゲッター
    getMydeck(){return this.myDeck;}
    getAInMyDeckFlag(){return this.AInMyDeckFlag;}
    gettenInMyDeckFlag(){return this.tenInMyDeckFlag;}
    getburstFlag(){return this.burstFlag;}
    getburstAInFlag(){return this.burstAInFlag;}
    getbjFlag(){return this.bjFlag;}
    getSum(){return this.sum;}
    getSumAIn(){return this.sumAIn;}

}