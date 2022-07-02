import { eventBus } from "../../../services/eventBus-service.js"
import appHeader from "../cmps/app-header.cmp.js";
import appFooter from "../cmps/app-footer.cmp.js";

export default {
    template: `
    <app-header />
 <section class="about-page app-main home-page">
    <h3>This is an about page</h3>
    <button @click="callBus">Call the Bus</button>
    <h1>i Love Pokemon</h1>
    <img src="/img/about.gif" alt="">
 </section>
 <app-footer /> 

`,
    data() {
        return {};
    },
    components: {
        appHeader,
        appFooter,
      },
    
    created() { },
    methods: {
        callBus() {
            eventBus.emit('show-msg', 'hi')
        }
    },
    computed: {},
    unmounted() { },
};