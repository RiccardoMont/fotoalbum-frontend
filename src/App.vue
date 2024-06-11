<script>

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  }
}
</script>

<template>
  <div class="app">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
  </div>


</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
