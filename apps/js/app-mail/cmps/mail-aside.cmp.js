import { mailService } from "../services/mail-service.js";
import mailCompose from "../cmps/mail-compose.cmp.js"
export default {
    props: ['mails','asideStatus','mailsRead'],
    template: `
 
     <aside class="aside" :class="showAside">
        <div class="aside-funcs">
            <mail-compose 
            @submittedMsg="submittedMsg"
            @draftMsg="draftedMsg"
            :class="showCompose"
            v-if="isOpen"
            :isOpen="isOpen"
            @open="setComposeModal"
            />
            <div :class="showCollapsedLogo" @click="isOpen = !isOpen">
                <div class="compose-logo" :class="collapseLogo">
                </div>
                <a class="compose-btn" >Compose</a>
            </div>
            <div class="mail-aside-btns btn-mail-aside" :class="showSelectedList('inbox')" @click="noFilter">
                <div class="aside-icon" >
                    <i class="fa-solid fa-inbox"></i>
                </div>
                <a >Inbox</a>
                <p style="margin-left: 50%">{{mailsRead}}</p>
                <p v-if="!asideStatus" style="position:absolute; left:35px; top:0;">{{mailsRead}}</p>
            </div>

            <div class="mail-aside-btns btn-mail-aside" :class="showSelectedList('starred')"  @click="filterByStarred">
                <div  class="aside-icon">
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="aside-counter">
                    <a >Starred</a>
                    
                </div>
            </div>

            <div class="mail-aside-btns btn-mail-aside" :class="showSelectedList('sentMsg')"  @click="filterBySentMails">
                <div class="aside-icon">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <a>Sent Mail</a>
            </div>

            <div class="mail-aside-btns btn-mail-aside" :class="showSelectedList('draftedMsg')" @click="filterByDrafts">
                <div class="aside-icon">
                    <i class="fa-solid fa-file"></i>
                </div>
                <a>Drafts</a>
            </div>

            <div class="mail-aside-btns btn-mail-aside" :class="showSelectedList('archived')" @click="filterByArchive">
                <div class="aside-icon">
                    <i class="fa-solid fa-box-archive"></i>
                </div>
                <a >Archive</a>
            </div>
        </div>
     </aside>
    `,
    data() {
        return {
            mail: null,
            isOpen: false,
            active: false,
            selectedList: null,
        };
    },
    created() {
     },
    methods: {
        noFilter() {
            this.selectedList = 'inbox'
            this.$emit('inbox', 'inbox')
        },
        filterByStarred() {
            this.selectedList = 'starred'
            this.$emit('starred', 'starred')
        },
        submittedMsg(mail) {
            this.mail = mail
            mailService.save(mail)
        },
        filterBySentMails() {
            this.selectedList = 'sentMsg'
            this.$emit('sentMsg', 'sentMsg')
        },
        draftedMsg(mail) {
            this.mail = mail
            mailService.save(mail)
        },
        filterByDrafts() {
            this.selectedList = 'draftedMsg'
            this.$emit('draftedMsg', 'draftedMsg')
        },
        setComposeModal(isOpen) {
            this.isOpen = isOpen
        },
        filterByArchive() {
            this.selectedList = 'archived'
            this.$emit('archived', 'archived')
        },
        filterByReadMail() {
            this.selectedList = 'readMail'
            this.$emit('readMail', 'readMail')
        },
        showSelectedList(type) {
            return this.selectedList === type ? `list-selected-${type}` : ''
        }
    },
    computed: {
        showCompose() {
            return this.isOpen ? 'compose-modal' : ''
        },
        showAside() {
            return this.asideStatus ? 'aside-expanded' : 'aside-collapsed'
        },
        showCollapsedLogo() {
            return this.asideStatus ? 'mail-compose' : 'mail-compose-collapsed'
        },
        collapseLogo() {
            return this.asideStatus ? 'compose-logo' : 'compose-logo-collapsed'
        }
        
    },
    unmounted() { },
    components: {
        mailCompose
    }
};