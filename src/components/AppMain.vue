<script>
//import axios from 'axios';
import axios from 'axios';
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';
import AppCarousel from './AppCarousel.vue';
import AppCategoriesFilter from './AppCategoriesFilter.vue';


export default {
    name: 'AppMain',
    data() {
        return {
            state,
            //Array vuoto di supporto per filtrare tramite le categorie
            category_ids: []


        }
    },
    components: {
        AppCategoriesFilter,
        AppCarousel,
        AppCardPhoto
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
        }

    },
    mounted() {
        this.initialApi();
    }

}

</script>
<template>
    <div class="py-4 w-100 soft-blue mb-4">
        <div class="container d-flex align-items-center">
            <h1 class="fw-bold m-0">Home</h1>
        </div>
    </div>
    <div class="container">
        <AppCarousel></AppCarousel>
        <AppCategoriesFilter></AppCategoriesFilter>
        <button id="highlighted-btn" class="my-4 btn btn-primary" @click="this.highlightedFilter()">Highlighted</button>
        <div class="row justify-content-between align-items-center gap-2">
            <AppCardPhoto v-for="photo in state.photos" :photo="photo"></AppCardPhoto>
        </div>
    </div>
</template>
<style scoped>
.soft-blue {
    background-color: var(--bg-softblue);
}


</style>