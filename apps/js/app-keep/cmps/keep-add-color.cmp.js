export default {
  template: `
   <div class="colors">
      <button class="color" @click="setColor('red')" style="background-color:red;"></button>
      <button class="color" @click="setColor('orange')" style="background-color:orange;"></button>
      <button class="color" @click="setColor('yellow')" style="background-color:yellow;"></button>
      <button class="color" @click="setColor('green')" style="background-color:green;"></button>
      <button class="color" @click="setColor('lightblue')" style="background-color:lightblue;"></button>
      <button class="color" @click="setColor('blue')" style="background-color:blue;"></button>
      <button class="color" @click="setColor('purple')" style="background-color:purple;"></button>
      <button class="color" @click="setColor('pink')" style="background-color:pink;"></button>
      <button class="color" @click="setColor('brown')" style="background-color:brown;"></button>
      <button class="color" @click="setColor('grey')" style="background-color:grey;"></button>
    </div>
 `,
  data() {
    return{}
  },
  created() {},
  methods: {
    setColor(color) {
      this.$emit("color", color)
    },
  },
  computed: {
   
  },
  mounted() {},
  unmounted() {},
  components: {},
};
