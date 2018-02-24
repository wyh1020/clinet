<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" id="library-rightpanel">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  export default {
    components: { RightBar },
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          const f = []
          let start = 0
          let fileLen = this.$store.state.Library.tableSel.length;
          // console.log(fileLen)
          if (fileLen > 99) {
            if (this.$store.state.Library.tablePage > 0) {
              start = 100 * this.$store.state.Library.tablePage
              fileLen = start + 99
            } else {
              fileLen = 99
            }
          }
          if (fileLen > this.$store.state.Library.tableSel.length) {
            fileLen = this.$store.state.Library.tableSel.length
          }
          for (let i = start; i < fileLen; i += 1) {
            f.push(this.$store.state.Library.tableSel[i])
          }
          return f
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('LIBRARY_GET_FIELD', data);
        this.$store.commit('LIBRARY_GET_FIELD_INDEX', index);
      },
    },
  };
</script>

<style scoped>

</style>
