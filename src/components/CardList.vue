<template>
  <v-layout wrap>
    <v-flex
      md2
      v-for="(list, index) in lists"
      :key="index"
      @drop="ondrop($event, list.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <v-card class="list-card p-5" elevation="1">
        {{ list.name }}
        <br />
        <v-card
          class="todo-card"
          v-for="task in getTasks(list.id)"
          :key="task.id"
          draggable="true"
          @dragstart="dragStart($event, task.id)"
          elevation="1"
        >
          {{ task.name }}
        </v-card>
        <input
          type="text"
          class="todo-input"
          @keyup.enter="addTask($event, list.id)"
          placeholder="add the task"
        />
      </v-card>
    </v-flex>
    <v-card class="card-add">
      <v-card-title>
        <v-text-field
          v-model="newList"
          label="Add a list"
          append-icon="add"
          @keyup.enter="addList()"
        ></v-text-field>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "card-list",
  props: {
    lists: Array,
    getTasks: Function,
  },
  data() {
    return {
      newList: "",
    };
  },
  methods: {
    dragStart(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item);
    },

    ondrop(event, listId) {
      const itemID = event.dataTransfer.getData("itemID");
      this.$emit("drop", itemID, listId);
    },

    addTask(event, listId) {
      this.$emit("addTask", event.target.value, listId);
      event.target.value = "";
    },
    addList() {
      if (this.newList !== "") {
        this.$emit("addList", this.newList);
        this.newList = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list-card {
  margin: 0.5em;
  padding: 20px;
  transition: all 200ms ease-in-out;
  background: #f7f7f7;

  .todo-card {
    padding: 10px;
    margin: 10px;
  }
}

.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background: blue;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
  transition: all 200ms ease-in-out;
  &:-moz-drag-over {
    background: red;
  }
}
.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}

.card-add {
  height: 95px;
}
</style>