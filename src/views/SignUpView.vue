<template>
  <v-form>
    <v-container>
      <v-card class="px-5 mt-5">
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="email"
              type="email"
              placeholder="user@gmail.com"
              v-model="email"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Password"
              type="password"
              placeholder="*********"
              v-model="password"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn
              color="primary"
              elevation="3"
              :loading="loading"
              x-large
              @click="createUser()"
              >send</v-btn
            >
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
      password: "1234567890",
      loading: false,
    };
  },

  watch: {
    user() {
      console.log("user", this.user);
      if (this.user !== null) {
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