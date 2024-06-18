<script>
import { state } from '../state';
import AppNavbar from './AppNavbar.vue';
import AppSearchBar from './AppSearchBar.vue';


export default {
    name: 'AppHeader',
    data() {
        return {
            state
        }
    },
    components: {
        AppNavbar,
        AppSearchBar
    }

}
</script>
<template>
    <section class="jumbotron position-relative">
        <AppNavbar></AppNavbar>
        <AppSearchBar></AppSearchBar>
        
    </section>
</template>
<style scoped>
.jumbotron {
    height: 75vh;
    width: 100%;
    background-image: url('src/assets/jumbotron.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}


</style>