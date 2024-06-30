# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur



## Project explanation 

This project use Axios to perform api-calls. Different endpoints are composed and different results are returned. These results are displayed on the single-page application and filtred for categories and tags.
A contact form has also been implemented to send messages. 


## Structure

To avoid the prop drilling and to ensure a cleaner code I created 'state.js'. Here I put endpoints and functions.

Here the complete structure starting from App.vue:
- AppHeader
    - AppNavbar
    - AppSearchBar
- AppMain
    - AppCategoriesFilter
    - AppHomeBody
        - AppBestRow
        - AppHighlightedRow
            - AppCardPhoto
        - AppCategoriesRowsBody
            - AppCardPhoto


These are the active components. Other components are not currently active.



