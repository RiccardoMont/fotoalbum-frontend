<script>
import { state } from '../state';
import AppContactForm from './AppContactForm.vue';
import AppLogo from './AppLogo.vue';




export default {
    name: 'AppNavbar',
    data() {
        return {
            state
        }
    },
    components: {
        AppLogo,
        AppContactForm
    }
}

</script>
<template>
    <div class="container-header py-2 px-4">
        <div class="row-header">
            <AppLogo></AppLogo>
            <div class="d-flex align-items-end col-md-2 col-lg-2 col-xl-1">
                <AppContactForm></AppContactForm>
            </div>
        </div>
    </div>

</template>
<style scoped>
.container-header {
    display: flex;
    justify-content: center;
    backdrop-filter: blur(5px);

    & .row-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

}
</style>