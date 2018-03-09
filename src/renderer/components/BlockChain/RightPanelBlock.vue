<template>
  <div>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index'>
        <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
    <div v-if="toolbar == 'blockList'">
      <table class="table">
        <thead>
          <tr>
            <th>高度</th>
            <th>日期</th>
            <th>ID</th>
            <th>生产者</th>
            <th>交易</th>
            <th>总金额</th>
            <th>总费用</th>
            <th>奖励</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in this.$store.state.Block.peers"  v-bind:key='index' v-bind:class="{'table-danger': hightLight === index}" v-on:click="block(index)">
            <td>{{value.height}}</td>
            <td></td>
            <td>{{value.id}}</td>
            <td>{{value.generatorId}}</td>
            <td>{{value.numberOfTransactions}}</td>
            <td>{{value.totalAmount/100000000}}</td>
            <td>{{value.totalFee/100000000}}</td>
            <td>{{value.reward/100000000}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="toolbar == 'blockInfo'">
      <table>
        <tr v-for="(value, key) in blockInfo">
          <td>{{key}}</td>
          <td>{{value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hightLight: 0,
      }
    },
    computed: {
      toolbar: {
        get() {
          return this.$store.state.Block.toolbar
        }
      },
      blockInfo: {
        get() {
          return this.$store.state.Block.blockInfo
        }
      },
      file: {
        get() {
          const f = [];
          let len = this.$store.state.System.file.length;
          if (len > 99) { len = 99 }
          for (let i = 0; i < len; i += 1) {
            f.push(this.$store.state.System.file[i].split(','))
          }
          return f
        }
      },
    },
    methods: {
      load: function (n) {
        switch (n) {
          case 1:
            this.$router.push('/edit');
            break;
          default:
            this.$router.push('/edit');
        }
      },
      block: function (value) {
        this.hightLight = value;
        this.$store.commit('BLOCK_GET_BLOCK_INFO', this.$store.state.Block.peers[value])
      }
    },
  };
</script>

<style scoped>

</style>
