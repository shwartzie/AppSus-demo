import { bookService } from "../services/book-service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import { utilService } from "../../../services/util-service.js";

export default {
  template: `
       <section class="book-add">
    <input placeholder="title" type="text" v-model="searchBook" v-on:keyup.enter="filter" ref="textInput">
    <br>
    <li v-for="book in bookResults" :key="book.id">
        <ul>{{book.volumeInfo.title}} </ul>
        <p>{{book.etag}}</p>
        <button @click="add(book.id)">+</button>
            
        </li>

 </section>
    `,
  data() {
    return {
      searchBook: "",
      bookResults: null,
    };
  },
  mounted() {
    this.$refs.textInput.focus();
  },
  methods: {

    filter() {
      bookService.getBooksFromGoogle(this.searchBook).then((res) => {
        this.bookResults = res
      })
    },
    add(bookId) {
      var selBook = this.bookResults.find((book) => book.id === bookId)
      var { volumeInfo: { title, categories, imageLinks: { thumbnail }, publishedDate, description, subtitle, pageCount, language } } = selBook
      const googleBook = this.setGoogleBook(title, categories, thumbnail, publishedDate, description, subtitle, pageCount, language)
      bookService.save(googleBook).then(() => {
        this.$router.push("/book")
        eventBus.emit("show-msg", { txt: "Saved/Update successfully", type: "success" })
      })
    },
    setGoogleBook(
      title = 'Default Title',
      categories = ['computers', 'data'],
      thumbnail = './img/Subali Pesha.png',
      publishedDate = Date.now(),
      description = 'Default Description',
      subtitle = 'Default Subtitle',
      pageCount = utilService.getRandomInt(50, 300),
      language = 'en'
      ) {
      return {
        title,
        categories,
        thumbnail,
        publishedDate,
        description,
        subtitle,
        pageCount,
        language,
        listPrice: {
          amount: utilService.getRandomInt(15, 200),
          currencyCode: "EUR",
          isOnSale: false,
        },

      }
    }
  },
};
