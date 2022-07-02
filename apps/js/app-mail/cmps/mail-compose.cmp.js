import {mailService} from '../services/mail-service.js'
export default {
    props: ['isOpen', 'draftedMsg'],
    template: `
    <section class="compose-modal">
        <div class="header-compose-modal">
            <h4>New Message</h4>
            <div class="header-functions">
                <button @click="onFullscreen"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                <button @click="onClose"> <i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        <form @submit="onSubmit">
            <input class="compose-input" v-model="mail.to" type="text" placeholder="To">
            <input class="compose-input"  v-model="mail.subject" type="text" placeholder="Subject">
            <textarea cols="30" rows="20" v-model="mail.body"></textarea>
            <div class="compose-footer-functions">
                <input class="btn-submit-compose" type="submit" />
                <button @click="onDeleteMessage"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            open: false,
            mail: null
        };
    },
    created() {
        this.open = this.isOpen
        this.mail = this.draftedMsg ? {...this.draftedMsg} : mailService.getEmptyMail()
     },
    methods: {
        onClose() {
            this.open = false
            const emptyMail = mailService.getEmptyMail()
            if(this.mail !== emptyMail) {
                this.mail.isDrafted = true
                this.saveToDraft(this.mail)
            }
            this.$emit('open', this.open)
        },
        onSubmit() {
            this.open = false
            setTimeout(() => {
                this.submittedMsg(this.mail)
            },500)
            this.$emit('open', this.open)
        },
        saveToDraft(mail) {
            this.$emit('draftMsg', mail)
        },
        submittedMsg(mail) {
            mail.sentAt = Date.now()
            this.$emit('submittedMsg', mail)
        },
        onDeleteMessage() {
            this.open = false
        }

    },
    computed: {
        
    },
    components: {
        mailService
    }
};