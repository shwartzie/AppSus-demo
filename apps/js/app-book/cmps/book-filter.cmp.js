export default {
    template: `
       <section class="book-filter">
    <input placeholder="title" type="text" v-model="filterBy.title" @input="filter" ref="textInput">
    <input type="number" placeholder="min-price" v-model.number="filterBy.fromPrice" @input="filter" id="min-price" name="min-price "
       min="0" >
    <input type="number" placeholder="max-price" v-model.number="filterBy.toPrice" @input="filter" id="max-price" name="max-price "
       min="1" >

 </section>
    `,
    data() {
        return {
            filterBy: {
                title: "",
                fromPrice: 0,
                toPrice: null,
            },
        }
    },
    mounted() {
        this.$refs.textInput.focus()
    },
    methods: {
        filter() {
            if(!this.filterBy.toPrice){
                this.filterBy.toPrice=5000000
            }
            this.$emit("filtered", { ...this.filterBy })
        },
    },
}
