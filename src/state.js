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
    //Array dove vengono messi array di photo raggruppati per categoria
    gun_photos: [],
    //Array che raccoglie tutte le categorie utilizzato per poi stampare il nome in pagina
    category_rows: [],
    categories: '',
    //Array che raccoglie tutte le foto highlighted (in evidenza)
    highlighted_photos: [],

    
    

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

    //Funzione che raccoglie tutte le foto raggruppate per categoria
    fetchDataSearchGun(url) {
        axios
            .get(url)
            .then(resp => {
                this.gun_photos.push(resp.data.results);
            })
            .catch(err => {
                console.error(err);
            })
    },

    //Crea una copia della lista delle categorie e attua un ciclo per cercare tutti i gruppi di foto invocando la fetchDataSearchGun
    fetchCategoriesRows(url) {
        axios
            .get(url)
            .then(resp => {
                this.category_rows = [...resp.data.results];

                this.category_rows.forEach(category => {
                    const url = `${state.base_api_url}${state.categories_endpoint}/filter?category=${category.id}`;
                    this.fetchDataSearchGun(url);
                })
            })
            .catch(err => {
                console.error(err);
            })
    },
      
    //Chiamata per prendere tutte le foto highlighted
    highlightedRow(url) {
        axios
        .get(url)
            .then(resp => {
                this.highlighted_photos = [...resp.data.results];
                console.log(resp.data.results);
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