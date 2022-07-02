export default {
    props: ["book"],
    template: `
    <div  class="book">
    <img :src="bookImgUrl" alt="">

    <p>{{book.title}}</p>
    <p :class="checkPrice">{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
    </div>
`,
    data() {
        return {}
    },
    methods: {},
    computed: {
        bookImgUrl() {
            return `${this.book.thumbnail}`
        },
        checkPrice() {
            return { low: this.book.listPrice.amount < 20, high: this.book.listPrice.amount > 150 }
        },
    },
}
