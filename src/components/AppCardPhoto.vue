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
    <div class="card">
        <img :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
            alt="">
        <div class="card-img-overlay">
            <h5>{{ photo.title }}</h5>
            <p><small>Last updated 3 mins ago</small></p>
        </div>
    </div>
</template>
<style scoped>
.card {
    
    width: 24%; /*calc((100%/12)*3 - 1rem) */
    overflow: hidden;
    border-radius: 0;
    background-color: inherit;
    cursor: pointer;

    & img {
        opacity: 1;
        width: 100%;
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
</style>