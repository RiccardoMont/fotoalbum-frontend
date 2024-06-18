<script>
import axios from 'axios';
import { state } from '../state';


import AppCategoriesFilter from './AppCategoriesFilter.vue';
import AppCategoriesRowsBody from './AppCategoriesRowsBody.vue';
import AppBestRow from './AppBestRow.vue';
import AppHighlightedRow from './AppHighlightedRow.vue';


export default {
    name: 'AppMain',
    data() {
        return {
            state,
           
        }
    },
    components: {
        AppBestRow,
        AppCategoriesFilter,
        AppHighlightedRow,
        AppCategoriesRowsBody
    },
    methods: {
        //Funzione per popolare sia le categorie che le foto al caricamento iniziale
        initialApi() {
            state.endpoints.forEach(end => {
                const startingApi = `${state.base_api_url}${end}`;
                state.fetchData(startingApi);
            })
        },

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

    },
    mounted() {
        this.initialApi();
        
    }
}
</script>
<template>
    <div class="container">
        <AppCategoriesFilter></AppCategoriesFilter>
        <AppBestRow></AppBestRow>
        <AppHighlightedRow></AppHighlightedRow>
        <AppCategoriesRowsBody></AppCategoriesRowsBody>
    </div>
</template>
<style scoped>


</style>