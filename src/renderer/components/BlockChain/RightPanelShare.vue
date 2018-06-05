<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>表</th>
          <th>数量</th>
          <th>最后更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for ="(item, index) in blockShare" v-bind:key ="index">
          <td>{{item.key}}</td>
          <td>{{item.val}}</td>
          <td>{{item.last}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { blockShare } from '../../utils/BlockBlock'
  export default {
    computed: {
      blockShare: {
        get() {
          return this.$store.state.Block.blockShare
        }
      }
    },
    created: function () {
      console.log(this.$store.state.System.server);
      blockShare(this, [this.$store.state.System.server, this.$store.state.System.port])
    },
    methods: {
    },
  };
</script>

<style scoped>

</style>
