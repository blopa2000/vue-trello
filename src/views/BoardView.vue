<template>
  <div>
    <app-header></app-header>
    <card-list
      :lists="lists"
      :getTasks="getTasks"
      @drop="drop"
      @addTask="addTask"
      @addList="addList"
    ></card-list>
    {{ user }}
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import CardList from "@/components/CardList.vue";
import { mapState } from "vuex";

import {
  getListAndTaskById,
  createList,
  createTask,
  updateTask,
} from "@/api/index";
export default {
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
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style lang="scss" scoped>
</style>