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
import { auth } from "../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "jp@gamil.com",
      password: "123456789",
    };
  },

  created() {
    if (this.usuario.udi !== "") {
      this.$router.push("/");
    }
  },

  methods: {
    async login() {
      const res = await signInWithEmailAndPassword(
        auth,
        this.name,
        this.password
      );
      console.log(res);
    },
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

<style lang="">
</style>