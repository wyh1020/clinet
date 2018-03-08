<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="alert alert-warning" id="edit-bar-prompt" role="alert" style="width: 100%; position: fixed; bottom: 40px">
        <span v-bind:key='index' v-for="(data, index) in hint">{{data}}</span>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
      <input id="edit-editbar-input" style="line-height: 3" type="text" class="form-control"
      placeholder="请输入……" aria-label="Username" aria-describedby="basic-addon1" v-model="item"
      v-on:keyup.enter="enter" v-on:keyup.up="up" v-on:keyup.down="down" v-on:keyup.left="left"
      v-on:keyup.right="right" v-on:keyup.space="space" v-on:keyup.ctrl.left="itemUp"
      v-on:keyup.ctrl.right="itemDown" v-on:keyup.ctrl.delete="del" v-on:keyup.ctrl.0="hintDown"
      v-on:keyup.ctrl.110="hintUp" v-on:keyup.ctrl.97="hintSet(1)" v-on:keyup.ctrl.98="hintSet(2)"
      v-on:keyup.ctrl.99="hintSet(3)" v-on:keyup.ctrl.100="hintSet(4)" v-on:keyup.ctrl.101="hintSet(5)"
      v-on:keyup.ctrl.102="hintSet(6)" v-on:keyup.ctrl.103="hintSet(7)" v-on:keyup.ctrl.104="hintSet(8)"
      v-on:keyup.ctrl.105="hintSet(9)" v-on:input="change" v-on:focus="focus">
    </nav>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        item: '',
      };
    },
    mounted: function () {
      this.$nextTick(() => {
        document.getElementById('edit-editbar-input').focus()
      })
    },
    computed: {
      hint: {
        get() {
          let content1 = []
          if (this.$store.state.Edit.hintType === 'hint' && this.$store.state.Edit.hint.length > 1) {
            const hintSkip = this.$store.state.Edit.hintPage
            const num = hintSkip * 9
            const hint = this.$store.state.Edit.hint.slice(num, num + 9)
            const hint1 = hint.map((x, index) => index + 1 + '.'.concat(x))
            content1 = hint1
          } else {
            content1 = this.$store.state.Home.notice
          }
          return content1
        }
      },
    },
    methods: {
      enter(e) {
        const n = this.$store.state.Edit.docIndex
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
        const value = this.$store.state.Edit.editBarValue
        if (value.indexOf(' ') === -1) {
          this.$store.commit('EDIT_SET_HINT', global.hitbdata.cdh[value]);
        }
      },
      hintUp() {
        const pageNum = Math.ceil(this.content.length / 9)
        if (this.$store.state.Edit.hintPage < pageNum - 1) {
          this.$store.commit('EDIT_SET_HINT_PAGE', 'up');
        } else {
          this.$store.commit('SET_NOTICE', '当前提示已为最后一页');
          this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
        }
      },
      hintDown() {
        if (this.$store.state.Edit.hintPage > 0) {
          this.$store.commit('EDIT_SET_HINT_PAGE', 'down');
        } else {
          this.$store.commit('SET_NOTICE', '当前提示已为第一页');
          this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
        }
      },
      hintSet(num) {
        this.$store.commit('EDIT_CONCAT_BAR_VALUE', this.$store.state.Edit.hint[num - 1]);
        this.item = this.$store.state.Edit.editBarValue;
      },
      change() {
        const value = document.getElementById('edit-editbar-input').value
        this.$store.commit('EDIT_SET_BAR_VALUE', value);
      },
      focus() {
        this.$store.commit('EDIT_SET_HINT_TYPE', 'hint');
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
  span {
    margin-right: 20px;
  }
</style>
