<template>
  <v-layout wrap>
    <v-flex
      md6
      v-for="(list, index) in lists"
      :key="index"
      @drop="ondrop($event, list)"
      @dragover.prevent
      @dragenter.prevent
    >
      <v-card class="list-card p-5" elevation="1">
        {{ list.name }}
        <br />
        <v-card
          class="todo-card"
          v-for="item in getList(list.id)"
          :key="item.id"
          draggable="true"
          @dragstart="dragStart($event, item.id)"
          elevation="1"
        >
          {{ item.name }}
        </v-card>
        <v-text-field
          label="Outlined"
          outlined
          value=""
          @keyup.enter="add($event, list.id)"
        ></v-text-field>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "card-list",
  props: {
    lists: Array,
    getList: Function,
  },
  methods: {
    dragStart(event, item) {
      console.log(item);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item);
    },

    ondrop(event, list) {
      const itemID = event.dataTransfer.getData("itemID");
      this.$emit("drop", itemID, list);
    },

    add(event, list) {
      this.$emit("add", event.target.value, list);
      event.target.value = " ";
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