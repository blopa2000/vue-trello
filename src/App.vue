<template>
  <v-app id="app">
    <alert-message />
    <router-view />
  </v-app>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";
export default {
  name: "App",
  components: {
    AlertMessage,
  },
};
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  color: #37474f;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  padding: 0;
}
</style>
