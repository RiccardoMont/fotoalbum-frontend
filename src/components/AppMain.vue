<script>
//import axios from 'axios';
import axios from 'axios';
import { state } from '../state';
import AppCardPhoto from './AppCardPhoto.vue';
import AppCarousel from './AppCarousel.vue';

export default {
    name: 'AppMain',
    data() {
        return {
            state,
            //Array vuoto di supporto per filtrare tramite le categorie
            category_ids: [],

            //Parametri da inviare per il contact form
            name: '',
            email: '',
            message: '',
            //Stringa messaggio di errore per parametri non validi
            error_email: '',
            error_name: '',
            error_message: ''

        }
    },
    components: {
        AppCarousel,
        AppCardPhoto
    },
    methods: {
        //Funzione per popolare sia le categorie che le foto al caricamento iniziale
        initialApi() {
            state.endpoints.forEach(end => {
                const startingApi = `${state.base_api_url}${end}`;
                state.fetchData(startingApi);
            })
        },

        //Filtro per filtrare tramite le categorie
        categoryFilter() {
            //Prendo l'id della categoria dove si è cliccato
            const target = event.target.querySelector('button').getAttribute('id');


            //Se l'id sulla quale si è cliccato è già incluso nell'array, allora lo si elimina
            if (this.category_ids.includes(target)) {

                const id_position = this.category_ids.indexOf(target);

                this.category_ids.splice(id_position, 1);

            } else {
                //Aggiungo l'id all'array di supporto
                this.category_ids.push(target);
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

            //this.isActive = true;

        },

        //Filtro per le foto etichettate "Highlighted" ("in evidenza")
        highlightedFilter() {

            const target = document.getElementById('highlighted-btn');
            if (!(target.classList.contains('active'))) {
                target.classList.add('active');
                const url = `${state.base_api_url}${state.highlighted_endpoint}`;
                state.fetchDataSearch(url);
            } else {
                target.classList.remove('active');
                const url = `${state.base_api_url}${state.photos_endpoint}`;
                state.fetchDataSearch(url);
            }
        },

        //Validazione dell'email inserita
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },

        //Metodo di invio del messaggio da parte dell'utente
        submitMessage() {

            //Reimposto l'errore a stringa vuota nel caso il tentativo precedente avesse prodotto un errore
            this.error_email = '';
            this.error_name = '';
            this.error_text = '';


            //Oggetto contenete i dati dell'utente, da inviare al DB
            const payload = {
                name: this.name,
                email: this.email,
                message: this.message
            }

            //Se la validazione fallisce popolo il messaggio di errore
            if (this.name == '') {
                this.error_name = 'Name required';
            }
            if (!(this.validateEmail(this.email))) {
                this.error_email = 'Email not valid';
            }
            if (this.message == '') {
                this.error_message = 'Message required';
            }
            //Se non vi sono errori procedo con la chiamata
            if ((this.name != '') && this.validateEmail(this.email) && (this.message != '')) {
                //Creo un nuovo url ed utilizzo la funzione nello state per inviare
                const url = `${state.base_api_url}${state.contacts_endopoint}`;
                console.log(url);
                state.sendingEmail(url, payload);
            }
        }
    },
    mounted() {
        this.initialApi();
    }

}

</script>
<template>
    <div class="container">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Contact us</button>

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Contact us</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p>balblabla</p>
                <form @submit.prevent="submitMessage()">
                    <div class="mb-3">
                        <label for="name" class="form-label">name</label>
                        <input type="text" class="form-control" name="name" id="name" aria-describedby="nameHelper"
                            placeholder="Luke skywalker" v-model="name" />
                        <small id="nameHelper" class="form-text text-muted" v-if="this.error_name">{{ this.error_name }}
                        </small>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelper"
                            placeholder="abc@mail.com" v-model="email" />
                        <small id="emailHelper" class="form-text text-muted" v-if="this.error_email">{{ this.error_email
                            }}</small>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" name="message" id="message" rows="5"
                            v-model="message"></textarea>
                        <small v-if="this.error_message">{{ this.error_message }}</small>
                    </div>
                    <button type="submit" class="btn btn-dark">
                        Send
                    </button>
                </form>
            </div>
        </div>
        <h1>Home guests</h1>
        <div class="d-flex flex-no-wrap overflow-x-auto gap-2">
            <form @submit.prevent="this.categoryFilter()" v-for="category in state.categories">
                <button type="submit" class="badge" :id="category.id">{{ category.slug }}</button>
            </form>
        </div>
        <div id="carouselExampleAutoplaying" class="carousel slide w-25" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="http://127.0.0.1:8000/storage/uploads/vIN2fKwraGMHjxtiv4655ffo3o5HnFRi0EwACoxD.jpg"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/ClMPS2VPfOXr6H426UyUmDYiMggl8mJyEwx4imoG.jpg"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="http://127.0.0.1:8000/storage/uploads/XAP97flGGkerlYygRyOXsGpswwx3hUHsjSgGc6wW.jpg"
                        class="d-block w-100" alt="...">
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
        <button id="highlighted-btn" class="my-4 btn btn-primary" @click="this.highlightedFilter()">Highlighted</button>
        <div class="row justify-content-between align-items-center gap-2">
            <AppCardPhoto v-for="photo in state.photos" :photo="photo"></AppCardPhoto>
        </div>
    </div>
</template>
<style scoped>
.badge {
    cursor: pointer;
    background-color: var(--button-purple);
    border: 0;
}
</style>