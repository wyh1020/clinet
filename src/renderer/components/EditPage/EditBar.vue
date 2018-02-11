<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="alert alert-warning" role="alert" style="width: 100%; position: fixed; bottom: 40px">提示内容</div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
      <input style="line-height: 3" type="text" class="form-control" placeholder="请输入。。。" aria-label="Username" aria-describedby="basic-addon1" v-model="entry"  v-on:keyup.enter="enter" v-on:keyup.up="up" 
      v-on:keyup.down="down" v-on:keyup.left="left" v-on:keyup.right="right" v-on:keyup.space="space">
    </nav>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        entry: ''
      };
    },
    methods: {
      enter(e) {
        const n = this.$store.state.Edit.docIndex
        this.$store.commit('EDIT_UPDATE_DOC', [n, e.target.value]);
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
        this.entry = '';
      },
      up() {
        const n = this.$store.state.Edit.docIndex - 1
        const x = this.$store.state.Edit.doc[n]
        this.$store.commit('EDIT_SET_DOC_INDEX', [-1]);
        this.entry = x
      },
      down() {
        const n = this.$store.state.Edit.docIndex + 1
        const x = this.$store.state.Edit.doc[n]
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
        this.entry = x
      },
      left() {
        console.log('left')
      },
      right() {
        console.log('right')
      },
      space() {
        console.log('space')
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
