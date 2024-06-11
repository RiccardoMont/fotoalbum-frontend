<script>
import { state } from '../state';
import AppSearchBar from './AppSearchBar.vue';
import AppLogo from './AppLogo.vue';


export default {
    name: 'AppHeader',
    data() {
        return {
            state
        }
    },
    components: {
        AppLogo,
        AppSearchBar
    }

}
</script>
<template>
    <div class="container-header">
        <div class="row-header py-2">
            <AppLogo></AppLogo>
            <AppSearchBar></AppSearchBar>
        </div>
    </div>
</template>
<style scoped>
.container-header {
    width: 90%;
    display: flex;
    justify-content: center;

    & .row-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

}
</style>