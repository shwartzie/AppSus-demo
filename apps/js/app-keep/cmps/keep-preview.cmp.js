import { keepService } from "../services/keep-service.js";
import longText from "./keep-long-text.cmp.js";
import todoKeep from "../cmps/todo-keep.cmp.js";
import keepAddColor from "../cmps/keep-add-color.cmp.js";

let keepTimer;
export default {
  props: ["keep"],
  template: `
  <div class="keep-container" :style="readStyle" @mouseover="mouseHover('show')" @mouseleave="mouseHover('hidden')">
    <div class="pinned">
      <button @click="pinnedKeep(keep.id)":class="mouseHoverShow" class="pin-keep keep-btn" v-if="!keep.isPinned"> <i class="fa-solid fa-thumbtack"></i></button>
      <button @click="pinnedKeep(keep.id)" class="pin-keep keep-btn" v-else> ⭐</button>

    </div>

    <div  class="keep flex" >
      <img v-if="keep.type === 'img'" :src="keepImgUrl" class="keep-img" alt="">
      
      <blockquote v-else-if="keep.type === 'text'" contenteditable="true" ref="freeTxtInput" @input="changeFreeText(keep)">
        <long-text :text="keep.contentOfType"/>
      </blockquote>
      
      
      <iframe v-else-if="keep.type === 'video'" width="220" height="115" :src="keepVidUrl" frameborder="0" gesture="media" allow="autoplay; encrypted-media" allowfullscreen> </iframe>
      
      <todo-keep v-else-if="keep.type === 'todo'" :keep="keep" @update="updateKeep" />
      <cite contenteditable="true" ref="titleInput" @input="changeTitle(keep)">{{keep.title}}</cite>
    </div>
    <div class="keep-actions flex" :class="mouseHoverShow">

        <button @click="removeKeep(keep.id)" class="keep-btn"> <i class="fa-solid fa-trash-can"></i></button>
        <button @click="dupKeep(keep)" class="keep-btn"><i class="fa-solid fa-clone"></i></button>
        <button  @click="showModal($event)" class="keep-btn"><i class="fa-solid fa-palette"></i></button>
        <div v-if="isOpen" :class="showExpansionModal"  :style="changePos">
        <keep-add-color @color="changeColor">
        </div>
    </div>
  </div>
`,

  data() {
    return {
      showState: 'hidden',
      isOpen: false,
      modalPos: null,
    };
  },
  methods: {
    changeTitle(keep) {
      clearTimeout(keepTimer);
      keepTimer = setTimeout(() => {
        keep.title = this.$refs.titleInput.innerText;
        keepService.saveChangedKeep(keep);
      }, 500);
    },
    changeFreeText(keep) {
      clearTimeout(keepTimer);
      keepTimer = setTimeout(() => {
        keep.contentOfType = this.$refs.freeTxtInput.innerText;
        keepService.saveChangedKeep(keep);
      }, 500);
    },
    changeColor(color) {
      this.keep.bgColor = color
      keepService.saveChangedKeep(this.keep);
    },
    updateKeep(keep) {
      keepService.saveChangedKeep(keep);
    },

    mouseHover(value) {
      this.showState = value;
    },
    removeKeep(keepId) {
      this.$emit("remove", keepId);
    },
    // select(keep) {
    //     this.$emit("selected", keep)
    // },
    pinnedKeep(keepId) {
      console.log(keepId);
      this.$emit("pinned", keepId);
    },
    dupKeep(keep) {
      this.$emit("dup", keep);
    },

    showModal(ev, txt) {

      this.modalPos = {
        top: ev.pageX - 60,
        right: ev.pageY + 10,
      }
      this.isOpen = !this.isOpen
      console.log('modal', ev);
    },
  },
  computed: {
    keepVidUrl() {
      return `${this.keep.contentOfType}`;
    },
    keepImgUrl() {
      return `${this.keep.contentOfType}`;
    },
    checkPrice() {
      return { low: this.keep.listPrice.amount < 20, high: this.keep.listPrice.amount > 150 };
    },
    mouseHoverShow() {
      return this.showState
    },
    showExpansionModal() {
      return this.isOpen ? "color-nav-modal" : "";
    },
    changePos() {
      console.log(`left: ${this.modalPos.top}px; top: ${this.modalPos.right}px;`);
      return `left: ${this.modalPos.top}px; top: ${this.modalPos.right}px;`
    },
    readStyle() {
      return `background-color: ${this.keep.bgColor}`;
    },
  },
  components: {
    longText,
    todoKeep,
    keepAddColor,
  },
};
