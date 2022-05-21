<template>
  <div>
    <form @submit.prevent="login()">
      <input v-model="name" type="text" placeholder="name" />
      <input v-model="password" type="text" placeholder="Contraseña" />
      <input type="submit" placeholder="acceder" />
    </form>
    {{ $data }}
  </div>
</template>

<script>
import { mapState } from "vuex";
import { signIn } from "@/api/auth";
export default {
  data() {
    return {
      name: "jp@gamil.com",
      password: "123456789",
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
    async login() {
      await signIn(this.name, this.password);
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="">
</style>