<script>
import { state } from '../state';

import AppCardPhoto from './AppCardPhoto.vue';

export default {
    name: 'AppBestRow',
    data() {
        return {
            state,
            bestshoots_url: `${state.base_api_url}${state.bestshoots_endpoint}`
        }
    },
    components: {
        AppCardPhoto
    },
    mounted() {
        state.fetchBestshoots(this.bestshoots_url);
    }
}
</script>
<template>

    <div class="mt-5 py-4 border-top-highlighted">
        <div class="my-2">
            <span class="text-uppercase fw-bold fs-2">Best shoots</span>
        </div>
        <!--<div class="original-scrollable-row">-->
        <div class="best-row">
            <div class="w-50 big-card" v-for="photo in state.bestshoots_photos">
                <div class="mask">
                    <img :src="state.base_api_url + '/storage/' + photo.photos[0].image" alt="">
                    <div class="badge"><span>{{ photo.title }}</span></div>
                </div>
                <div class="card-img-overlay">
                    <h5>{{ photo.photos[0].title }}</h5>
                    <p><small>Last updated 3 mins ago</small></p>
                </div>
            </div>
            <!--<AppCardPhoto v-for="photo in state.bestshoots_photos" :photo="photo.photos[0]"></AppCardPhoto>-->
        </div>

    </div>

</template>
<style scoped>
.best-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;

    /*height: 300px;
    overflow-x: auto;*/
}

.big-card {
    cursor: pointer;
    position: relative  ;
    
    & .mask {
        opacity: 1;
    }

    & .card-img-overlay {
        padding: 2rem;
        opacity: 0;
        color: var(--text-white);
    }
}

.big-card:hover {

    & .mask {
        transition-duration: 0.5s;
        opacity: 0.5;
    }

    & .card-img-overlay {

        transition-duration: 0.5s;
        opacity: 1;

    }
}

.border-top-highlighted {
    border-top: 10px solid var(--button-mag);
}

.mask {
    height: 300px;
    width: 100%;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;

    & img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}

.badge {
    background-color: var(--button-mag);
    opacity: 0.85;
    position: absolute;
    bottom: 20px;
    right: 0px;
    --bs-badge-font-size: 1em;
    --bs-badge-border-radius: 0;
}
</style>