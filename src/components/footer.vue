<!--
 * @Name: 底部导航
 * @Date: 2022-06-17 20:49:33
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 22:30:05
-->
<template>
    <div class="foorer">
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item v-for="(item, index) in list" :key="index">
                <template #icon="props">
                    <B-svg :name="active == index ? item.icon +'-1':item.icon" className="icon"></B-svg>
                </template>
                {{item.name}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            list: [
                {
                    name: '首页',
                    icon: 'home',
                    path: '/index'
                },
                {
                    name: '订单',
                    icon: 'dingDan',
                    path: '/order'
                },
                {
                    name: '广告',
                    icon: 'guangGao',
                    path: '/ad'
                },
                {
                    name: '我的',
                    icon: 'woDe',
                    path: '/mine'
                }
            ]
        }
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (v) {
                this.list.filter(data => {
                    if (v.fullPath.toLowerCase().indexOf(data.path) != -1) {
                        this.active = this.list.indexOf(data)
                    }
                });
            }
        }
    },
    methods: {
        onChange(index) {
            this.$router.push({
                path: this.list[index].path
            })

        }
    }
};
</script>

<style lang="less" scoped>
.icon {
    width: 23px;
    height: 23px;
    fill: #999999;
}

/deep/.van-tabbar-item {
    .van-tabbar-item__text {
        color: #999;
    }

    &:first-of-type {
        &.van-tabbar-item--active {
            .van-tabbar-item__text {
                color: #2cbc94;
            }
        }
    }

    &.van-tabbar-item--active {
        .van-tabbar-item__text {
            color: #f55251;
        }

        .icon {
            width: 23px;
            height: 23px;
            fill: #2cbc94;
        }
    }
}
.foorer {
    height: 50px;
}
</style>