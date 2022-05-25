<template>
  <v-layout wrap>
    <v-flex
      md3
      v-for="(list, index) in lists"
      :key="index"
      @drop="ondrop($event, list.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <v-card class="list-card p-5" elevation="0">
        <v-btn
          class="btn-delete-list"
          color="error"
          icon
          @click="deleteList(list.id)"
          >X</v-btn
        >
        <div class="text-h6 heading font-weight-black">
          {{ list.name }}
        </div>
        <v-card
          class="list-card-todo-card"
          v-for="task in getTasks(list.id)"
          :key="task.id"
          draggable="true"
          @dragstart="dragStart($event, task.id)"
          elevation="1"
        >
          <v-btn color="primary" icon @click="finishTask(task.id)">✔</v-btn>
          <p class="list-card-todo-card-text">
            {{ task.name }}
          </p></v-card
        >

        <input
          type="text"
          class="list-card-todo-input"
          @keyup.enter="addTask($event, list.id)"
          placeholder="add the task"
        />
      </v-card>
    </v-flex>
    <v-card class="card-add" elevation="0">
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
import { mapMutations } from "vuex";
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
    ...mapMutations(["setAlert"]),
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
    finishTask(taskId) {
      this.$emit("finishTask", taskId);
    },
    deleteList(listId) {
      if (!this.getTasks(listId).length) {
        this.$emit("deleteList", listId);
      } else {
        this.setAlert({
          type: "error",
          message:
            "You can't delete a list with tasks. Please delete all tasks first.",
          show: true,
        });
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
  background: #eeeeee !important;
  max-width: 400px !important;
  position: relative;
  .btn-delete-list {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &-todo-card {
    padding: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    cursor: grab;
    &-text {
      font-size: 0.8em;
      display: inline-block;
      margin: 0;
    }
  }
  &-todo-input {
    width: 100%;
    text-transform: capitalize;
    border-radius: 0 !important;
    &:focus {
      outline: none;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #2480e3;
    }
    &:focus::placeholder {
      color: #2480e3;
    }
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
  background: #eeeeee !important;
  margin-top: 5px;
}
</style>