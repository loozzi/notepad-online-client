<template>
  <div id="app">
    <router-view name="header-view" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1200px;
  max-width: 100%;
  margin: auto;
  font-size: 62.5%;
}

@media screen and (max-width: 1200px) {
  #app {
    width: 98%;
  }
}
</style>
