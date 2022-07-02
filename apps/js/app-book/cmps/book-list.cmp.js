import bookPreview from "./book-preview.cmp.js"

export default {
    props: ["books"],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-preview-container" >
                   <book-preview :book="book" />
                   <div class="actions">
                       <router-link :to="'/book/'+book.id">Details</router-link>
                       <router-link :to="'/book/edit/'+book.id">Edit</router-link>
                       <button @click="remove(book.id)">X</button>
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        bookPreview,
    },
    methods: {
        remove(id) {
            this.$emit("remove", id)
        },
        select(book) {
            this.$emit("selected", book)
        },
    },
    computed: {},
}
