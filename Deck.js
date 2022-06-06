import {Card} from './Card.js';
export class Deck{
    constructor() {
        this.s01 = new Card(1, "./img/s01.png");
        this.s02 = new Card(2, "./img/s02.png");
        this.s03 = new Card(3, "./img/s03.png");
        this.s04 = new Card(4, "./img/s04.png");
        this.s05 = new Card(5, "./img/s05.png");
        this.s06 = new Card(6, "./img/s06.png");
        this.s07 = new Card(7, "./img/s07.png");
        this.s08 = new Card(8, "./img/s08.png");
        this.s09 = new Card(9, "./img/s09.png");
        this.s10 = new Card(10,"./img/s10.png");
        this.s11 = new Card(10,"./img/s11.png");
        this.s12 = new Card(10,"./img/s12.png");
        this.s13 = new Card(10,"./img/s13.png");
        this.c01 = new Card(1, "./img/c01.png");
        this.c02 = new Card(2, "./img/c02.png");
        this.c03 = new Card(3, "./img/c03.png");
        this.c04 = new Card(4, "./img/c04.png");
        this.c05 = new Card(5, "./img/c05.png");
        this.c06 = new Card(6, "./img/c06.png");
        this.c07 = new Card(7, "./img/c07.png");
        this.c08 = new Card(8, "./img/c08.png");
        this.c09 = new Card(9, "./img/c09.png");
        this.c10 = new Card(10,"./img/c10.png");
        this.c11 = new Card(10,"./img/c11.png");
        this.c12 = new Card(10,"./img/c12.png");
        this.c13 = new Card(10,"./img/c13.png");
        this.d01 = new Card(1, "./img/d01.png");
        this.d02 = new Card(2, "./img/d02.png");
        this.d03 = new Card(3, "./img/d03.png");
        this.d04 = new Card(4, "./img/d04.png");
        this.d05 = new Card(5, "./img/d05.png");
        this.d06 = new Card(6, "./img/d06.png");
        this.d07 = new Card(7, "./img/d07.png");
        this.d08 = new Card(8, "./img/d08.png");
        this.d09 = new Card(9, "./img/d09.png");
        this.d10 = new Card(10,"./img/d10.png");
        this.d11 = new Card(10,"./img/d11.png");
        this.d12 = new Card(10,"./img/d12.png");
        this.d13 = new Card(10,"./img/d13.png");
        this.h01 = new Card(1, "./img/h01.png");
        this.h02 = new Card(2, "./img/h02.png");
        this.h03 = new Card(3, "./img/h03.png");
        this.h04 = new Card(4, "./img/h04.png");
        this.h05 = new Card(5, "./img/h05.png");
        this.h06 = new Card(6, "./img/h06.png");
        this.h07 = new Card(7, "./img/h07.png");
        this.h08 = new Card(8, "./img/h08.png");
        this.h09 = new Card(9, "./img/h09.png");
        this.h10 = new Card(10,"./img/h10.png");
        this.h11 = new Card(10,"./img/h11.png");
        this.h12 = new Card(10,"./img/h12.png");
        this.h13 = new Card(10,"./img/h13.png");

        this.list = [
            this.s01,
            this.s02,
            this.s03,
            this.s04,
            this.s05,
            this.s06,
            this.s07,
            this.s08,
            this.s09,
            this.s10,
            this.s11,
            this.s12,
            this.s13,
            this.c01,
            this.c02,
            this.c03,
            this.c04,
            this.c05,
            this.c06,
            this.c07,
            this.c08,
            this.c09,
            this.c10,
            this.c11,
            this.c12,
            this.c13,
            this.d01,
            this.d02,
            this.d03,
            this.d04,
            this.d05,
            this.d06,
            this.d07,
            this.d08,
            this.d09,
            this.d10,
            this.d11,
            this.d12,
            this.d13,
            this.h01,
            this.h02,
            this.h03,
            this.h04,
            this.h05,
            this.h06,
            this.h07,
            this.h08,
            this.h09,
            this.h10,
            this.h11,
            this.h12,
            this.h13
            ];

            this.counter = 0;
    }

    // Fisher-Yatesシャッフル
    shuffle() {
        for(var i = (this.list.length - 1); 0 < i; i--){
            // 0〜(i+1)の範囲で値を取得
            var r = Math.floor(Math.random() * (i + 1));
            // 要素の並び替えを実行
            var tmp = this.list[i];
            this.list[i] = this.list[r];
            this.list[r] = tmp;
          }
        //   this.list= array;
        return;
    }

    //カードを一枚近く取り出す
    //counterと同じ場所のカードを取り出す
    pickupCard(){return this.list[this.counter];}

    //counterを1増やす
    plusCounter(){this.counter+=1;}
}

