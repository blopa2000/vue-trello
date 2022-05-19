<template>
  <div>
    <app-header></app-header>
    <v-container>
      <v-layout>
        <v-flex xs12 md6>
          <v-text-field
            label="Outlined"
            outlined
            v-model="boardName"
            @keyup.enter="add()"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout wrap>
        <v-flex md6 v-for="(board, index) in boards" :key="index">
          <v-card
            color="accent"
            class="board-card"
            elevation="1"
            @click="showboard(board.id)"
            >{{ board.name }}</v-card
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "home-view",
  components: {
    AppHeader,
  },

  data() {
    return {
      boardName: "",
      boards: [
        {
          id: "1",
          name: "Tareas",
        },
        {
          id: "2",
          name: "Proyectos",
        },
        {
          id: "3",
          name: "Pendientes",
        },
        {
          id: "3",
          name: "Pendientes",
        },
      ],
    };
  },
  methods: {
    add() {
      this.boards.push({
        id: this.boards.length + 1,
        name: this.boardName,
      });
      this.boardName = "";
    },
    showboard(id) {
      this.$router.push(`board/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 50%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
}

.board-card {
  margin: 0.5em;
  padding: 20px;
  transition: all 200ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>