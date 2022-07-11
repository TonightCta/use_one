<!--
 * @Name: 数字键盘
 * @Date: 2022-06-20 18:18:39
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 15:32:26
-->
<template>
    <div class="theKeyboard">
        <div class="theKeyboard-item" v-for="(item, index) in theKeyboard" :key="index" @click="keyboard(item)">
            <template v-if="item == 'del'">
                <B-svg name="JianPanDel" class-name="JianPanDel"></B-svg>
            </template>
            <template v-else>{{item}}</template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            val: 0,
            theKeyboard: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']
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
    methods: {
        keyboard(key) {
            if (this.val == 0) {
                if (key == '.') {
                    return
                }
                if (key == 0) {
                    return
                }
            }

            let value = this.val.toString()
            let Length = 15
            if (value.indexOf('.') > -1) {
                Length = 16
            }
            if (value.length > Length) {
                if (key == 'del') {
                    this.val = value.substring(0, value.length - 1)
                }
                return
            }

            if (value.indexOf('.') > -1) {
                if (key == '.') {
                    return
                }
            }

            if (key == 'del') {
                value = value.substring(0, value.length - 1)
                if (value == '') {
                    value = '0'
                }
            } else {
                if (value == '0') {
                    value = key
                } else {
                    value += key
                }
            }
            this.val = value
        }
    }
};
</script>

<style lang="less" scoped>
.theKeyboard {
    margin-top: 50px;
    padding: 0px 30px;
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 40px;
    column-gap: 15%;
    &-item {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #333333;
        .JianPanDel {
            width: 25px;
            height: 25px;
        }
    }
}
</style>