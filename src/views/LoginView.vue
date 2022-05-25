<template>
  <v-form>
    <v-container class="access-container">
      <v-card class="access-card">
        <div class="content-title">
          <span class="headline">Login</span>
        </div>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="email"
              type="email"
              placeholder="user@gmail.com"
              v-model="email"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Password"
              type="password"
              placeholder="*********"
              v-model="password"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              elevation="3"
              :loading="loading"
              x-large
              @click="login"
              >Login</v-btn
            >
          </v-col>

          <v-col cols="12">
            <span>
              you don't have an account?
              <router-link to="/signup">Sign up</router-link>
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import { signIn } from "@/api/auth";
import { mapMutations } from "vuex";
export default {
  name: "Login-view",
  data: () => ({
    loading: false,
    email: "",
    password: "",
  }),

  watch: {
    user() {
      if (this.user.email !== "") {
        this.$router.push("/");
      }
    },
  },
  created() {
    if (this.user.email !== "") {
      this.$router.push("/");
    }
  },

  methods: {
    ...mapMutations(["setAlert"]),
    async login() {
      if (this.email !== "" && this.password !== "") {
        try {
          await signIn(this.email, this.password);
        } catch (error) {
          let message = "";
          if (error.code === "auth/user-not-found") {
            message = "User not found";
          } else if (error.code === "auth/wrong-password") {
            message = "Wrong password";
          } else if (error.code === "auth/invalid-email") {
            message = "Invalid email";
          }

          this.setAlert({
            message,
            type: "error",
            show: true,
          });
        }
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss">
.access-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.access-card {
  width: 50%;
  padding: 20px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}
.content-title {
  text-align: center;
}
.headline {
  font-size: 2.5rem;
  font-weight: 300;
}
</style>