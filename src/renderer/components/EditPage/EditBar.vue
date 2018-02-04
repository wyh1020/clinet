<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
    <input type="text" class="form-control" placeholder="请输入。。。" aria-label="Username" aria-describedby="basic-addon1" v-model="doc" v-on:keyup.13="submit">
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        doc: '',
        currentTime: new Date().toLocaleString(),
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
      };
    },
    methods: {
      submit: function () {
        console.log(this.doc)
      },
      created: function () {
        this.$nextTick(function () {
          this.timer()
        })
      },
      timer: function () {
        this.getTime = () => {
          this.currentTime = new Date().toLocaleString();
        }
        setInterval(this.getTime, 1000);
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  input {
    width: 100%
  }
</style>
