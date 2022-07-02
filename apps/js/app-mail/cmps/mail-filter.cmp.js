// import { bookService } from "../services/book-service.js"
export default {
    template: `
    <input class="filter-mail" type="text" v-model="txt" @input="filter" placeholder="Search..">
   `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        filter() {
            this.$emit("filtered", this.txt);
        },
    },
    computed: {
       
    }
}