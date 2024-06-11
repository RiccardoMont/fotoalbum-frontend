<script>
import { state } from '../state';
import AppSearchBar from './AppSearchBar.vue';

export default {
    name: 'AppHeader',
    data() {
        return {
            state
        }
    },
    components: {
        AppSearchBar
    }
    
}
</script>
<template>
<h4>Header</h4>
<AppSearchBar></AppSearchBar>
</template>
<style>
</style>