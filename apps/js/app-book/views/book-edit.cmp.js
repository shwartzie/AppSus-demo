import { bookService } from "../services/book-service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import appHeader from '../cmps/app-header.cmp.js';
import appFooter from '../cmps/app-footer.cmp.js';
export default {
    template: `
        <app-header />

        <section v-if="bookToEdit" class="book-edit app-main">
            <h4>{{pageTitle}}</h4>
            <form @submit.prevent="save">
                <input type="text" v-model="bookToEdit.title" placeholder="title">
                <input type="text" v-model="bookToEdit.subtitle" placeholder="subtitle">
                <input type="text" v-model="bookToEdit.authors" placeholder="authors">
                <input type="text" v-model="bookToEdit.publishedDate" placeholder="published date">
                <input type="text" v-model="bookToEdit.description" placeholder="description">
                <input type="number" v-model.number="bookToEdit.pageCount" placeholder="page count">
                <input type="text" v-model="bookToEdit.categories[0]" placeholder="first category">
                <input type="text" v-model="bookToEdit.categories[1]" placeholder="second category">
                <input type="text" v-model="bookToEdit.thumbnail" placeholder="thumbnail url">
                <input type="number" v-model.number="bookToEdit.listPrice.amount" placeholder="price">
                <input type="text" v-model="bookToEdit.listPrice.currencyCode" placeholder="ILS">
                <input type="text" v-model="bookToEdit.listPrice.isOnSale" placeholder="on sale">
                <button>Save</button>
            </form>
        </section>
        <app-footer /> 
    `,
      components: {
        appHeader,
        appFooter,
      },
    data() {
        return {
            bookToEdit: null,
        }
    },
    created() {
        const id = this.$route.params.bookId
        if (id) {
            bookService.get(id).then((book) => (this.bookToEdit = book))
        } else {
            this.bookToEdit = bookService.getEmptybook()
        }
    },
    methods: {
        save() {
            if (!this.bookToEdit.title) return
            bookService.save(this.bookToEdit).then((book) => {
                this.$router.push("/book")
                eventBus.emit("show-msg", { txt: "Saved/Update successfully", type: "success" })
            })
        },
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.bookId
            return id ? "Edit book" : "Add book"
        },
    },
}
