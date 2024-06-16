<script>
//import axios from 'axios';
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';
import AppCarousel from './AppCarousel.vue';

export default {
    name: 'AppMain',
    data() {
        return {
            state,
            //Array vuoto di supporto per filtrare tramite le categorie
            category_ids: [],
            //isActive: false
            
        }
    },
    components: {
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

        //Filtro per filtrare tramite le categorie
        categoryFilter() {
            //Prendo l'id della categoria dove si è cliccato
            const target = event.target.querySelector('button').getAttribute('id');


            //Se l'id sulla quale si è cliccato è già incluso nell'array, allora lo si elimina
            if (this.category_ids.includes(target)) {

                const id_position = this.category_ids.indexOf(target);

                this.category_ids.splice(id_position, 1);

            } else {
                //Aggiungo l'id all'array di supporto
                this.category_ids.push(target);
            }

            //Se l'array delle categorie è vuoto, allora si richiamano tutte le foto in pagina tramite la richiesta iniziale
            if (this.category_ids.length == 0) {
                const url = `${state.base_api_url}${state.photos_endpoint}`;
                state.fetchData(url);

            } else {
                //Prendo tutti gli elementi dell'array di supporto e li metto nell'url separati dalla virgola per poi richiamare il metodo di filtraggio per categorie
                const categories_joined = this.category_ids.join();
                const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${categories_joined}`;
                state.fetchDataSearch(url);
            }

            //this.isActive = true;

        },

        //Filtro per le foto etichettate "Highlighted" ("in evidenza")
        highlightedFilter() {

            const target = document.getElementById('highlighted-btn');
            if(!(target.classList.contains('active'))){
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
    <div class="container">
        <h1>Home guests</h1>
        <div class="d-flex flex-no-wrap overflow-x-auto gap-2">
            <form @submit.prevent="this.categoryFilter()" v-for="category in state.categories">
                <button type="submit" class="badge" :id="category.id">{{ category.slug }}</button>
            </form>
        </div>
        <div id="carouselExampleAutoplaying" class="carousel slide w-25" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="http://127.0.0.1:8000/storage/uploads/vIN2fKwraGMHjxtiv4655ffo3o5HnFRi0EwACoxD.jpg"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/ClMPS2VPfOXr6H426UyUmDYiMggl8mJyEwx4imoG.jpg"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/XAP97flGGkerlYygRyOXsGpswwx3hUHsjSgGc6wW.jpg"
                        class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <button id="highlighted-btn" class="my-4 btn btn-primary" @click="this.highlightedFilter()">Highlighted</button>
        <div class="row justify-content-between align-items-center gap-2">
            <AppCardPhoto v-for="photo in state.photos" :photo="photo"></AppCardPhoto>
        </div>
    </div>
</template>
<style scoped>
.badge {
    cursor: pointer;
    background-color: var(--button-purple);
    border: 0;
}
</style>