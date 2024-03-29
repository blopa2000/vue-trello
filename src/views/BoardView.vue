<template>
  <div>
    <app-header></app-header>
    <v-container>
      <card-list
        :lists="lists"
        :getTasks="getTasks"
        @drop="drop"
        @addTask="addTask"
        @addList="addList"
        @finishTask="finishTask"
        @deleteList="deleteList"
      ></card-list>
      <h1 v-if="!lists.length" class="empty-title-list">
        you don't have a list and tasks, create one
      </h1>
    </v-container>
  </div>
</template>
<script>
import { deleteTask } from "@/api/index";
import AppHeader from "@/components/AppHeader.vue";
import CardList from "@/components/CardList.vue";
import { mapState } from "vuex";

import {
  getListAndTaskById,
  createList,
  createTask,
  updateTask,
  deleteList,
} from "@/api/index";

export default {
  name: "board-view",
  components: {
    AppHeader,
    CardList,
  },

  data() {
    return {
      tasks: [],
      lists: [],
    };
  },

  async created() {
    this.getListAndTasks();
  },

  mounted() {
    if (!this.user.email && !this.user.udi) {
      this.$router.push("/login");
    }
  },

  watch: {
    user: {
      handler() {
        this.getListAndTasks();
      },
      deep: true,
    },
  },

  methods: {
    getTasks(listId) {
      return this.tasks.filter((task) => task.listId === listId);
    },

    async drop(ItemID, listId) {
      const task = this.tasks.find((task) => task.id === ItemID);
      task.listId = listId;
      await updateTask(
        this.user.uid,
        this.$router.currentRoute.params.id,
        ItemID,
        listId
      );
    },

    async addTask(name, listId) {
      const task = await createTask(
        this.user.uid,
        this.$router.currentRoute.params.id,
        listId,
        name
      );
      this.tasks.push({
        name,
        id: task.id,
        listId,
      });
    },

    async addList(name) {
      const res = await createList(
        this.user.uid,
        this.$router.currentRoute.params.id,
        name
      );
      this.lists.push({
        name,
        id: res.id,
      });
    },

    async getListAndTasks() {
      if (this.user.uid === "") return;
      const res = await getListAndTaskById(
        this.user.uid,
        this.$router.currentRoute.params.id
      );
      res.lists.forEach((doc) => {
        this.lists.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      res.tasks.forEach((doc) => {
        this.tasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
    async finishTask(taskId) {
      await deleteTask(
        this.user.uid,
        this.$router.currentRoute.params.id,
        taskId
      );
      const task = this.tasks.filter((task) => task.id !== taskId);
      this.tasks = task;
    },
    async deleteList(listId) {
      await deleteList(
        this.user.uid,
        this.$router.currentRoute.params.id,
        listId
      );
      const list = this.lists.filter((list) => list.id !== listId);
      this.lists = list;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style lang="scss" scoped>
</style>