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
            state.fetchDataSearch(url);
        }

    }
}

</script>
<template>
    <form class="col" @submit.prevent="search()">
        <div class="input-group">
            <input type="search" class="form-control" v-model="search_text">
            <button class="btn" type="submit">
                <i class="fas fa-search fa-lg fa-fw"></i>
            </button>
        </div>
    </form>
</template>
<style scoped>
form {
    width: calc((100%/12)*7);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;

    .btn {
        --bs-btn-color: var(--button-purple) !important;
    }

    .btn:hover{
        color: var(--button-mag) !important;
    }

    .btn:active {
        border-color: var(--bg-blue) !important;
    }
}
form:hover{
    opacity: 0.85;
}


</style>