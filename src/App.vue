<template>
  <div id="app" class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
.app {
  width: 100%;
  min-height: 100vh;
  background: #f9f9f9;
}

.text-center {
  text-align: center;
}

.p-4 {
  padding: 20px;
}

.pt-4 {
  padding-top: 20px;
}

.px-4 {
  padding-left: 20px;
  padding-right: 20px;
}

.py-1 {
  padding: 5px 0;
}

.py-2 {
  padding: 10px 0;
}

.py-3 {
  padding: 15px 0;
}

.mx-1 {
  margin: 0 5px;
}

.my-1 {
  margin: 5px 0;
}

.my-2 {
  margin: 10px 0;
}

.my-3 {
  margin: 15px 0;
}

@media (min-width: 769px) {
  .container {
    margin-right: auto !important;
    margin-left: auto !important;

    max-width: 960px !important;

    padding-right: 10px !important;
    padding-left: 10px !important;
  }
}
</style>
