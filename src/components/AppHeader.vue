<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Vue Trello</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="accent" plain @click="boards()">boards</v-btn>
      <v-btn color="accent" plain @click="signOut()">exit</v-btn>
    </v-app-bar>
  </div>
</template>


<script>
import { exit } from "@/api/auth";

export default {
  name: "AppHeader",
  methods: {
    async signOut() {
      await exit();
      this.$router.push("/login");
    },
    boards() {
      this.$router.push("/");
    },
  },
};
</script>



<style scoped lang="scss">
</style>
