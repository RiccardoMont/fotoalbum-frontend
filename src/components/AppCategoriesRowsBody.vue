<script>
import axios from 'axios';
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';


export default {
    name: 'AppCategoriesRowsBody',
    data() {
        return {
            state,
            url_categories: `${state.base_api_url}${state.categories_endpoint}`,
            category_rows: []
        }
    },
    components: {
        AppCardPhoto
    },
    methods: {
        fetchCategoriesRows(url) {
            axios
                .get(url)
                .then(resp => {
                    this.category_rows = [...resp.data.results];
                    console.log(this.category_rows);

                    this.category_rows.forEach(category => {
                        const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${category.id}`;
                        state.fetchDataSearchGun(url);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    mounted() {
        this.fetchCategoriesRows(this.url_categories);
    }
}
</script>
<template>
    <div v-for="gun_cat in state.gun_photos">
        <div v-for="single_cat in this.category_rows.slice(0, this.category_rows.length)"> {{ single_cat.id ==
            gun_cat[0].pivot.category_id ? single_cat.title : ''}}</div>
        <div class="original-scrollable-row">
            <AppCardPhoto v-for="photo in gun_cat" :photo="photo"></AppCardPhoto>
        </div>
    </div>
</template>
<style scoped>

.original-scrollable-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    height: 200px;
    overflow: auto;
}
</style>