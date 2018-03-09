<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>编码</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in this.$store.state.System.comprule" v-bind:key="index" v-on:click="ruleClick('mdc',index, index+1)">
          <td>{{value.code}}</td>
          <td>{{value.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { sGetCompRule } from '../../../utils/Server'
export default {
  data() {
    return {
    }
  },
  methods: {
    ruleClick: function (key, value) {
      console.log(this.$store.state.System.comprule[value].table)
      switch (this.$store.state.System.comprule[value].table) {
        case 'mdc':
          sGetCompRule(this, [this.$store.state.System.server, this.$store.state.System.port, 'adrg', this.$store.state.System.comprule[value]])
          break;
        case 'adrg':
          sGetCompRule(this, [this.$store.state.System.server, this.$store.state.System.port, 'drg', this.$store.state.System.comprule[value]])
          break;
        case 'drg':
          break;
        default:
      }
    }
  }
}
</script>
