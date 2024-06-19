<script>
import axios from 'axios';
import { state } from '../state';


import AppCategoriesRowsBody from './AppCategoriesRowsBody.vue';
import AppBestRow from './AppBestRow.vue';
import AppHighlightedRow from './AppHighlightedRow.vue';


export default {
    name: 'AppHomeBody',
    data() {
        return {
            state
        }
    },
    components: {
        AppBestRow,
        AppHighlightedRow,
        AppCategoriesRowsBody
    }
}
</script>
<template>
        <AppBestRow></AppBestRow>
        <AppHighlightedRow></AppHighlightedRow>
        <AppCategoriesRowsBody></AppCategoriesRowsBody>  
</template>
<style>
</style>