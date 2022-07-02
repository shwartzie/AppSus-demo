import appHeader from "../cmps/app-header.cmp.js";
import appFooter from "../cmps/app-footer.cmp.js";
import keepAside from "../cmps/keep-aside.cmp.js";
import { keepService } from "../services/keep-service.js";
import keepList from "../cmps/keep-list.cmp.js";
import keepAdd from "../cmps/keep-add.cmp.js";
export default {
  template: `
    <app-header  @filtered="setFilter" @col="setDirection"/>
    <section :class="setDisplay">
      <section class="main-content">
        <keep-add @add="addkeep"/>
        
        <keep-list :keeps="keepsForDisplay" :class="setDisplay" @remove="removeKeep" @pinned="pinnedKeep" @dup="dupKeep"/>
      </section>

    </section>
    <!-- <app-footer />  -->
`,
  data() {
    return {
      keeps: null,
      filterBy: null,
      direction:'',
    };
  },
  components: {
    appHeader,
    appFooter,
    keepAside,
    keepList,
    keepAdd,
  },
  created() {
    keepService.query()
    .then((keeps) => {
      this.keeps = keeps

    });
  },
  methods: {
    removeKeep(id) {
      keepService
        .remove(id)
        .then(() => {
          const idx = this.keeps.findIndex((keep) => keep.id === id);
          this.keeps.splice(idx, 1);
          // eventBus.emit("show-msg", { txt: "Deleted successfully", type: "success" });
        })
        .catch((err) => {
          // eventBus.emit("show-msg", { txt: "Error - try again later", type: "error" });
        });
    },
    addkeep(keep) {
      if (!keep.title) return
      if (keep.type === "todo" && !keep.bgColor) keep.contentOfType = this.addTodoKeep(keep)
      if (!keep.bgColor) keep.bgColor = keepService.randomBC()
      keepService.save(keep).then(() => {
        this.keeps.push(keep)
        this.keeps = this.renderStarredFirst()
        console.log('hi');
        // eventBus.emit("show-msg", { txt: "Saved/Update successfully", type: "success" })
      })
    },
    addTodoKeep(keep) {
      let newKeep = []
      const missions = keep.contentOfType.split(',');
      missions.forEach((mission) => {
        var currTodo = keepService.createTodo(mission)
        newKeep.push(currTodo)
      })
      return newKeep
    },
    setFilter(filterBy) {
      this.filterBy = filterBy.txt;
    },
    pinnedKeep(id) {

      var pinned = this.keeps.find((keep) => keep.id === id);

      pinned.isPinned = !pinned.isPinned
      this.keeps = this.renderStarredFirst()
      keepService.saveAllKeep(this.keeps)
    },
    renderStarredFirst() {
      var newOrder = []
      this.keeps.forEach((keep) => {
        if (keep.isPinned) {
          newOrder.unshift(keep)
        } else {
          newOrder.push(keep)
        }
      })
      return newOrder
    },
    dupKeep(keep) {
      keep.id=''
      this.addkeep(keep)
    },
    setDirection(type){
      this.direction=type
    }
  },
  computed: {
    keepsForDisplay() {
      if (!this.filterBy) {
        return this.keeps;
      }
      const txt = this.filterBy
      const regex = new RegExp(txt, "i")
      return this.keeps.filter((keep) => regex.test(keep.title) || regex.test(keep.contentOfType) || regex.test(keep.type))
    },
    setDisplay(){
      return this.direction
    }
  },
  unmounted() { },
};
