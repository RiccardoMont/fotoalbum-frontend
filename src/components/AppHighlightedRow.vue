<script>
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';

export default {
    name: 'AppHighlightedRow',
    data() {
        return {
            state,
            highlighted_url: `${state.base_api_url}${state.highlighted_endpoint}`,
        }
    },
    components: {
        AppCardPhoto
    },
    mounted(){
        state.highlightedRow(this.highlighted_url);
    }
}
</script>
<template>
    <div class="my-5 py-4 bord-highlighted">
            <div class="mb-2"><span class="cat_title fw-bold fs-2">Highlighted Shoots</span></div>
            <div class="original-scrollable-row">
                <AppCardPhoto v-for="photo in state.highlighted_photos" :photo="photo"></AppCardPhoto>
            </div>
        </div>

</template>
<style scoped>

.bord-highlighted{

    border-top: 5px solid var(--button-mag);
    border-bottom: 10px solid var(--button-mag);

}



</style>