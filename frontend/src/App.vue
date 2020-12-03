<template>
  <div id="app">
    <!-- <chat /> -->
    <!-- <iframe-test /> -->
    <router-view />
  </div>
</template>

<script>
// import Chat from './components/Chat';
// import IframeTest from './components/IframeTest';

export default {
  name: 'App',
  components: {
    // 'chat': Chat,
    // 'iframe-test': IframeTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page-container {
  width: 100%;
  height: 100%
}
</style>
