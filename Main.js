import {Deck}     from "./Deck.js";
import {Computer} from './Computer.js';
import {Print}    from './Print.js';
import {Player}   from "./Player.js";

//オブジェクト生成
const deck = new Deck();
const computer = new Computer();
const human = new Player();
const print = new Print();

//ボタン類
const $moreCardButton = document.getElementById("moreCard");
const $fightButton = document.getElementById("fight");
const $resetButton = document.getElementById("reset");

//一番最初にやること
function ini() {
    deck.shuffle(deck.list);
    for (let i = 0; i < 2; i++) {
        addCard("H");
        addCard("C");
    }
    //リセットボタン無効化
    $resetButton.disabled = true;
}

//引数で分岐､カードを追加したあとカウンターを動かす
function addCard(who) {
    switch (who) {
        case "C":
            computer.addCard(deck.pickupCard());
            break;
        case"H":
            human.addCard(deck.pickupCard());
            break;
        default:
            break;
    }
    deck.plusCounter();
}

//人間の処理
function humanProces() {
    human.sumCard();
    human.sumCardAIn();
    //bjが成立しているか確かめる
    human.checkBJ();
    if (human.getbjFlag()==true) {
        // カードをもらうボタンを無効化
        $moreCardButton.disabled = true;
        print.changeHumanInfo(`ブラックジャック!`);
    }

    //バーストしているか確かめる
    human.checkBurst();
    human.checkBurstAIn();
    if (human.getburstFlag() == true) {
        // カードをもらうボタンを無効化
        $moreCardButton.disabled = true;
        //リセットボタンを押せるようにする
        $resetButton.disabled = false;
        print.changeHumanInfo(`バーストしました`);
    }
    changeHumanDisp();
}

//コンピューターの処理
function computerProcess() {
    while (true) {
        computer.sumCard();
        computer.sumCardAIn();

        computer.checkBJ();
        if (computer.getbjFlag()==true) {
            print.changeComputerInfo(`ブラックジャック!`);
            break;
        }

        computer.checkBurst();
        computer.checkBurstAIn();
        if (computer.getburstFlag() == true) {
            print.changeComputerInfo(`バーストしました`);
            break;
        }

        if (computer.isSumAInUnder16() == false) {break;}
        if (computer.isSumUnder16() == false) {break;}

        //カードを引くのをやめなければいけない要素をすべて満たさない時にやっとカードを引く
        addCard("C");
    }
    changeComputerDisp();
    judge()
}

//判定
function judge() {
    //リセットボタンを押せるようにする
    $resetButton.disabled = false;
    // 人間がbjだった
    if (human.getbjFlag() == true) {
        if (computer.getbjFlag() == true) {
            print.changeInfo("引き分け");
            return;
        }
        else {
            print.changeInfo("あなたの勝ち");
            return;
        }
    }
    //コンピューターだけがbjだった
    //&& human.getbjFlag() == falseと書く必要はない前のifでhuman.getbjFlag() == false だと証明ずみ
    if (computer.getbjFlag() == true ) {
        print.changeInfo("あなたの負け");
        return;
    }
    // 人間がバーストした
    if (human.getburstFlag() == true) {
        if (computer.getburstFlag() == true) {
            print.changeInfo("引き分け");
            return;
        }
        else {
            print.changeInfo("あなたの負け")
            return;
        }
    }
    // コンピューターだけがバーストした
    if (computer.getburstFlag() == true) {
        print.changeInfo("あなたの勝ち");
        return;
    }
    //数字で勝負
    //変数下準備
    var humanSum = 0;
    var computerSum = 0;
    
    if (human.getSumAIn() <=21 && human.getSum() < human.getSumAIn())  { humanSum =human.getSumAIn(); }
    else {humanSum =human.getSum();}

    if (computer.getSumAIn() <=21 && computer.getSum() < computer.getSumAIn())  { computerSum =computer.getSumAIn(); }
    else {computerSum =computer.getSum();}

    //同点
    if (humanSum == computerSum) {
        print.changeInfo("引き分け");
        return;
    }

    if (humanSum > computerSum) {
        print.changeInfo("あなたの勝ち");
        return;
    }
    else{
        print.changeInfo("あなたの負け");
        return;
    }
}

//コンピューターの表示類を変える
function changeComputerDisp() {
    print.changeComputerCard(computer.getMydeck());
    if (computer.getSumAIn()<22 && computer.getAInMyDeckFlag() == true) {
        print.changeComputerSum(computer.getSum(),computer.getSumAIn());
    }
    else {print.changeComputerSum(computer.getSum(),null);}
}

//人間の表示類を変える
function changeHumanDisp() {
    print.changeHumanCard(human.getMydeck());
    if (human.getSumAIn()<22 && human.getAInMyDeckFlag() == true) {
        print.changeHumanSum(human.getSum(),human.getSumAIn());
    }
    else {print.changeHumanSum(human.getSum(),null);}
}



//ボタンを押したらカードをもらう
$moreCardButton.addEventListener('click',(e) =>{
    addCard("H");
    humanProces();
});

//勝負に進むボタンを押したらコンピューターのターンに移る
$fightButton.addEventListener('click',(e) => {
    // カードをもらうボタンを無効化
    $moreCardButton.disabled = true;
    computerProcess()
});

//リセットボタンを押したら再スタート
$resetButton.addEventListener('click',(e) => {location.reload()})

// ini();
// humanProces();













