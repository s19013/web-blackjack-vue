import {playerComponent} from './player-component.js';
import {Deck} from "./Deck.js";
import {Computer} from './Computer.js';
import {Print} from './Print.js';
import { Player } from "./Player.js";

const app = Vue.createApp({
})

app.component('main-component',{
    template:
    `
    <div>
        <h1>ブラックジャック</h1>
        <pre>{{humanDatas}}</pre>
        <player-component
        :value="computerDatas"
        ></player-component>
        <player-component
        :value="humanDatas"
        ></player-component>

        <div class="controler">
            <button
            class="btn btn-primary"
            :disabled="cannotPickup"
            @click="pushedMoreCardButton"
            >カードをもらう</button>
            <button id="fight">勝負!</button>
        </div>
        <button id="reset" class="reset" :disabled="gameEnd">もう一回!</button>
    </div>
    `,
    data() {
        return {
            moreCardButtonDisabledFlag:false,
            gameEnd:true,
            cannotPickup:false,
            masterDeck:new Deck(),
            computer:new Computer(),
            human:new Player(),
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
                nowSetting     :true,
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
                    this.humanDatas.deck = this.human.getMydeck()
                    break;
                default:
                    break;
            }
            this.masterDeck.plusCounter();
        },
        humanProces() {
            this.human.sumCard();
            this.human.sumCardAIn();
            //bjが成立しているか確かめる
            this.human.checkBJ();
            if (this.human.getbjFlag()==true) {
                // カードをもらうボタンを無効化
                // $moreCardButton.disabled = true;
                // print.changeHumanInfo(`ブラックジャック!`);
            }
        
            //バーストしているか確かめる
            this.human.checkBurst();
            this.human.checkBurstAIn();
            if (this.human.getburstFlag() == true) {
                // カードをもらうボタンを無効化
                // $moreCardButton.disabled = true;
                //リセットボタンを押せるようにする
                // $resetButton.disabled = false;
                // print.changeHumanInfo(`バーストしました`);
            }

            //表示に関する処理
            this.humanDatas.sum = this.human.getSum();
        },
        pushedMoreCardButton(){
            this.addCard("H");
            this.humanProces();
        }
    },
    components: {
        playerComponent,
    },
    mounted() {
        this.masterDeck.shuffle()
    },
    
}).mount('#app')