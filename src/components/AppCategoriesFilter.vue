<script>
import { state } from '../state';

export default {
    name: 'AppCategoriesFilter',
    data() {
        return {
            state,
            //Array vuoto di supporto per filtrare tramite le categorie
            category_ids: []


        }
    },
    methods: {
         //Filtro per filtrare tramite le categorie
         categoryFilter() {
            //Prendo l'id della categoria dove si è cliccato
            const target = event.target.querySelector('button').getAttribute('id');

            const target_badge = document.getElementById(target);            

            //Se l'id sulla quale si è cliccato è già incluso nell'array, allora lo si elimina
            if (this.category_ids.includes(target)) {

                const id_position = this.category_ids.indexOf(target);

                this.category_ids.splice(id_position, 1);

                target_badge.classList.remove('active-badge');

            } else {
                //Aggiungo l'id all'array di supporto
                this.category_ids.push(target);

                target_badge.classList.add('active-badge');

            }

            //Se l'array delle categorie è vuoto, allora si richiamano tutte le foto in pagina tramite la richiesta iniziale
            if (this.category_ids.length == 0) {
                const url = `${state.base_api_url}${state.photos_endpoint}`;
                state.fetchData(url);

            } else {
                //Prendo tutti gli elementi dell'array di supporto e li metto nell'url separati dalla virgola per poi richiamare il metodo di filtraggio per categorie
                const categories_joined = this.category_ids.join();
                const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${categories_joined}`;
                state.fetchDataSearch(url);
            }

        },
    }
}
</script> 
<template>
    <div class="d-flex flex-no-wrap overflow-x-auto gap-2 bg-softblue">
            <form @submit.prevent="this.categoryFilter()" v-for="category in state.categories">
                <button type="submit" class="badge fs-18 py-3 fw-light" :id="category.id">{{ category.slug }}</button>
            </form>
        </div>
</template>
<style scoped>

.bg-softblue{
    background-color: var(--bg-softblue);
}

.badge {
    cursor: pointer;
    background-color: var(--bg--blue) !important;
    border: 2px solid var(--button-purple) !important;
    border-radius: 0;   
    opacity: 0.7;
}

.badge:hover {
    background-color: var(--bg-very-softblue) !important;
    border: 2px solid var(--button-mag) !important;
    opacity: 1;
}

.active-badge{
    background-color: var(--bg-very-softblue) !important;
    border: 2px solid var(--button-mag) !important;
    opacity: 1;
}
</style>
