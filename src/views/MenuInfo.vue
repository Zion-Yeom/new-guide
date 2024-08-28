<template>
    <div>
        <!--        <div class="menu-info__detail">-->
        <!--            <span class="menu-info__label">URL</span>-->
        <!--            <input v-model="lazyItem.url" type="text" class="menu-info__input" :class="{'p-invalid': validator.$error}" />-->
        <!--        </div>-->
        <!--        <div v-if="validator.url.$error" class="p-error">-->
        <!--            <p v-for="error of validator.url.$errors" :key="error.$uid">-->
        <!--                {{ error.$message }}-->
        <!--            </p>-->
        <!--        </div>-->
        <span>{{ value }}</span>
    </div>
</template>

<script lang="ts">
//import

import {defineComponent} from 'vue';

export default defineComponent({
    name: 'MenuInfo',
    components: {},
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    emits: [],
    setup(props) {
        //-------- 상수 --------

        //-------- 변수 --------
        const value = props.label;
        //-------- 함수 --------

        //-------- 이벤트 핸들러 --------

        //-------- watch, watchEffect --------

        //-------- 라이프 사이클 --------
        return {value};
    }
});
</script>
