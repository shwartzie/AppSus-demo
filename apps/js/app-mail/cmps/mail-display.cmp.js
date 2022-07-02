import appHeader from "../cmps/app-header.cmp.js"
import mailAside from "../cmps/mail-aside.cmp.js"
import longText from "./long-text.cmp.js"
import mailCompose from "../cmps/mail-compose.cmp.js"
import { eventBus } from "../../../services/eventBus-service.js"
import { mailService } from "../services/mail-service.js"
export default {
    template: `
    <section class="mail-layout">
        <app-header @filtered="setFilter" @asideStatus="setAsideStatus"/>
    </section>

    <section class="mail-display-container">
    <mail-aside 
        :mails="mails" 
        :asideStatus="asideStatus"
        :mailsRead="unreadMailsCount"
        @starred="setType" 
        @inbox="setType" 
        @sentMsg="setType"
        @draftedMsg="setType" 
        @archived="setType"
    />
        <section class="mail-display-head" v-if="mail">
            <header class="mail-display-header">
                <div class="mail-display-header-functions">
                    <div class="mail-display-header-left-side-function">
                        
                        <button @click="renderList"><i class="fa-solid fa-arrow-left-long"></i></button>
                        <button class="mail-star" :class="getActiveStarClass" @click="onStar(mail)">
                            <i class="fa-solid fa-star"></i>
                        </button>
                    </div>
                    <div class="extra-mail-actions" >
                        <button @click="removeMail(mail.id)"><i class="fa-solid fa-trash-can"></i></button>
                        <button @click="onArchive(mail)"><i class="fa-solid fa-box-archive"></i></button>
                        <button class="fa-solid fa-envelope-open"></button>
                        <router-link :to="'/keep/'+mail.id"><i class="fa-solid fa-paper-plane" 
                        style="color: #202124; padding-right:1em; margin-top:1.5rem;"></i></router-link>
                    </div>
                </div>
            </header>
            <main class="mail-content mail-content-display">
            <div class="mail mail-display">
                <div class="mail-subject-display">
                    By: {{mail.by}} 
                </div>
                <div class="mail-body mail-body-display">
                    {{mail.body}}
                </div>
                <footer class="mail-display-footer">
                    This email is intented for: {{mail.to}}
                </footer>
            </div>
            
        </main>
        </section>
        
    </section>

    <section v-if="draftedMsg" @click="isOpen = !isOpen">
        <mail-compose  :draftedMsg="draftedMsg" :isOpen="isOpen" @open="setComposeModal"/>
    </section>
    `,
    data() {
        return {
            mail: null,
            mails: null,
            draftedMsg: null,
            asideStatus: true,
            isOpen: false,
            unreadMailsCount: 0
        };
    },
    created() {
        const id = this.$route.params.mailId
        if (id) {
            mailService.get(id).then((mail) => (this.mail = mail))
        }
        mailService.query().then((mails) => {
            this.mails = mails
            const mailsRead = this.mails.filter(mail => mail.isRead)
            this.unreadMailsCount = this.mails.length - mailsRead.length
        })
     },
    methods: {
        setFilter() {
            this.renderList()
        },
        setType() {
            this.renderList()
        },
        removeMail(id) {
            mailService
                .remove(id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === id)
                    this.mails.splice(idx, 1)
                    eventBus.emit("show-msg", { txt: "Deleted successfully", type: "success" })
                })
                .catch((err) => {
                    eventBus.emit("show-msg", { txt: "Error - try again later", type: "error" })
                    throw new Error(err)
                });
        },
        onStar(mail) {
            mail.isStarred = !mail.isStarred
            mailService.save(mail)
        },
        onArchive(mail) {
            mail.isArchived = !mail.isArchived
            mailService.save(mail)
        },
        setAsideStatus(asideStatus) {
            this.asideStatus = asideStatus
        },
        setComposeModal(isOpen) {
            this.isOpen = isOpen
        },
        mailsForDisplay() {
            this.$router.push(`/mail`)
        },
        renderList() {
            mailService.query().then(() => {
                this.mailsForDisplay()
            })
        },
    },
    computed: {
        getActiveStarClass() {
            return this.mail.isStarred ? 'star-active' : ''
        },
    },
    mounted() { },
    unmounted() { },
    components: {
        appHeader,
        mailAside,
        longText,
        mailCompose
    }
};