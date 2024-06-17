<script>
import axios from 'axios';
import { state } from '../state';

import AppCarousel from './AppCarousel.vue';
import AppCategoriesFilter from './AppCategoriesFilter.vue';
import AppCategoriesRowsBody from './AppCategoriesRowsBody.vue';


export default {
    name: 'AppMain',
    data() {
        return {
            state
            


        }
    },
    components: {
        AppCategoriesFilter,
        AppCarousel,
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
        <AppCarousel></AppCarousel>
        <AppCategoriesFilter></AppCategoriesFilter>
        <button id="highlighted-btn" class="my-4 btn btn-primary" @click="this.highlightedFilter()">Highlighted</button>
        <AppCategoriesRowsBody></AppCategoriesRowsBody>
    </div>
</template>
<style scoped>
.soft-blue {
    background-color: var(--bg-softblue);
}

</style>