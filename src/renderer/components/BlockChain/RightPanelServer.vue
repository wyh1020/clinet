<template>
  <div>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index' v-on:click="onClick(line, index)">
        <td v-for="(data, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { serverStatus, peers } from '../../utils/BlockPeer'
  export default {
    data() {
      return {
        flag: null
      }
    },
    computed: {
      file: {
        get() {
          const f = [];
          let len = this.$store.state.Block.file.length;
          if (len > 99) { len = 99 }
          for (let i = 0; i < len; i += 1) {
            f.push(this.$store.state.Block.file[i].split(','))
          }
          return f
        }
      },
    },
    methods: {
      onClick: function (data, index) {
        // console.log(data)
        // console.log(index)
        this.flag = index
        this.$store.commit('BLOCK_SET_SERVER', data);
        // console.log(this.$store.state.Block.toolbar)
        if (this.$store.state.Block.toolbar === 'getServers') {
          serverStatus(this, [data[1], data[2], index])
          peers(this, [data[1], data[2]])
        }
      },
      // login: function () {
      //   s1(this, [this.$store.state.Block.server, this.$store.state.Block.port])
      // },
    },
  };
</script>

<style scoped>

</style>
