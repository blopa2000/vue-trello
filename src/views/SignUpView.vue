<template>
  <v-form>
    <v-container class="access-container">
      <v-card class="access-card">
        <div class="content-title">
          <span class="headline">Sign up</span>
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
              @click="createUser()"
              >send</v-btn
            >
          </v-col>

          <v-col cols="12">
            <span>
              you have an account?
              <router-link to="/login">Login</router-link>
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { signUp } from "@/api/auth";
import { mapState } from "vuex";

export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },

  watch: {
    user() {
      console.log("user", this.user);
      if (this.user.email !== "") {
        this.$router.push("/");
      }
    },
  },

  methods: {
    async createUser() {
      await signUp(this.email, this.password);
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
</style>