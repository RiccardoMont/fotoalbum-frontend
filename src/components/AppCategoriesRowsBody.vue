<script>
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';


export default {
    name: 'AppCategoriesRowsBody',
    data() {
        return {
            state,
            url_categories: `${state.base_api_url}${state.categories_endpoint}`
        }
    },
    components: {
        AppCardPhoto
    },
    mounted() {
        state.fetchCategoriesRows(this.url_categories);
    }
}
</script>
<template>
    <!--Questo primo ciclo mi fa entrare in ogni GRUPPO di foto accomunato da UNA CATEGORIA-->
    <div class="my-5" v-for="gun_cat in state.gun_photos">
        <!--Ciclo all'interno dell'array di supporto delle categorie e se il numero nella singola categoria è uguale a quello che ha la prima foto del GRUPPO nella tabella pivot, allora stampo il nome della Categoria. ATTENZIONE non mettendo lo slice mi ritrovavo tutte le righe doppioni. Googlando ho trovato questa soluzione che, anche se era rivolta ad un altro problema, ho trovato funzionale-->
        <div class="mb-2" v-for="single_cat in state.category_rows.slice(0, state.category_rows.length)"><span class="cat_title">{{ single_cat.id ==
            gun_cat[0].pivot.category_id ? single_cat.title : ''}}</span></div>
        <div class="original-scrollable-row">
            <AppCardPhoto v-for="photo in gun_cat" :photo="photo"></AppCardPhoto>
        </div>
    </div>
</template>
<style scoped>

</style>