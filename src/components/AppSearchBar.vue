<script>
import { state } from '../state';



export default {
    name: 'AppSearchBar',
    data() {
        return {
            state,
            search_text: ''
        }
    },
    methods: {
        search() {
            const url = state.base_api_url + state.photos_endpoint + `?search=${this.search_text}`;
            console.log(url);
            state.fetchData(url);
        }
    }
}

</script>
<template>
    <form @submit.prevent="search()">
        <div class="input-group mb-3">
            <input type="search" class="form-control" placeholder="search..." v-model="search_text">
            <button class="btn btn-outline-secondary" type="submit">
                <i class="fas fa-search fa-lg fa-fw"></i>
            </button>
        </div>
    </form>
</template>
<style></style>