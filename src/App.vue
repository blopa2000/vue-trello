<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
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
