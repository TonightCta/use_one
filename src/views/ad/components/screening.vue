<!--
 * @Name: 筛选
 * @Date: 2022-06-30 11:15:34
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:37:51
-->
 <template>
    <P-popup class="popup-cell" v-model="val" position="top">
        <P-cell :list="list" theme="cell">
            <template #title="scope">
                {{scope.row.title}}
            </template>
            <template #label="scope">
                <div class="ui-grid-3">
                    <P-button-A v-for="(item, index) in scope.row.list" :key="index" :index="index"
                        v-model="scope.row.active">
                        {{item.title}}
                    </P-button-A>
                </div>
            </template>
        </P-cell>
        <div class="ui-grid-2 b-mar-20-t">
            <P-button type="default" class="btn-fei-1">重置</P-button>
            <P-button type="primary" class="btn-primary h-42-i">确定</P-button>
        </div>
    </P-popup>
</template>
 
 <script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            val: false,
            list: [
                {
                    title: '类型', active: '', list: [
                        { title: '全部' },
                        { title: '购买' },
                        { title: '出售' }
                    ]
                },
                {
                    title: '币种', active: '', list: [
                        { title: '全部' },
                        { title: 'USDT' },
                        { title: 'BTC' },
                        { title: 'AITD' },
                        { title: 'ETH' },
                        { title: 'XRP' }
                    ]
                },
                {
                    title: '状态', active: '', list: [
                        { title: '全部' },
                        { title: '接单中' },
                        { title: '已下架' },
                        { title: '已完成' },
                        { title: '已关闭' }
                    ]
                }
            ]
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (v) {
                this.val = v
            }
        },
        val(v) {
            this.$emit('input', v)
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="less" scoped>
.popup-cell {
    padding-top: 10px;
    /deep/.van-cell {
        padding: 0px;
        margin-top: 10px;
        .van-cell__title {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
            .van-cell__label {
                margin-top: 10px;
            }
        }
    }
}
</style>