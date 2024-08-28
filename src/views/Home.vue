<template>
    <div>
        <h1>Guide Home</h1>
        <button class="c-btn" @click="onMove('SampleMenu')">Menu 이동</button>
    </div>
</template>

<script lang="ts">
//import

import {useRouter} from 'vue-router';

export default {
    name: 'Guide',
    components: {},
    props: {},
    emits: [],
    setup() {
        const router = useRouter();

        function onMove(routerName: string) {
            router.push({name: routerName});
        }

        return {onMove};
    }
};
</script>
<style></style>
