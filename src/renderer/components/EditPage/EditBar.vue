<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="alert alert-warning" role="alert" style="width: 100%; position: fixed; bottom: 40px">提示内容</div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
      <input id="edit-input" style="line-height: 3" type="text" class="form-control" placeholder="请输入。。。" aria-label="Username" aria-describedby="basic-addon1" v-model="item"  v-on:keyup.enter="enter" v-on:keyup.up="up" 
      v-on:keyup.down="down" v-on:keyup.left="left" v-on:keyup.right="right" v-on:keyup.space="space"    v-on:keyup.ctrl.left="itemUp" v-on:keyup.ctrl.right="itemDown" v-on:keyup.ctrl.delete="del">
    </nav>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        item: ''
      };
    },
    mounted: function () {
      this.$nextTick(() => {
        document.getElementById('edit-input').focus()
      })
    },
    methods: {
      enter(e) {
        const n = this.$store.state.Edit.docIndex
        console.log(n)
        const v = e.target.value.split(' ').filter(i => i !== '');
        if (v.length > 0) {
          this.$store.commit('EDIT_UPDATE_DOC', [n, v]);
          this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
          this.item = '';
        }
      },
      up() {
        const n = this.$store.state.Edit.docIndex - 1
        const x = this.$store.state.Edit.doc[n]
        this.$store.commit('EDIT_SET_DOC_INDEX', [-1]);
        if (x) { this.item = x.toString().replace(/,/g, '   ') }
      },
      down() {
        const n = this.$store.state.Edit.docIndex + 1
        const x = this.$store.state.Edit.doc[n]
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
        if (x) { this.item = x.toString().replace(/,/g, '   ') }
      },
      itemUp() {
        if (this.$store.state.Edit.docIndex > 0) {
          if (this.$store.state.Edit.doc.length > this.$store.state.Edit.docIndex) {
            const n1 = this.$store.state.Edit.docIndex
            const v1 = this.$store.state.Edit.doc[n1]
            const n2 = this.$store.state.Edit.docIndex - 1
            const v2 = this.$store.state.Edit.doc[n2]
            this.$store.commit('EDIT_UPDATE_DOC', [n1, v2]);
            this.$store.commit('EDIT_UPDATE_DOC', [n2, v1]);
            this.$store.commit('EDIT_SET_DOC_INDEX', [-1]);
          }
        }
      },
      itemDown() {
        if (this.$store.state.Edit.docIndex < this.$store.state.Edit.doc.length - 1) {
          const n1 = this.$store.state.Edit.docIndex
          const v1 = this.$store.state.Edit.doc[n1]
          const n2 = this.$store.state.Edit.docIndex + 1
          const v2 = this.$store.state.Edit.doc[n2]
          this.$store.commit('EDIT_UPDATE_DOC', [n1, v2]);
          this.$store.commit('EDIT_UPDATE_DOC', [n2, v1]);
          this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
        }
      },
      del() {
        const n1 = this.$store.state.Edit.docIndex
        const n2 = this.$store.state.Edit.docIndex + 1
        const x = this.$store.state.Edit.doc[n2]
        if (x) { this.item = x.toString().replace(/,/g, '   ') } else { this.item = '' }
        this.$store.commit('EDIT_DELETE_ITEM', n1);
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
