<!-- 计价方式 -->
<template>
  <div class="chose-amount-way">
    <Navigation title="计价方式"/>
    <div class="way-box">
        <van-cell-group :border="false">
                <van-cell v-for="(item, index) in wayList" :key="index" clickable @click="onPay(item)">
                    <template #title>
                        <div class="cell-title">
                            <p>{{item.name}}</p>
                            <p>{{item.label}}</p>
                        </div>
                    </template>
                    <template #right-icon>
                        <van-icon name="success" v-if="nowWay == item.name" />
                    </template>
                </van-cell>
        </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            nowWay:'',
            wayList:[
                {
                    name:'USD',
                    label:'$'
                },
                {
                    name:'CNY',
                    label:'¥'
                },
                {
                    name:'JPY',
                    label:'¥'
                },
                {
                    name:'KRW',
                    label:'₩'
                },
                {
                    name:'INR',
                    label:'₹'
                },

            ]
        }
    },  
    components:{
        Navigation:resolve => require(['../../../components/nav/Navigation'],resolve)
    },
    computed:{
        ...mapState(['current'])
    },
    created(){
        this.nowWay = this.current.amount_way;
    },
    methods:{
        onPay(_item){
            this.nowWay = _item.name;
            this.$store.commit('current/upAmountWay',_item.name);
        }
    }

}
</script>

<style lang="scss" scoped>
.chose-amount-way{
    width: 100%;
    height: 100vh;
    background: #F2F2F2;
    .way-box{
        margin-top: 6px;
    }
}
.cell-title{
    display: flex;
    p{
        font-size: 14px;
        color: #333333;
    }
    p:first-child{
        width: 48px;
    }
}
.van-icon-success {
    color: #2cbc94;
    font-size: 20px;
}

</style>