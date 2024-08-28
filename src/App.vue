<template>
    <div class="container">
        <div v-if="!isInitialized" id="mask" class="beforeLoad">
            <div v-show="!isInitialized" id="loadingImg">
                <img :src="loadingImage" alt="로딩중" />
            </div>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import {useRouter} from 'vue-router';
import {useRootStore} from '@/plugin/store';
import loadingImage from '../public/images/common/icon/spinner.gif';
import {watch} from 'vue';

export default {
    name: 'App',
    setup() {
        //-------- 변수 --------
        const router = useRouter();
        const rootStore = useRootStore();
        const isInitialized = rootStore.test();

        function onMove(routerName: string) {
            router.push({name: routerName});
        }



        return {isInitialized, onMove, loadingImage};
    }
};
</script>
<style>
html,
body,
.container {
    height: 100%;
    margin: 0;
}

.beforeLoad {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    margin-top: 0;
}

#loadingImg img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#mask {
    position: absolute;
    z-index: 9000;
    background-color: #000000;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
