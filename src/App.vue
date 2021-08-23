<template>
  <div
    class="sidebar"
    :style="[
      !this.$store.getters.logginIn
        ? { display: 'none' }
        : { display: 'block' },
    ]"
  >
    <div class="logo-details">
      <!-- <i class="bx bxl-c-plus-plus icon"></i> -->
      <div class="logo_name">Adra Torrejon</div>
      <i class="bx bx-menu" id="btn"></i>
    </div>
    <ul class="nav-list">
      <li>
        <i class="bx bx-search"></i>
        <input type="text" v-model.lazy="buscar_ben" placeholder="Search..." />
        <span class="tooltip">Search</span>
      </li>
      <li>
        <router-link to="/">
          <i class="bx bx-grid-alt"></i>
          <span class="links_name">Inicio</span>
        </router-link>

        <span class="tooltip">Inicio</span>
      </li>
      <li>
        <router-link to="/login">
          <i class="bx bx-user"></i>
          <span class="links_name">Login</span></router-link
        >

        <span class="tooltip">User</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-chat"></i>
          <span class="links_name">Messages</span>
        </a>
        <span class="tooltip">Messages</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="links_name">Analytics</span>
        </a>
        <span class="tooltip">Analytics</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-folder"></i>
          <span class="links_name">File Manager</span>
        </a>
        <span class="tooltip">Files</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-cart-alt"></i>
          <span class="links_name">Order</span>
        </a>
        <span class="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-heart"></i>
          <span class="links_name">Saved</span>
        </a>
        <span class="tooltip">Saved</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-cog"></i>
          <span class="links_name">Setting</span>
        </a>
        <span class="tooltip">Setting</span>
      </li>
      <li class="profile">
        <div class="profile-details">
          <!--<img src="profile.jpg" alt="profileImg">-->
          <div class="name_job">
            <div class="name">Gabriel Toledo</div>
            <div class="job">Frontend Developer</div>
          </div>
        </div>
        <router-link to="/logout">
          <i class="bx bx-log-out" id="log_out"></i
        ></router-link>
      </li>
    </ul>
  </div>
  <section class="home-section">
    <div class="container-fluid space-top">
      <router-view />
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      buscar_ben: "",
    };
  },
  watch: {
    buscar_ben(val) {
      console.log(val);
      // console.log(this.$store.dispatch('filteredDataByNumeroAdra',val));
      this.$store.state.buscar = true;
      this.$store.state.search_keyword = this.buscar_ben;
     

      if (this.$store.state.page >=  this.$store.state.records) {
        this.$store.dispatch("paginate_control", 1);
      }
    },
  },

  created: function () {
    axios.interceptors.response.use(
      (response) => {
        // Return a successful response back to the calling service
        return response;
      },
      (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status == 401) {
          this.$store.dispatch("userLogout").then(() => {
            this.$router.push({ name: "Login" });
          });
        } else {
          // window.location.href = '/operator-portal/login';
          // return false;
        }
      }
    );
  },
  mounted() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });

    searchBtn.addEventListener("click", () => {
      // Sidebar open when you click on the search icon
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the icons class
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the icons class
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
