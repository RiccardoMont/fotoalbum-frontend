<script>
import { state } from '../state';
import AppContactForm from './AppContactForm.vue';
import AppLogo from './AppLogo.vue';
import AppSearchBar from './AppSearchBar.vue';



export default {
    name: 'AppNavbar',
    data() {
        return {
            state
        }
    },
    components: {
        AppLogo,
        AppSearchBar,
        AppContactForm
    }
}

</script>
<template>
    <div class="container-header my-2 px-4">
        <div class="row-header">
            <AppLogo></AppLogo>
            <div class="d-flex align-items-end col-md-2 col-lg-2 col-xl-1">
                <AppSearchBar></AppSearchBar>
                <AppContactForm></AppContactForm>
            </div>
        </div>
    </div>

</template>
<style scoped>
.container-header {
    display: flex;
    justify-content: center;

    & .row-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

}
</style>