export default {
	props: ['text'],
	template: `
    {{formatedText}} <span v-if="longText"></span> <span v-if="longText" @click="isMore = !isMore" :style="readStyle">{{readMore}}</span>
	`,
	data() {
		return {
			isMore: false,
			longText: this.text.length > 100,
		}
	},
	methods: {},
	computed: {
		formatedText() {
			return this.isMore ? this.text : this.text.slice(0, 100)
		},
		readMore() {
			return  this.isMore ? 'read-less' : 'read more'
		},
		readStyle() {
            return {
                color: this.isMore ? 'red' : 'blue',
                cursor: 'pointer',
                'text-decoration': 'underline',
            }
        },
	},
}
