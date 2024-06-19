<script>
import axios from 'axios';
import { state } from '../state';

import AppCategoriesFilter from './AppCategoriesFilter.vue';
import AppHomeBody from './AppHomeBody.vue';
import AppSearchBody from './AppSearchBody.vue';



export default {
    name: 'AppMain',
    data() {
        return {
            state
        }
    },
    components: {
        AppCategoriesFilter,
        AppHomeBody,
        AppSearchBody
    },
    methods: {
        

        //Filtro per le foto etichettate "Highlighted" ("in evidenza")
        highlightedFilter() {

            const target = document.getElementById('highlighted-btn');
            if (!(target.classList.contains('active'))) {
                target.classList.add('active');
                const url = `${state.base_api_url}${state.highlighted_endpoint}`;
                state.fetchDataSearch(url);
            } else {
                target.classList.remove('active');
                const url = `${state.base_api_url}${state.photos_endpoint}`;
                state.fetchDataSearch(url);
            }
        },

    }
}
</script>
<template>
    <div class="container">
        <AppCategoriesFilter></AppCategoriesFilter>
        <AppHomeBody></AppHomeBody>
        <!--<AppSearchBody></AppSearchBody>-->
    </div>
</template>
<style scoped>


</style>