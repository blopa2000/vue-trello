<template>
  <div>
    <app-header></app-header>
    <v-container>
      <v-layout>
        <v-flex xs12 md6>
          <v-text-field
            label="create new board"
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
            class="board-card white--text"
            elevation="1"
            @click="showboard(board.id)"
          >
            <v-btn
              class="board-card-btn"
              color="white"
              icon
              @click="deleteBoard($event, board.id)"
            >
              ✘
            </v-btn>

            {{ board.name }}</v-card
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { getBoardsByUser, createBoard, deleteBoard } from "@/api/index";
import { mapState, mapMutations } from "vuex";

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
    this.getBoards();
  },
  watch: {
    user: {
      async handler() {
        this.getBoards();
      },
      deep: true,
    },
  },

  mounted() {
    if (!this.user.email && !this.user.udi) {
      this.$router.push("/login");
    }
  },

  methods: {
    ...mapMutations(["setAlert"]),

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

    async getBoards() {
      if (!this.user.uid) return;
      const querySnapshot = await getBoardsByUser(this.user.uid);
      querySnapshot.forEach((doc) => {
        this.boards.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },

    async deleteBoard(e, boardId) {
      e.stopPropagation();
      const res = await deleteBoard(this.user.uid, boardId);
      if (res) {
        this.boards = this.boards.filter((board) => board.id !== boardId);
      } else {
        this.setAlert({
          type: "error",
          message:
            "you can't delete this board,pleace delete all the lists first",
          show: true,
        });
      }
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
  padding: 30px 20px 20px 20px;
  transition: all 200ms ease-in-out;
  position: relative;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  &-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.5em;
  }
}
</style>