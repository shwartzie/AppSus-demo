export default {
  template: `
        <header class="mail-header-keep">
            <nav class="nav-bar">
                <div class="keep-logo-and-hamburger flex">
                    <div class="logo-and-keep">
                        <img src="../../../img/keep-logo.png" alt="" class="keep-logo">
                    </div>
                    <h1>Keep</h1>
                </div>
                <div class="keep-filter-container flex">
                <button class="keep-btn change-dir" @click="setToCol" :class="showIcon"></button>
                <input placeholder="title" type="text" v-model="filterBy.txt" @input="filter" ref="textInput" class="keep-filter-search">
                </div>
                <div class="apps-nav" @click="isOpen = !isOpen">
                <i class="fa-solid fa-list-ul"></i>
                    <div v-if="isOpen" :class="showExpansionModal">
                        <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
                        <router-link to="/book"><i class="fa-solid fa-book"></i></router-link>
                        <router-link to="/about"><i class="fa-solid fa-address-card"></i></router-link>
                        <router-link to="/mail"><i class="fa-solid fa-envelopes-bulk"></i></router-link>
                        <router-link to="/keep"><i class="fa-solid fa-folder"></i></router-link>
                    </div>
                </div>
            </nav>
        </header>
    
    `,
  data() {
    return {
      isOpen: false,
      filterBy: {
        txt: "",
      },
      direction:false,
    };
  },
  mounted() {
    this.$refs.textInput.focus();
  },
  created() {},
  methods: {
    filter() {
      this.$emit("filtered", { ...this.filterBy });
    },
    setToCol() {
        this.direction=!this.direction
        const directionClass=this.direction ?"flex-column-wrap": ''
        this.$emit("col", directionClass);
    },
},
computed: {
      showIcon(){
          return this.direction ? 'fa-solid fa-table-cells':'fa-regular fa-rectangle-list'
      
      },
    showExpansionModal() {
      return this.isOpen ? "apps-nav-modal" : "";
    },
  },
  unmounted() {},
};
