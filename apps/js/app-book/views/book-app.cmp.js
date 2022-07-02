import { bookService } from "../services/book-service.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";
import bookList from "../cmps/book-list.cmp.js";
import appHeader from "../cmps/app-header.cmp.js";
import appFooter from "../cmps/app-footer.cmp.js";

import { eventBus } from "../../../services/eventBus-service.js";

export default {
  template: `
        <app-header />

        <section class="app-main">
            <book-filter @filtered="setFilter" />
            <book-add />
            <router-link to="/book/edit"  class="glow-on-hover" role="button">Add new book</router-link>
            <book-list :books="booksForDisplay" @remove="removebook"  />
        </section>
        <app-footer /> 
    `,
  components: {
    bookFilter,
    bookList,
    bookAdd,
    appHeader,
    appFooter,
  },
  data() {
    return {
      books: null,
      filterBy: null,
      searchBook: null,
    };
  },
  created() {
    bookService.query().then((books) => (this.books = books));
  },
  methods: {
    removebook(id) {
      bookService
        .remove(id)
        .then(() => {
          const idx = this.books.findIndex((book) => book.id === id);
          this.books.splice(idx, 1);
          eventBus.emit("show-msg", { txt: "Deleted successfully", type: "success" });
        })
        .catch((err) => {
          eventBus.emit("show-msg", { txt: "Error - try again later", type: "error" });
        });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    booksForDisplay() {
      if (!this.filterBy) return this.books;
      const filterBooks = this.books.filter((book) => {
        return (
          book.listPrice.amount < this.filterBy.toPrice &&
          book.listPrice.amount > this.filterBy.fromPrice &&
          book.title.includes(this.filterBy.title)
        );
      });
      return filterBooks;
    },
  },
};
