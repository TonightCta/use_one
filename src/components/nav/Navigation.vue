<!--
 * @Name: 头部横条 带微信息图标
 * @Date: 2022-06-23 11:55:51
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 11:13:54
-->
<template>
    <div>
        <P-nav :class-name="setClassName" :title="title" :left-arrow="leftArrow" :border="border" :fixed="true"
            :placeholder="true" :ClickLeft="ClickLeft" @click-left="onClickLeft">
            <template #title>
                <slot name="title">
                    <van-search v-if="searchSwitch" v-model="keyword" :show-action="showAction" :clearable="clearable"
                        :placeholder="placeholder" @search="onSearch" @cancel="onCancel" />
                </slot>
            </template>
            <template #right>
                <WeiXinXi v-model="badge" v-if="WeiXinXiSwitch"></WeiXinXi>
                <B-svg name="DianHuaBing" class-name="DianHuaBing" v-if="phoneSwitch" @click="bool.phone = true">
                </B-svg>
                <B-a v-if="languageSwitch" href="/language" class="language ui-flex-row">
                    {{$t('语言')}}
                    <span class="iconfont icon-qiehuan"></span>
                </B-a>
                <B-svg name="bianJi" class-name="bianJi" v-if="editorSwitch" />
                <B-svg name="del" v-if="delSwitch" @click="onIcon('del')" />
                <slot name="right"></slot>
            </template>
        </P-nav>
        <P-popup v-model="bool.phone" class="phone">
            <div class="ui-flex-row-center">
                <a :href="`tel:${phone}`">
                    <B-svg name="MakeAPhoneCall" class-name="phone-icon"></B-svg>
                </a>
                <div class="title">{{$t('联系电话')}}</div>
                <di class="number"><a :href="`tel:${phone}`">{{phone}}</a></di>
            </div>
        </P-popup>
    </div>
</template>

<script>
import WeiXinXi from "@/components/WeiXinXi";

export default {
    components: {
        WeiXinXi
    },
    props: {
        //标题
        title: {
            type: String,
            default: ''
        },
        //是否显示 返回按钮
        leftArrow: {
            type: Boolean,
            default: true
        },
        //css 样式
        //class-name="Fei"
        className: {
            type: String,
            default: ''
        },
        border: {
            type: Boolean,
            default: false
        },
        //电话号码
        phone: {
            type: String,
            default: ''
        },
        //电话是否显示
        phoneSwitch: {
            type: Boolean,
            default: false
        },
        //微信息是否显示
        WeiXinXiSwitch: {
            type: Boolean,
            default: false
        },
        //语言是否显示
        languageSwitch: {
            type: Boolean,
            default: false
        },
        //搜索是否显示
        searchSwitch: {
            type: Boolean,
            default: false
        },
        //搜索绑定值
        value: {
            type: String,
            default: ''
        },
        //搜索 placeholder
        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        },
        //搜索 是否显示取消按钮
        showAction: {
            type: Boolean,
            default: false
        },
        //是否启用清除图标，点击清除图标后会清空输入框
        clearable: {
            type: Boolean,
            default: false
        },
        //头部返回按钮是否自定义实践
        ClickLeft: {
            type: Boolean,
            default: true
        },
        //编辑图标是否显示
        editorSwitch: {
            type: Boolean,
            default: false
        },
        //删除图标是否显示
        delSwitch: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            badge: 0,
            bool: {
                phone: false
            },
            keyword: ""
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (v) {
                this.keyword = v
            }
        },
        keyword(v) {
            this.$emit('input', v)
        }
    },
    computed: {
        setClassName() {
            let arr = {}
            arr[this.className] = true;

            if (this.searchSwitch) {
                arr['search'] = true;
            }

            return arr
        }
    },
    methods: {
        //搜索输入框内容变化时触发
        onSearchInput(val) {
            this.$emit('SearchInput', val)
        },
        //搜索失去焦点执行
        onSearch(val) {
            // console.log(val)
        },
        //搜索取消
        onCancel() {
            this.keyword = ''
        },
        //头部返回按钮是否自定义实践 ClickLeft 等于 false 执行
        onClickLeft() {
            this.$emit('click-left')
        },
        onIcon(name) {
            this.$emit('click-icon', name)
        }
    }
};
</script>

<style lang="less" scoped>
.DianHuaBing {
    width: 20px;
    height: 20px;
    margin-left: 10px;
}

.phone {
    padding: 15px 0px 17px 0px;
    color: #333333;
    /deep/.head {
        display: none;
    }
    &-icon {
        width: 45px;
        height: 45px;
    }
    .title {
        font-size: 14px;
        margin: 5px 0px;
    }
    .number {
        font-size: 18px;
    }
    a:hover {
        color: #333333;
    }
}

.language {
    font-size: 14px;
    color: #666666;
    .iconfont {
        font-size: 14px;
        color: #666666;
        margin-left: 3px;
    }
}

/deep/.van-search {
    background-color: transparent;
    .van-search__content {
        border-radius: 3px;
    }
    .van-search__action {
        &:active {
            background-color: transparent;
        }
    }
}

.Fei {
    /deep/.van-search {
        .van-search__content {
            background-color: #ffffff;
        }
    }
}

.search {
    /deep/.van-nav-bar {
        .van-nav-bar__content {
            display: flex;
            .van-nav-bar__left {
                position: inherit;
                padding: 0px;
                padding-left: 16px;
            }
        }
        .van-nav-bar__title {
            max-width: 100%;
            flex: 1;
        }
        .van-nav-bar__right {
            display: none;
        }
    }
}

.bianJi {
    width: 15px;
    height: 15px;
}
</style>