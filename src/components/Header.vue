<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Adra Torrejon</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#"> <router-link to="/">Home</router-link></a> -->
           
            <router-link to="/" class="nav-link active" >Home</router-link>
        
          </li>
          <li class="nav-item">
               <router-link class="nav-link active" to="/login">login</router-link>
          </li>
          <li class="nav-item">
             <router-link class="nav-link active" to="/logout">logout</router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
    name:"Header"
};
</script>

<style>
</style>