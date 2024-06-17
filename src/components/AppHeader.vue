<script>
import { state } from '../state';
import AppSearchBar from './AppSearchBar.vue';
import AppLogo from './AppLogo.vue';
import AppContactForm from './AppContactForm.vue';

export default {
    name: 'AppHeader',
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
    <div class="container-header my-2">
        <div class="row-header">
            <AppLogo></AppLogo>
            <div class="d-flex justify-content-between align-items-center col-xs-10 col-sm-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <AppSearchBar></AppSearchBar>
                <AppContactForm></AppContactForm>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container-header {
    width: 90%;
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