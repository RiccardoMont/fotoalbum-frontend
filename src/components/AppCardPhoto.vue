<script>
import { state } from '../state';

export default {
    name: 'AppCardPhoto',
    data() {
        return {
            state
        }
    },
    props: {
        photo: Object
    }
}
</script>
<template>
    <div v-if="photo.published" class="card" data-bs-toggle="modal" :data-bs-target="'#' + photo.id">
        <img :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
            alt="">
        <div class="card-img-overlay">
            <h5>{{ photo.title }}</h5>
            <p><small>Last updated 3 mins ago</small></p>
        </div>
    </div>
    <div class="modal fade" :id="photo.id" tabindex="-1" :aria-labelledby="photo.id + 'modal'" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-between">
                    <img class="h-100" :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
                        alt="">
                    <div class="texts px-4">
                        <h3>{{ photo.title }}</h3>
                        <p>{{ photo.description }}</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.card {

    border-radius: 0;
    background-color: inherit;
    cursor: pointer;
    display: inline-block !important;
    min-width: unset !important;

    & img {
        opacity: 1;
        height: 100%;
    }

    & .card-img-overlay {
        opacity: 0;
        color: var(--text-white);
    }

}

.card:hover {

    & img {
        transition-duration: 0.5s;
        opacity: 0.5;

    }

    & .card-img-overlay {

        transition-duration: 0.5s;
        opacity: 1;

    }
}

.modal-content{
    background-color: var(--bg-softblue);

    & .texts{
        text-align: end;
    }

}
</style>