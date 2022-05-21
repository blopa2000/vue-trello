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
            @keyup.enter="addNewBoard()"
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
import { getBoardsByUser, createBoard } from "@/api/index";
import { mapState } from "vuex";

export default {
  name: "home-view",
  components: {
    AppHeader,
  },
  data() {
    return {
      boardName: "",
      boards: [],
    };
  },
  async created() {
    const querySnapshot = await getBoardsByUser(this.user.uid);
    querySnapshot.forEach((doc) => {
      this.boards.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  },

  mounted() {
    if (!this.user || this.user.udi === "") {
      this.$router.push("/login");
    }
  },

  methods: {
    showboard(id) {
      this.$router.push(`board/${id}`);
    },
    async addNewBoard() {
      const res = await createBoard(this.user.uid, this.boardName);
      this.boards.push({
        id: res.id,
        name: this.boardName,
      });
      this.boardName = "";
    },
  },
  computed: {
    ...mapState(["user"]),
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