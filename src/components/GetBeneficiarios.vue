<template>
  <Beneficiarios :beneficiarios="beneficiarios" />
</template>

<script>
import { computed,onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import Beneficiarios from "@/components/Beneficiarios.vue";
export default {
  components: {
    Beneficiarios,
  },

  setup() {
    const store = useStore();
    // onMounted(() => store.dispatch("get_beneficiarios"));
    const beneficiarios = computed(() => store.state.beneficiarios);

    return { beneficiarios };
  },
};
</script>

<style>
</style>