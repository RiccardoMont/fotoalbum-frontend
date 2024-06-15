import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({

    base_api_url: 'http://127.0.0.1:8000',
    

    photos_endpoint: '/api/photos',
    categories_endpoint: '/api/categories',
    endpoints : ['/api/categories', '/api/photos'],
    support: '',
    photos: '', 
    categories: '',

    
//Funzione per il caricamento iniziale della pagina
    fetchData(url) {
        axios
            .get(url)
            .then(resp => {
                if(url.endsWith(this.categories_endpoint)){
                    this.categories = resp.data.results;
                }
                if(url.endsWith(this.photos_endpoint)){
                    this.photos = resp.data.results;
                    console.log(this.photos)
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
    }

})