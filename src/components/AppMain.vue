<script>
//import axios from 'axios';
import { state } from '../state';

export default {
    name: 'AppMain',
    data() {
        return {
            state
        }
    },
    methods: {
        initialApi(){
            const url = state.base_api_url + state.photos_endpoint;
            state.fetchData(url);
        }

    },
    mounted() {
        this.initialApi();
    }

}

</script>
<template>
    <h1>Home guests</h1>

    <div v-for="(photo, index) in state.photos">
        <h3>{{ photo.title }}</h3>
        <img :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
            alt="">
    </div>
</template>
<style></style>