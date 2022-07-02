import appHeader from '../cmps/app-header.cmp.js';
import appFooter from '../cmps/app-footer.cmp.js';
export default {
    template: `
 <section class="home-page app-main">
    <app-header />
    <h3>Home sweet home</h3>
    <img src="img/homeScreen.gif" alt="" class="home-img">
    <app-footer />   
 </section>
`,
    components: {
        appFooter,
        appHeader,
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};