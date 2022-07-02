import mailFilter from "./mail-filter.cmp.js";
export default {
    template: `
        <header class="mail-header">
            <nav class="nav-bar">
                <div class="logo-and-hamburger">
                    <a class="hamburger" @click="setHamburger(isAsideOpen = !isAsideOpen)" >
                        ☰
                    </a>
                    <a @click="onLogo" class="logo-and-mail" :style="addCursor">
                        <img src="../img/logo_gmail_lockup_default_1x_rtl_r2.png" alt="">
                    </a>
                </div>
                <div class="mail-filter-container">
                    <mail-filter @filtered="setFilter" />
                </div>
                <div class="apps-nav" @click="isOpen = !isOpen">
                <i class="fa-solid fa-list-ul"></i>
                    <div v-if="isOpen" :class="showExpansionModal">
                        <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
                        <router-link to="/book"><i class="fa-solid fa-book"></i></router-link>
                        <router-link to="/about"><i class="fa-solid fa-address-card"></i></router-link>
                        <router-link to="/mail"><i class="fa-solid fa-envelopes-bulk"></i></router-link>
                        <router-link to="/keep"><i class="fa-solid fa-folder"></i></router-link>
                    </div>
                </div>
            </nav>
        </header>
    
    `,
    data() {
        return {
            isOpen: false,
            isAsideOpen: false
        };
    },
    created() { 
       
    },
    methods: {
        setFilter(txt) {
            this.$emit('filtered', txt)
        },
        setHamburger(isAsideOpen) {
            this.$emit('asideStatus', isAsideOpen)
        },
        onLogo() {
            window.location.reload()
        }
    },
    computed: {
        showExpansionModal() {
            return this.isOpen ? 'apps-nav-modal' : ''
        },
        addCursor() {
            return {
                cursor: 'pointer'
            }
        }
    },
    unmounted() { },
    components: {
        mailFilter
    }
}


