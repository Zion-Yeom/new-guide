<template>
    <div class="menu__container">
        <div class="menu-list__container">
            <div class="menu-list__header">
                <h1>Menu List</h1>
            </div>
            <div class="menu-tree__container">
                <div class="c-tree-wrap">
                    <div class="c-tree">
                        <div class="x-tree-basic">
                            <vx-tree ref="treeRef" v-model="selectedItem" class="tree" :items="menus" label-field="label" :auto-expand-level="1">
                                <template #default="state">
                                    <button :hidden="!state.hasChildren" @click="state.hookToggle(state.item)">
                                        <i :class="state.isExpanded ? 'ii-folder-gray-open' : 'ii-folder-gray'"></i>
                                    </button>
                                    <label> {{ state.index + 1 }}. {{ state.label }} </label>
                                </template>
                            </vx-tree>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-table__container">
            <div class="menu-table__header">
                <button class="c-btn" @click="onValidateForm">validation check</button>
            </div>
            <div class="menu-info__container">
                <div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">메뉴명(한글)</span>
                        <input v-model="lazyItem.label" type="text" class="menu-info__input" :class="{'p-invalid': validator.$error}" />
                    </div>
                    <div v-if="validator.label.$error" class="p-error">
                        <p v-for="error of validator.label.$errors" :key="error.$uid">
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">메뉴명(영문)</span>
                        <input v-model="lazyItem.labelEn" type="text" class="menu-info__input" :class="{'p-invalid': validator.$error}" />
                    </div>
                    <div v-if="validator.labelEn.$error" class="p-error">
                        <p v-for="error of validator.labelEn.$errors" :key="error.$uid">
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">URL</span>
                        <input v-model="lazyItem.url" type="text" class="menu-info__input" :class="{'p-invalid': validator.$error}" />
                    </div>
                    <div v-if="validator.url.$error" class="p-error">
                        <p v-for="error of validator.url.$errors" :key="error.$uid">
                            {{ error.$message }}
                        </p>
                    </div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">LEVEL</span>
                        <span class="menu-info__input">{{ lazyItem.level }}</span>
                    </div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">정렬 순서</span>
                        <span class="menu-info__input">{{ lazyItem.ordinal }}</span>
                    </div>
                    <div class="menu-info__detail">
                        <span class="menu-info__label">사용여부</span>
                        <div class="menu-info__input menu-info__input__enable">
                            <div class="menu-info__input__enable__box">
                                <input id="use" v-model="lazyItem.enable" type="radio" name="enableRadio" value="true" />
                                <label for="use">true</label>
                            </div>
                            <div class="menu-info__input__enable__box">
                                <input id="unUse" v-model="lazyItem.enable" type="radio" name="enableRadio" value="false" />
                                <label for="unUse">false</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="validator.enable.$error" class="p-error">
                        <p v-for="error of validator.enable.$errors" :key="error.$uid">
                            {{ error.$message }}
                        </p>
                    </div>
                    <MenuInfo label="메뉴명(한글)"></MenuInfo>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {useMenuStore} from '@/plugin/store/menuStore';
import {computed, defineComponent, onMounted, Ref, ref, watch} from 'vue';
import {helpers, maxLength, minLength, required} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {Menu, Menus} from '@/defines/menu';
import deepCopy from '@/plugin/utils/deepCopy';
import MenuInfo from '@/views/MenuInfo.vue';

export default defineComponent({
    name: 'SampleMenu',
    components: {MenuInfo},
    setup() {
        const menuStore = useMenuStore();
        const menus = deepCopy(menuStore.menus);
        const selectedItem = ref<Menu>({
            children: undefined,
            enable: false,
            groups: '',
            image: '',
            label: '',
            labelEn: '',
            level: 0,
            menuId: '',
            module: '',
            ordinal: 0,
            parentId: '',
            type: '',
            url: ''
        });
        const lazyItem = ref<Menu>({
            children: undefined,
            enable: false,
            groups: '',
            image: '',
            label: '',
            labelEn: '',
            level: 0,
            menuId: '',
            module: '',
            ordinal: 0,
            parentId: '',
            type: '',
            url: ''
        });

        const validator = useVuelidate(
            computed(() => ({
                label: {
                    //색깔

                    required: helpers.withMessage('메뉴명을 입력해주세요', required),
                    maxLength: helpers.withMessage('최대글자수는 10글자입니다', maxLength(10))
                },
                labelEn: {
                    required: helpers.withMessage('메뉴(영어)명을 입력해주세요', required)
                    // minLength: minLength(3)
                },
                url: {
                    required: helpers.withMessage('URL을 입력해주세요', required),
                    minLength: helpers.withMessage('최소글자수는 2글자입니다', minLength(2))
                },
                enable: {
                    required: helpers.withMessage('사용여부를 입력해주세요', required)
                }
            })),
            lazyItem
        );

        watch(selectedItem, menu => {
            console.log(menu);
            Object.assign(lazyItem.value, deepCopy(menu));
        });

        async function onValidateForm() {
            const result = await validator.value.$validate();
            if (result) {
                alert('validation check : OK');
            }
        }

        return {
            menus,
            selectedItem,
            lazyItem,
            validator,
            onValidateForm
        };
    }
});
</script>
<style>
body {
    line-height: 4;
}

.menu__container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    margin-top: 0;
}

.menu-list__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 50%;
    margin-top: 0;
}

.menu-tree__list:hover {
    background-color: blue;
    color: white;
}

.menu-table__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 50%;
    margin-top: 0;
}

.menu-info__container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-top: 30px;
}

.menu-info__detail {
    display: flex;
    justify-content: center;
}

.menu-info__input {
    flex: 1;
    border: 1px solid cadetblue;
    justify-content: center;
    text-align: center;
}

.menu-info__input__enable {
    justify-content: space-evenly;
}

.menu-info__input__enable__box input {
    margin-right: 5px;
}

.menu-info__label {
    border: 1px solid cadetblue;
    width: 120px;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.menu-list__header {
    width: 50%;
    justify-content: center;
}

.menu-tree__container {
    border: 1px solid black;
    width: 50%;
    height: fit-content;
    margin-bottom: 10%;
}

.menu-info__input__enable {
    display: flex;
}

.p-error {
    border: none;
    color: red;
    font-size: x-small;
}
</style>
