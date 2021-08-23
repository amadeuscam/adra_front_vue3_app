<template>
  <div class="detail">
    <h1>hola soy {{ ben.nombre_apellido }}</h1>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";


export default {
 
  data() {
    return {
      ben: Object,
    };
  },
  
  mounted() {
    console.log( this.$store.state.beneficiarios);
    this.ben = this.$store.getters.get_beneficario_data(
      parseInt(this.$route.params.id)
    );
    console.log(this.ben);
  },
};
</script>

<style>
</style>