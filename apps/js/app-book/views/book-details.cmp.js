import { bookService } from "../services/book-service.js";
import { eventBus } from "../../../services/eventBus-service.js"
import appHeader from '../cmps/app-header.cmp.js';
import appFooter from '../cmps/app-footer.cmp.js';
export default {
  template: `
      <app-header />

        <section  v-if="book"  class="book-details app-main">
            <div class="book-detail">
                
                <h4>book Details</h4>
                <p>{{book.title}}</p>
                <p>subtitle:{{book.subtitle}}</p>
                <p>by: {{book.authors[0]}}</p>
                <p>it's {{ageCheck}}</p>
                <p>description:{{book.description}}</p>
                <p>its A {{pageCountHighlite}}</p>
                <p>categories:{{book.categories[0]}} ,{{book.categories[1]}}</p>
                <img :src="book.thumbnail" alt="">
                <p>{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
                <button @click="$router.back">Back</button>
                <form @submit.prevent="save" class="book-review">
                    <input placeholder="your name" type="text" v-model="review.userName" ref="titleInput">
        <select v-model="review.rate">
            <option value="⭐">⭐</option>
            <option value="⭐⭐">⭐⭐</option>
            <option value="⭐⭐⭐">⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
        </select>
        <input type="date" v-model="review.readAt">
        <textarea id="freeText" name="freeText" rows="4" cols="50" v-model="review.freeText">free text</textarea>
        <button>submit</button>
    </form>
    <section  v-if="reviews"  class="review-list">
        <li v-for="review in reviews" key:review.id >
            <p>by user:{{review.userName}}</p>
            <p>rate:{{review.rate}}</p>
            <p>readAt:{{review.readAt}}</p>
            <p>freeText:{{review.freeText}}</p>
            <button @click="remove(review.id)">X</button>
        </li>
    </section>
</div>
</section>
<app-footer /> 

`,
  data() {
    return {
      book: null,
      review: {
        userName: "",
        rate: "⭐⭐⭐⭐⭐",
        readAt: new Date().toISOString().split("T")[0],
        freeText: "",
      },
      reviews: null,
    };
  },
  components: {
    appHeader,
    appFooter,
  },
  created() {
    const { bookId: id } = this.$route.params;
    bookService.get(id).then((book) => (this.book = book));
    this.loadReviews(id);
  },
  methods: {
    save() {
      if (!this.userName) {
        this.userName = "user Name";
      }
      bookService.addReview(this.book.id, this.review);
      this.reviews.push(this.review);
      eventBus.emit("show-msg", { txt: "added review successfully", type: "success" });
    },
    loadReviews(id) {
      bookService.getReviews(id).then((reviews) => {
        this.reviews = reviews;
      });
    },
    remove(id) {
      bookService
        .remove(id)
        .then(() => {
          const idx = this.reviews.findIndex((reviews) => reviews.id === id);
          this.reviews.splice(idx, 1);
          eventBus.emit("show-msg", { txt: "Deleted successfully", type: "success" });
        })
        .catch((err) => {
          eventBus.emit("show-msg", { txt: "Error - try again later", type: "error" });
        });
    },
  },
  computed: {
    bookImgUrl() {
      return `${this.book.thumbnail}`;
    },
    pageCountHighlite() {
      if (this.book.pageCount > 500) {
        return "long reading";
      } else if (this.book.pageCount > 200) {
        return "medium reading";
      } else {
        return "short reading";
      }
    },
    ageCheck() {
      var yearDiffrence = new Date().getFullYear() - this.book.publishedDate;
      if (yearDiffrence > 10) {
        return "Veteran Book";
      } else if (yearDiffrence <= 1) {
        return "New!";
      }
    },
  },
};
