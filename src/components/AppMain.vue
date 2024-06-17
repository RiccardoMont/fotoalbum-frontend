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
            category_ids: [],
            url_categories: `${state.base_api_url}${state.categories_endpoint}`,
            category_rows: []


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
        },
        fetchCategoriesRows(url) {
            axios
                .get(url)
                .then(resp => {
                    this.category_rows = [...resp.data.results];
                    console.log(this.category_rows);

                    this.category_rows.forEach(category => {
                        const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${category.id}`;
                        state.fetchDataSearchGun(url);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        },

        categoryRows() {
            const url_categories = `${state.base_api_url}${state.categories_endpoint}`;
            console.log(url_categories);
            this.fetchCategoriesRows(url_categories);
            console.log(state.category_rows);
        }
    },
    mounted() {

        this.initialApi();
        this.fetchCategoriesRows(this.url_categories);
        


    }

}

</script>
<template>
    <div class="container">
        <AppCarousel></AppCarousel>
        <AppCategoriesFilter></AppCategoriesFilter>
        <button id="highlighted-btn" class="my-4 btn btn-primary" @click="this.highlightedFilter()">Highlighted</button>
        <div v-for="gun_cat in state.gun_photos">
            <div v-for="single_cat in this.category_rows.slice(0, this.category_rows.length)"> {{ single_cat.id == gun_cat[0].pivot.category_id ? single_cat.title : ''}}</div>
            <div class="original-scrollable-row">
                <AppCardPhoto v-for="photo in gun_cat" :photo="photo"></AppCardPhoto>
            </div>
        </div>
    </div>
</template>
<style scoped>
.soft-blue {
    background-color: var(--bg-softblue);
}

.h200 {
    height: 200px;
}

.width-content {
    width: max-content;
}

.oxa {
    overflow-x: hidden !important;

}

.scrollable-row {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: auto;
}

.original-scrollable-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    height: 200px;
    /*white-space: nowrap;*/
    overflow: auto;
}
</style>