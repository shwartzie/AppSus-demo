
import userMsg from './app-book/cmps/user-msg.cmp.js';
import { router } from './router.js';


const options = {
    template: `
        <section>
            <user-msg/>
            <router-view/>
        </section>
    `,
    components: {
       
        userMsg
    }
};


const app = Vue.createApp(options);
app.use(router)
app.mount('#app');

