<script>
import { state } from '../state';

export default {
    name: 'AppContactForm',
    data() {
        return {
            state,
            //Parametri da inviare per il contact form
            name: '',
            email: '',
            message: '',
            //Stringa messaggio di errore per parametri non validi
            error_email: '',
            error_name: '',
            error_message: '',

            //Loader

        }
    },
    methods: {

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

            state.loading = true;

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
                state.sendingEmail(url, payload);


            }
        },

        //Metodo per togliere il feedback di messaggio ricevuto
        feedbackReset() {
            state.feedback = '';
            this.name = '';
            this.email = '';
            this.message = '';
        }
    }
}
</script>
<template>
    <div class="contacts-btn">
        <span class="d-none d-md-block" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" @click="feedbackReset()">Contact us</span>
        <i class="fa-solid fa-envelope d-md-none"></i>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title fw-bold" id="offcanvasWithBothOptionsLabel">Contact us</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="submitMessage()">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
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
                    <textarea class="form-control" name="message" id="message" rows="5" v-model="message"></textarea>
                    <small v-if="this.error_message">{{ this.error_message }}</small>
                </div>
                <button type="submit" class="btn" :disabled="state.loading">
                    {{ state.loading ? 'Sending...' : 'Send' }}
                </button>
                <div v-if="state.feedback" class="py-2">
                    <span>Message Sent</span>
                </div>
            </form>
        </div>
    </div>

</template>
<style scoped>
.contacts-btn {
    cursor: pointer;
    margin: 0.5rem 0 0.5rem 0.5rem;
    color: var(--text-white);
    opacity: 0.6;

}

.contacts-btn:hover {
    box-shadow: 0px 2px 0px 0px var(--button-mag);
    opacity: 0.9;
}
</style>