import appHeader from "../cmps/app-header.cmp.js"
import mailAside from "../cmps/mail-aside.cmp.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailCompose from "../cmps/mail-compose.cmp.js"
import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/eventBus-service.js"
export default {
    template: `
    <section class="mail-layout">
        <app-header @filtered="setFilter" @asideStatus="setAsideStatus"/>
    </section>
    
    <section class="mail-content-container">
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
        <mail-list 
            v-if="mails" 
            :mails="mailsForDisplay" 
            :selectedList="filterByType" 
            @selected="onSelectedMail" 
            @removed="removeMail" 
        />

        <section v-if="draftedMsg" @click="isOpen = !isOpen">
            <mail-compose  :draftedMsg="draftedMsg" :isOpen="isOpen" @open="setComposeModal"/>
        </section>
        
    </section>
    `,

    data() {
        return {
            mails: null,
            filterBy: null,
            filterByType: null,
            draftedMsg: null,
            asideStatus: true,
            isOpen: false,
     
            unreadMailsCount: 0
        };
    },
    created() {
        mailService.query().then((mails) => {
            this.mails = mails
            const mailsRead = this.mails.filter(mail => mail.isRead)
            this.unreadMailsCount = this.mails.length - mailsRead.length
        })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setType(type) {
            mailService.query().then((mails) => {
                this.filterByType = type
                this.mails = mails
            })
        },
        onSelectedMail(mail) {
            if (this.filterByType === 'draftedMsg') {
                this.draftedMsg = mail
            }
            this.mailIsSelected = mail

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
        setAsideStatus(asideStatus) {
            this.asideStatus = asideStatus
        },
        setComposeModal(isOpen) {
            this.isOpen = isOpen
        },
        
    },
    computed: {
        mailsForDisplay() {
            if (this.filterByType === 'starred') {
                return this.mails.filter(mail => mail.isStarred)

            } else if (this.filterByType === 'inbox') {
                return this.mails.filter(mail => !mail.sentAt && !mail.isDrafted && !mail.isArchived)

            } else if (this.filterByType === 'sentMsg') {
                return this.mails.filter(mail => mail.sentAt)

            } else if (this.filterByType === 'draftedMsg') {
                return this.mails.filter(mail => mail.isDrafted)

            } else if (this.filterByType === 'archived') {
                return this.mails.filter(mail => mail.isArchived)

            }
            if (!this.filterBy) {
                return this.mails.filter(mail => !mail.sentAt && !mail.isDrafted && !mail.isArchived)
            }

            const txt = this.filterBy
            const regex = new RegExp(txt, "i")
            return this.mails.filter((mail) => regex.test(mail.subject) || regex.test(mail.body))
        },
    },
    unmounted() { },
    components: {
        appHeader,
        mailAside,
        mailList,
        mailCompose,
    },
};

