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
            <div class="w-50" v-for="photo in state.bestshoots_photos" data-bs-toggle="modal"
                :data-bs-target="'#' + photo.photos[0].id + 'best'">
                <div class="big-card">
                    <div class="mask">
                        <img :src="state.base_api_url + '/storage/' + photo.photos[0].image" alt="">
                        <div class="badge"><span>{{ photo.title }}</span></div>
                    </div>
                    <div class="card-img-overlay">
                        <h5>{{ photo.photos[0].title }}</h5>
                        <p><small>Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="modal fade" :id="photo.photos[0].id + 'best'" tabindex="-1"
                    :aria-labelledby="photo.photos[0].id + 'modalLabel'" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex justify-content-between">
                                <img class="h-100"
                                    :src="photo.photos[0].image.startsWith('https://') ? photo.photos[0].image : state.base_api_url + '/storage/' + photo.photos[0].image"
                                    alt="">
                                <div class="px-4 d-flex flex-column justify-content-between">


                                    <div class="texts">
                                        <h3>{{ photo.photos[0].title }}</h3>
                                        <p>{{ photo.photos[0].description }}</p>
                                    </div>
                                    <div class="badge_big"><span>{{ photo.title }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    position: relative;

    & .mask {
        opacity: 1;
    }

    & .card-img-overlay {
        padding: 2rem;
        opacity: 0;
        color: var(--text-white);
    }
}

.modal-content {
    background-color: var(--bg-softblue);

    & .texts {
        text-align: end;
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

.badge_big {
    background-color: var(--button-mag);
    padding: 1rem;
    font-size: 22px;
    border-radius: 16px;
}
</style>