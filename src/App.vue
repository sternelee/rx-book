<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <date-picker v-model="value" range lang="zh"></date-picker>
    <span v-for="n in 5" :key="n">{{n}}</span>
  </div>
</template>

<script>
  import DatePicker from '@xunlei/vue2-datepicker2'

  export default {
    name: 'app',
    components: {
      DatePicker
    },
    data () {
      return {
        value: ''
      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
