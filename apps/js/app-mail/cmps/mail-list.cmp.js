import mailPreview from "../cmps/mail-preview.cmp.js"
import { mailService } from "../services/mail-service.js"
export default {
    props: ["mails", "selectedList"],
    template: `
        <section class="mail-list">
            <div>{{checkEmails(selectedList, mails)}}</div>
            <ul class="mail-ul">
                <div  v-for="mail in mails" :key="mail.id">
                    <li class="mails-preview-container" :style="setSelectedBgc(mail)" @mouseover="mouseOver" >
                        <div class="mail-container">
                            <div class="mail-actions">
                                <input class="mail-check-box" type="checkbox" @click="setCheck(mail)"/>
                                <button class="mail-star" :class="getActiveStarClass(mail)" @click="onStar(mail)">
                                    <i class="fa-solid fa-star"></i>
                                </button> 
                            </div>
                            <mail-preview :mail="mail" @selected="onSelectedMail" @removed="onDelete" />
                            
                        </div>
                    </li>
                </div>
            </ul>
        </section>
`,
    data() {
        return {
            starId: null,
            isHover: false,
            list: null,
            mailToEdit: null,
            
        };
    },
    created() {
   
    },
    methods: {
        onSelectedMail(mail) {
            mail.isSelected = true
            mail.isRead = true
            mailService.save(mail)
            this.$emit('selected', {...mail})
        },
        onStar(mail) {
            mail.isStarred = !mail.isStarred
            mailService.save(mail)
        },
        setCheck(mail) {
            mail.isChecked = !mail.isChecked
            mailService.save(mail)
        },
        mouseOver() {
            this.isHover = !this.isHover
        },
        onDelete(mail) {
            console.log(mail)
            this.$emit('removed', mail.id)
        },

        getActiveStarClass(mail) {
            return mail.isStarred ? 'star-active' : ''
        },
        
        checkEmails(list, mails) {
            if (list === 'inbox' && !mails.length) {
                return 'Sorry There is no mails in this mailbox'
            } else if (list === 'starred' && !mails.length) {
                return 'Sorry, No starred emails were found. In order to have starred emails please mark them in the Inbox'
            } else if (list === 'draftedMsg' && !mails.length) {
                return 'Sorry, No drafted emails were found. In order to have drafted emails you will have to have unfinishied Composer'
            } else if (list === 'sentMsg' && !mails.length) {
                return 'Sorry, No emails were sent. You will see them as here as soon as they will be sent!'
            } else if (list === 'archived' && !mails.length) {
                return 'Sorry, No emails were archived. In order to have archived emails please mark them in the Inbox'
            }
        },
        showSaveAsNote() { 
            const id = this.$route.params.mailId
            if (id) {
                mailService.get(id).then((mail) => (this.mailToEdit = mail))
            } else {
                this.mailToEdit = mailService.getEmptyMail()
            }
        },
        setSelectedBgc(mail) {
            return mail.isRead ? {background: 'rgba(128, 128, 128, 0.1)'} : {background: 'white'}
        },
        
        
    },
    computed: {
        
    },
    components: {
        mailPreview,
    },
};