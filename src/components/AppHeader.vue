<script>
import { state } from '../state';
import AppNavbar from './AppNavbar.vue';


export default {
    name: 'AppHeader',
    data() {
        return {
            state
        }
    },
    components: {
        AppNavbar,
    }

}
</script>
<template>
    <section class="jumbotron position-relative">
        <AppNavbar></AppNavbar>
        
    </section>
</template>
<style scoped>
.jumbotron {
    height: 75vh;
    background-image: url('src/assets/jumbotron.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}


</style>