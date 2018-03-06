<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="alert alert-warning" id="edit-bar-prompt" role="alert" style="width: 100%; position: fixed; bottom: 40px"><span v-bind:key='index' v-for="(data, index) in hint">{{index + 1}}.{{data}}</span></div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
      <input id="edit-bar-input" style="line-height: 3" type="text" class="form-control" placeholder="请输入……" aria-label="Username" aria-describedby="basic-addon1" v-model="item"  v-on:keyup.enter="enter" v-on:keyup.up="up" 
      v-on:keyup.down="down" v-on:keyup.left="left" v-on:keyup.right="right" v-on:keyup.space="space"    v-on:keyup.ctrl.left="itemUp" v-on:keyup.ctrl.right="itemDown" v-on:keyup.ctrl.delete="del" v-on:keyup.ctrl.0="hintDown"
      v-on:keyup.ctrl.110="hintUp">
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
        document.getElementById('edit-bar-input').focus()
      })
    },
    computed: {
      hint: {
        get() {
          const content = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll']
          const hintSkip = this.$store.state.Edit.hintPage
          const num = hintSkip * 10
          const hintContent = content.slice(num, num + 10)
          return hintContent
        }
      },
    },
    methods: {
      enter(e) {
        const n = this.$store.state.Edit.docIndex
        // console.log(n)
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
        if (this.$store.state.Edit.docIndex > 0 && this.$store.state.Edit.fileType === 'cda') {
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
        if (this.$store.state.Edit.docIndex < this.$store.state.Edit.doc.length - 1 && this.$store.state.Edit.fileType === 'cda') {
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
        if (this.$store.state.Edit.fileType === 'cda') {
          const n1 = this.$store.state.Edit.docIndex
          const n2 = this.$store.state.Edit.docIndex + 1
          const x = this.$store.state.Edit.doc[n2]
          if (x) { this.item = x.toString().replace(/,/g, '   ') } else { this.item = '' }
          this.$store.commit('EDIT_DELETE_ITEM', n1);
        }
      },
      left() {
        console.log('left')
      },
      right() {
        console.log('right')
      },
      space() {
        console.log('space')
      },
      hintUp() {
        const content = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll']
        const pageNum = Math.ceil(content.length / 10)
        if (this.$store.state.Edit.hintPage < pageNum - 1) {
          this.$store.commit('EDIT_SET_HINT_PAGE', 'up');
        }
      },
      hintDown() {
        if (this.$store.state.Edit.hintPage > 0) {
          this.$store.commit('EDIT_SET_HINT_PAGE', 'down');
        }
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
  span {
    margin-right: 20px;
  }
</style>
