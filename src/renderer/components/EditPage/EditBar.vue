<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
    <input type="text" class="form-control" placeholder="请输入。。。" aria-label="Username" aria-describedby="basic-addon1" v-model="doc"  v-on:keyup.enter="updateDoc">
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        doc: ''
      };
    },
    methods: {
      updateDoc(e) {
        this.$store.commit('PUSH_DOC', e.target.value);
        this.doc = '';
      }
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
