import longText from "./long-text.cmp.js"
import { mailService } from "../services/mail-service.js"
import mailDisplay from "./mail-display.cmp.js"
export default {
    props: ["mail"],
    template: `
        <main class="mail-content"  @mouseover="mouseHover('show')" @mouseleave="mouseHover('hidden')" >
            <div class="mail" v-if="mail.sentAt">
                <div class="mail-subject" >
                    To: {{mail.to}} 
                </div>
                <div class="mail-body" @click="selectedMail(mail)">
                    <long-text :text="mail.body"/>
                </div>
            </div>

            <div v-else class="mail">
                <div class="mail-subject">
                    {{mail.subject}} 
                </div>

                <div class="mail-body" @click="selectedMail(mail)">
                    <long-text :text="mail.body"/>
                </div>

                <div class="extra-mail-actions" :class="mouseHoverShow" >
                    <button @click="onDelete(mail)"><i class="fa-solid fa-trash-can"></i></button>
                    <button @click="onArchive(mail)"><i class="fa-solid fa-box-archive"></i></button>
                    <button @click="onRead(mail)" :class="showEnvelope(mail)"></button>
                    <router-link :to="'/keep/'+mail.id"><i class="fa-solid fa-paper-plane" style="color: #202124; width:20px; height:5px; padding-right:5px;"></i></router-link>
                </div>
            </div>
        </main>
    `,
    data() {
        return {
            showState: 'hidden'
        }
    },
    methods: {
        selectedMail(mail) {
            this.$router.push(`/mail/${mail.id}`)
            mail.isSelected = !mail.isSelected
            this.$emit('selected', {...mail})
        },
        onArchive(mail) {
            mail.isArchived = !mail.isArchived
            mailService.save(mail)
        },
        onRead(mail) {
            mail.isRead = !mail.isRead
            mailService.save(mail)
        },
        showEnvelope(mail) {
            return mail.isRead ? 'fa-solid fa-envelope-open' : 'fa-solid fa-envelope'
        },
        onDelete(mail) {
            this.$emit('removed', {...mail})
        },
        mouseHover(value) {
            this.showState = value
        },
    },
    computed: {
        mouseHoverShow(){
            return this.showState
        }
    },
    components: {
        longText,
        mailDisplay
    }
};
