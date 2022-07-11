<!--
 * @Name: 收款方式管理
 * @Date: 2022-07-04 14:45:50
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 18:20:01
-->
<template>
    <P-main>
        <Navigation />
        <P-body type="Fei" class="m-60-b">
            <h1>收款方式管理</h1>
            <P-list ref="P-list" theme="card" :footer="true" @refresh="onRefresh" @load="onList">
                <template v-slot="{row, index}">
                    <div class="cardPackage ui-flex-center">
                        <B-a :href="`/bankcard/operation/${row.id}`">
                            <div class="ui-flex-left">
                                <B-svg name="qianBao" width="14px" />
                                <div class="whereItIs">{{row.id}}-{{ cardType(row.p_id) }} {{row.bank}}</div>
                                <div class="INR">INR</div>
                            </div>
                            <div class="ui-flex-left info">
                                <div>{{row.username}}</div>
                                <div class="m-10-l">{{row.account}}</div>
                            </div>
                        </B-a>
                        <div>
                            <B-switch v-model="row.status" open="" close="" size="default" @on-change="updateStatus"
                                :item="row" />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <ul class="ui-list-xing">
                        <li><span class="ui-col-hong">请确保您设置的账户为本人实名账户</span>，非本人实名账户收款会导致订单失败且账号被冻结</li>
                        <li>向买家仅展示已开启的收款账号</li>
                    </ul>
                </template>
            </P-list>
        </P-body>
        <Foo-ter>
            <P-button type="primary" class="btn-primary h-44-i" href="/bankcard/addtype">添加收款方式</P-button>
        </Foo-ter>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            params: {
                page: 0,
                limit: 10
            },
            typeList: []
        }
    },
    mounted() {
        this.onType()
    },
    methods: {
        async onType() {
            const responseMap = await API.GetData(this, 'card/map')
            this.typeList = responseMap
        },
        onList() {
            this.params.page++
            API.GetData(this, 'card/list', this.params).then(response => {
                const { code, data, message } = response
                if (code == 200) {
                    const { list, total } = data
                    this.$refs['P-list'].Add(list, total)
                } else {
                    this.$refs['P-list'].onOverlay(false)
                    this.$toast.fail(message);
                }
            }).catch(error => {
                this.$toast.fail(error);
            });
        },
        onRefresh() {
            this.params.page = 0
            this.onList()
        },
        cardType(id) {
            let row = this.typeList.filter(item => {
                if (item.id === id) {
                    return item;
                }
            });
            let name = '未知'
            if (row.length != 0) {
                name = row[0].name
            }
            return name
        },
        async updateStatus(status, item) {
            const response = await API.Update(this, 'card/status', { id: item.id, status: status })
            const { code, data, message } = response
            if (code == 200) {
                this.form = data
            } else {
                this.router.back(-1)
            }
        }
    }
};
</script>

<style lang="less" scoped>
h1 {
    font-size: 22px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 22px;
}

.cardPackage {
    .whereItIs {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        margin: 0px 5px;
    }
    .INR {
        font-size: 10px;
        color: #666666;
        background: #efefef;
        border-radius: 2px;
        padding: 0px 5px;
        transform: scale(0.8);
    }
    .info {
        padding-top: 5px;
        padding-left: 20px;
        font-size: 12px;
        color: #666666;
    }
}

.ui-list-xing {
    margin-top: 22px;
    font-size: 12px;
    color: #999999;
}
</style>
