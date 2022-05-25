<template >
  <div>
    <v-alert
      v-model="alert.show"
      class="alert"
      border="left"
      color="red"
      dismissible
      elevation="9"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "alert-message",
  computed: {
    ...mapState(["alert"]),
  },
};
</script>
<style lang="scss" scoped>
div {
  position: relative;
  .alert {
    position: absolute;
    top: 3.5em;
    right: 20px;
    z-index: 2;
  }
}
</style>