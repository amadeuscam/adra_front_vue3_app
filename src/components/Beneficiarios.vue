<template>
  <div class="row altura_ben">
    <Beneficiario v-for="ben of beneficiarios" :key="ben.id" :persona="ben" />
  </div>

  <div class="altura_pag">
    <!-- <pagination v-cloak
      v-model="page"
      :records="records"
      :per-page="per_page"
      :options="options"
      @paginate="myCallback"
      ref="pag_idg"
    /> -->
    <v-pagination
      v-model="page"
      :pages="records"
      :range-size="0"
       ref="pag_idg"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import Beneficiario from "@/components/Beneficiario.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  props: ["beneficiarios"],
  components: {
    Beneficiario,
    VPagination,
  },
  data() {
    return {
      // records: this.$store.state.records,
      // per_page: this.$store.state.per_page,
      page: this.$store.state.page,
      options: {
        chunk: 5,
        format: false,
        edgeNavigation: true,
        chunksNavigation: "fidxed",
        texts: {
          count: "",
          first: "primero",
          last: "ultimo",
        },
      },
    };
  },
  computed: {
    records() {
      return this.$store.state.records;
    },
    per_page() {
      return this.$store.state.per_page;
    },
  },

  methods: {
    updateHandler() {
      this.$store.dispatch("paginate_control", this.page);
      
      console.log(this.$refs.pag_idg);
      console.log(this.$refs.pag_idg);
      // console.log(this.$refs.pag_idg.totalPages);
      // console.log(this.page);
      // console.log(this.$store.state.page);

      if (this.$store.state.buscar) {
        this.$store.state.page=1
      }
    },
    
  },
};
</script>

<style scoped>
.altura_ben {
  height: 95vh;
  overflow-y: auto;
  padding-top: 10px;
}
.altura_pag {
  height: 5vh;
  width: 100%;
  float: left;
  justify-content: center;
  display: flex;
  align-items: center;
}
.Page {
  color: red !important;
}
.VuePagination__count {
  display: none;
}
.VuePagination__pagination {
  margin: 0 !important;
}
.dsa {
  height: 4vh !important;
  margin-bottom: 0;
  background: red;
}
</style>