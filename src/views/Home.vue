<template>
  <div class="home">
    <GetBeneficiarios />
  </div>
</template>

<script>
// @ is an alias to /src
import GetBeneficiarios from "@/components/GetBeneficiarios.vue";
import Header from "@/components/Header.vue";

import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    GetBeneficiarios,
    Header,
  },
   setup() {
    const store = useStore();
    onMounted(() =>{
      console.log(store.getters.logginIn);
      if (store.getters.logginIn) {
        store.dispatch("get_beneficiarios")
      }

    } );
   
  },
};
</script>
<style>
.nav-list {
  padding: 0;
}
</style>
