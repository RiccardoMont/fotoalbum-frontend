<script>
import axios from 'axios';
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';


export default {
    name: 'AppSearchBody',
    data() {
        return {
            state
        }
    },
    components: {
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
    },
    mounted() {
        this.initialApi();
    }
}
</script>
<template>

    <div class="d-flex flex-wrap px-4 gap_custom">
        <div class="mask-custom col-4">
            <AppCardPhoto v-for="photo in state.photos" :photo="photo"></AppCardPhoto>
        </div>
    </div>


</template>
<style scoped>
.gap_custom {
    gap: 4rem;
}
.mask-custom{
    height: 300px;
    overflow: hidden;
}
</style>