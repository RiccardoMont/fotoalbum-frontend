import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({

    base_api_url: 'http://127.0.0.1:8000',


    photos_endpoint: '/api/photos',
    categories_endpoint: '/api/categories',
    highlighted_endpoint: '/api/bestshoots/highlighted',
    contacts_endopoint: '/api/contacts',
    endpoints: ['/api/categories', '/api/photos'],
    support: '',
    photos: '',
    gun_photos: [],
    categories: '',
    

    //Funzione per il caricamento iniziale della pagina
    fetchData(url) {
        axios
            .get(url)
            .then(resp => {
                if (url.endsWith(this.categories_endpoint)) {
                    this.categories = resp.data.results;
                }
                if (url.endsWith(this.photos_endpoint)) {
                    this.photos = resp.data.results;
                }
            })
            .catch(err => {
                console.error(err);
            })
    },

    //Funzione per il filtro di ricerca tramite la searchbar e tramite categorie
    fetchDataSearch(url) {
        axios
            .get(url)
            .then(resp => {
                this.photos = resp.data.results;
            })
            .catch(err => {
                console.error(err);
            })
    },

    fetchDataSearchGun(url) {
        axios
            .get(url)
            .then(resp => {
                this.gun_photos.push(resp.data.results);
                console.log(this.gun_photos);
            })
            .catch(err => {
                console.error(err);
            })
    },
      

    //Funzione per l'invio del messaggio da parte dell'utente al DB. Accetta il parametro dell'url e l'oggetto contenente i dati inseriti nel form
    sendingEmail(url, payload) {
        axios
            .post(url, payload)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }
})