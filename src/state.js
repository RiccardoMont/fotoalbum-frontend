import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({

    base_api_url: 'http://127.0.0.1:8000',
    photos_endpoint: '/api/photos',
    photos: '', 

    

    fetchData(url) {
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