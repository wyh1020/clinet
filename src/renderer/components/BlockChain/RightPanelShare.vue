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
        <tr v-for ="(item, index) in blockShare" v-bind:key ="index" v-on:click="share(item, index)" v-bind:class="{'table-danger':height == index}">
          <td>{{item.key}}</td>
          <td>{{item.val}}</td>
          <td>{{item.last}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  // import { blockShare } from '../../utils/BlockBlock'
  export default {
    data() {
      return {
        height: null
      }
    },
    computed: {
      blockShare: {
        get() {
          return this.$store.state.Block.blockShare
        }
      }
    },
    methods: {
      share: function (value, index) {
        this.height = index
        this.$store.commit('BLOCK_SET_INSERT', value);
      }
    },
  };
</script>

<style scoped>

</style>
