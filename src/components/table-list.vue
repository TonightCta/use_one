<!--
 * @Name: 表格选项
 * @Date: 2022-06-18 19:08:09
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:23:35

    <template v-for="(item, index) in list">
        <TableList :name="item.name" :index="index" v-model="active">
            <template #left>
                <div v-if="item.color" class="symbol" :style="'background:'+ item.color +';'"></div>
            </template>
        </TableList>
    </template>

    data() {
        return {
            list: ['100', '500', '1,000', '5,000', '10,000', '50,000'],
            active: ''
        }
    }
-->

<template>
    <div class="table-list" :class="comActive" @click="selected">
        <slot name="left"></slot>
        <slot>{{name}}</slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        },
        value: {
            type: [Number, String],
            default: ''
        }
    },
    watch: {
        value(v) {
            this.active = v
        }
    },
    data() {
        return {
            active: ''
        }
    },
    computed: {
        comActive() {
            if (this.active !== '') {
                return this.index === this.active ? 'active' : ''
            } else {
                return ''
            }
        }
    },
    methods: {
        selected() {
            if (this.index === this.value) {
                this.$emit('input', '')
            } else {
                this.$emit('input', this.index)
            }
        }
    }
};
</script>