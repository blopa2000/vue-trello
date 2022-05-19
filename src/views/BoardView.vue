<template>
  <div>
    <app-header></app-header>
    {{ $route.params.id }}

    <card-list
      :lists="lists"
      :getList="getList"
      @drop="drop"
      @add="addItem"
    ></card-list>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import CardList from "@/components/CardList.vue";
export default {
  components: {
    AppHeader,
    CardList,
  },
  data() {
    return {
      listName: "",
      items: [
        {
          name: "Tarea 1",
          id: "1",
          list: "1",
        },
        {
          name: "Tarea 2",
          id: "2",
          list: "1",
        },
        {
          name: "Tarea 3",
          id: "3",
          list: "1",
        },
        {
          name: "Tarea 4",
          id: "4",
          list: "1",
        },
        {
          name: "Tarea 5",
          id: "5",
          list: "1",
        },
        {
          name: "Tarea 1",
          id: "6",
          list: "2",
        },
        {
          name: "Tarea 2",
          id: "7",
          list: "2",
        },
      ],
      lists: [
        {
          name: "Tareas",
          id: "1",
        },

        {
          name: "terminadas",
          id: "2",
        },
      ],
    };
  },

  methods: {
    getList(list) {
      return this.items.filter((item) => item.list === list);
    },

    dragStart(event, item) {
      console.log(item);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item);
    },

    ondrop(event, list) {
      const ItemID = event.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id === ItemID);
      item.list = list.id;
    },

    drop(ItemID, list) {
      const item = this.items.find((item) => item.id === ItemID);
      item.list = list.id;
    },

    addItem(name, list) {
      this.items.push({
        name,
        id: (this.items.length + 1).toString(),
        list,
      });
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
</style>