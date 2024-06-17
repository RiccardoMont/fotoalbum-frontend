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
    <div class="d-flex justify-content-center w-100 my-4">
        <div id="carouselExampleAutoplaying" class="carousel slide col-md-12 col-lg-9 overflow-hidden"
            data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="http://127.0.0.1:8000/storage/uploads/vIN2fKwraGMHjxtiv4655ffo3o5HnFRi0EwACoxD.jpg"
                        class="d-block h-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/ClMPS2VPfOXr6H426UyUmDYiMggl8mJyEwx4imoG.jpg"
                        class="d-block h-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/XAP97flGGkerlYygRyOXsGpswwx3hUHsjSgGc6wW.jpg"
                        class="d-block h-100" alt="...">
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
    </div>


</template>
<style scoped>
.vw10 {
    width: 10vw;
}

.carousel-control-next,
.carousel-control-prev {
    opacity: 0.35;
}

.carousel-control-next:hover,
.carousel-control-prev:hover {
    opacity: 0.5;
}


.carousel-inner {
    overflow: unset;
}

.carousel-item {
    height: 70vh;

    & img {
        position: relative;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>