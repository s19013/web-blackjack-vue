import {playerComponent} from './player-component.js';
import {Deck} from "./Deck.js";
import {Computer} from './Computer.js';
import { Player } from "./Player.js";

const app = Vue.createApp({})

app.component('main-component',{
    template:
    `
    <div>
        <h1>ブラックジャック</h1>
        <player-component
        :value="computerDatas"
        ></player-component>

        <p> {{message}} </p>

        <player-component
        :value="humanDatas"
        ></player-component>

        <div class="controler">
            <button
            class="btn btn-primary"
            :disabled="cannotPickup"
            @click="pushedMoreCardButton"
            >カードをもらう</button>

            <button
            type="button"
            class="btn btn-danger"
            @click="pushedFightButton"
            >
            勝負!
            </button>

            <button
            class="reset"
            @click="pushedResetButton"
            :disabled="cannotReset">もう一回!</button>
        </div>
    </div>
    `,
    components: {
        playerComponent,
    },
    data() {
        return {
            moreCardButtonDisabledFlag:false,
            message:'カードがほしい?',
            //制御
            cannotReset:true,
            cannotPickup:false,
            //オブジェクト生成
            masterDeck:new Deck(),
            computer:new Computer(),
            human:new Player(),
            //各々のデータ
            humanDatas:{
                deck:[],
                sum:0,
                sumAIn:0,
                sideName:"あなた",
                sideClassName:"humanSide",
                cardClassName:"humanCard",

                //フラグ
                AInMyDeckFlag  :false,
                burstFlag      :false,
                bjFlag         :false,
                nowSetting     :false,
            },
            computerDatas:{
                deck:[],
                sum:0,
                sumAIn:0,
                sideName:"相手",
                sideClassName:"computerSide",
                cardClassName:"computerCard",

                //フラグ
                AInMyDeckFlag  :false,
                burstFlag      :false,
                bjFlag         :false,
                nowSetting     :true,
            }
        }
    },
    methods: {
        addCard(who) {
            //引数で分岐､カードを追加したあとカウンターを動かす
            switch (who) {
                case "C":
                    this.computer.addCard(this.masterDeck.pickupCard());
                    break;
                case"H":
                    this.human.addCard(this.masterDeck.pickupCard());
                    //人間はどのカードを受け取ったかすぐ反映させる
                    this.humanDatas.deck = this.human.getMydeck()
                    break;
                default:
                    break;
            }
            this.masterDeck.plusCounter();
        },
        //人間の処理
        humanProces() {
            this.human.sumCard();
            this.human.sumCardAIn();

            this.humanDatas.sum    = this.human.getSum();
            this.humanDatas.sumAIn = this.human.getSumAIn();
            
            if (this.human.getSumAIn() < 21) {
                this.humanDatas.AInMyDeckFlag  = this.human.getAInMyDeckFlag()
            }
            //bjが成立しているか確かめる
            this.human.checkBJ();
            if (this.human.getbjFlag()==true) {
                // カードをもらうボタンを無効化
                this.cannotPickup = true;

                //ブラックジャックフラグを立てる
                this.humanDatas.bjFlag = true
            }
            //バーストしているか確かめる
            this.human.checkBurst();
            this.human.checkBurstAIn();
            if (this.human.getburstFlag() == true) {
                // カードをもらうボタンを無効化
                this.cannotPickup = true;

                //リセットボタンを押せるようにする
                this.cannotReset = false;

                // バーストフラグを立てる
                this.humanDatas.burstFlag = true
            }
        },
        //コンピューターの処理
        computerProcess() {
            while (true) {
                this.computer.sumCard();
                this.computer.sumCardAIn();

                //bj
                this.computer.checkBJ();
                if (this.computer.getbjFlag()==true) {
                    this.computerDatas.bjFlag = true
                    break;
                }

                //burst
                this.computer.checkBurst();
                this.computer.checkBurstAIn();
                if (this.computer.getburstFlag() == true) {
                    this.computerDatas.burstFlag = true
                    break;
                }


                if (this.computer.isSumAInUnder16() == false) {break;}
                if (this.computer.isSumUnder16() == false) {break;}

                //カードを引くのをやめなければいけない要素をすべて満たさない時にやっとカードを引く
                this.addCard("C");
            }
            //一通りのコンピューターの動きを終えてから表示に関する処理をする
            this.computerDatas.nowSetting = false
            this.computerDatas.deck = this.computer.getMydeck()
            this.computerDatas.sum  = this.computer.getSum()
            this.computerDatas.sumAIn = this.computer.getSumAIn()
            if (this.computer.getSumAIn() < 21) {
                this.computerDatas.AInMyDeckFlag  = this.computer.getAInMyDeckFlag()
            }
            this.judge()
        },
        judge() {
            //リセットボタンを押せるようにする
            this.cannotReset= false;

            // 人間がbjだった
            if (this.human.getbjFlag() == true) {
                if (this.computer.getbjFlag() == true) {
                    this.message = "引き分け"
                    return;
                }
                else {
                    this.message = "あなたの勝ち"
                    return;
                }
            }
            //コンピューターだけがbjだった
            //&& human.getbjFlag() == falseと書く必要はない前のifでhuman.getbjFlag() == false だと証明ずみ
            if (this.computer.getbjFlag() == true ) {
                this.message = "あなたの負け"
                return;
            }
            // 人間がバーストした
            if (this.human.getburstFlag() == true) {
                if (this.computer.getburstFlag() == true) {
                    this.message = "引き分け"
                    return;
                }
                else {
                    this.message = "あなたの負け"
                    return;
                }
            }
            // コンピューターだけがバーストした
            if (this.computer.getburstFlag() == true) {
                this.message = "あなたの勝ち"
                return;
            }
            //数字で勝負
            //変数下準備
            var humanSum = 0;
            var computerSum = 0;
            
            if (this.human.getSumAIn() <=21 && 
            this.human.getSum() < this.human.getSumAIn())  { humanSum = this.human.getSumAIn(); }
            else {humanSum = this.human.getSum();}
        
            if (this.computer.getSumAIn() <=21 && 
            this.computer.getSum() < this.computer.getSumAIn())  { computerSum = this.computer.getSumAIn(); }
            else {computerSum = this.computer.getSum();}
        
            //同点
            if (humanSum == computerSum) {
                this.message = "引き分け"
                return;
            }
        
            if (humanSum > computerSum) {
                this.message = "あなたの勝ち"
                return;
            }
            else{
                this.message = "あなたの負け"
                return;
            }
        },
        //ボタン系の処理
        pushedMoreCardButton(){
            this.addCard("H");
            this.humanProces();
        },
        pushedFightButton(){
            // カードをもらうボタンを無効化
            this.cannotPickup = true;
            this.computerProcess()

        },
        pushedResetButton(){
            location.reload()
        }
    },
    mounted() {
        this.masterDeck.shuffle()

        for (let i = 0; i <2; i++) {
            this.addCard("H")
            this.addCard("C")
        }
        this.humanProces()
        this.humanDatas.nowSetting = false
    },
    
}).mount('#app')