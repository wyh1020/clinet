<template>
  <div>
    <right-bar></right-bar>
    <div class="row">
      <div class="col">
        <left-panel></left-panel>
      </div>
      <div class="col">
        <div id="chartLeft" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div id="chartRight" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div class="alert alert-danger" role="alert" style="height:100%; overflow-y:auto;">
          <h4 class="alert-heading">数据分析提示!</h4>
          <ol class="">
            <li class="">aaa</li>
            <li class="" aria-current="page">bbb</li>
          </ol>
        </div>
      </div>
    </div>
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import LeftPanel from './Leftpanel';
  export default {
    components: { RightBar, LeftPanel },
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          const f = []
          let fileLen = this.$store.state.Stat.file.length;
          // console.log(fileLen)
          if (fileLen > 99) { fileLen = 99 }
          for (let i = 0; i < fileLen; i += 1) {
            f.push(this.$store.state.Stat.file[i].split(','))
          }
          return f
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('GET_FIELD', data);
        this.$store.commit('GET_FIELD_INDEX', index);
      },
      show: function () {
        this.showChart()
      },
    },
  };
</script>

<style scoped>
  table {
    width: 100%;
    margin: 40px;
    margin-top: 5px;
    margin-left: 2px;
    padding: 0;
  }
</style>
