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
            category_id: ''
        }
    },
    components: {
        AppCarousel,
        AppCardPhoto
    },
    methods: {
        initialApi() {
            state.endpoints.forEach(end => {
                const startingApi = `${state.base_api_url}${end}`;
                state.fetchData(startingApi);
            })
        },

        categoryFilter() {
            const target = event.target.querySelector('button').getAttribute('id');
            this.category_id = target;
            
            

            const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${this.category_id}`;    
            console.log(url);
           
            state.fetchDataCategoriesFilter(url);
            
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
                    <button type="submit" class="badge" :id="category.id" >{{ category.slug }}</button>
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