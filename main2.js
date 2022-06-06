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
            @click="pushedFightButton"
            >勝負!</button>
        </div>
        <button
        class="reset"
        @click="pushedResetButton"
        :disabled="gameEnd">もう一回!</button>
    </div>
    `,
    data() {
        return {
            moreCardButtonDisabledFlag:false,
            message:'カードがほしい?',
            //制御
            cannotRetry:true,
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

            this.humanDatas.sum    = this.human.getSum();
            this.humanDatas.sumAIn = this.human.getSumAIn();

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
                this.cannotRetry = true;

                // バーストフラグを立てる
                this.humanDatas.burstFlag = true
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

        },
        pushedResetButton(){
            location.reload()
        }
    },
    components: {
        playerComponent,
    },
    mounted() {
        this.masterDeck.shuffle()
        // this.humanDatas.nowSetting = fasle
    },
    
}).mount('#app')