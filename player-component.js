
export const playerComponent ={
    template:
    `
    <div :class="datas.sideClassName">
        <h2>{{datas.sideName}}のカード</h2>
        <p class="info" v-if="datas.burstFlag">バーストしました</p>
        <p class="info" v-else-if="datas.bjFlag">ブラックジャック</p>
        <p class="info" v-else="datas.burstFlag">--</p>

        <div :class="datas.cardClassName">
            <img
            v-for="card in datas.deck"
            :src="card.img"
            >
            <img v-show="datas.nowSetting" src="./img/bk0.png">
            <img v-show="datas.nowSetting" src="./img/bk0.png">
        </div>

        <p class="sum">
            {{datas.sum}}
            <span v-show="datas.AInMyDeckFlag">({{datas.sumAIn}})</span>
        </p>
    </div>
    `,
    data() {
        return {
            datas:this.value
        }
    },
    props:["value"],
    methods: {
    },
}

