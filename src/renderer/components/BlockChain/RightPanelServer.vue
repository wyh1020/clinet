<template>
  <div>
    <table v-if="toolbar == 'getServers'">
      <!-- <tr v-for="(line, index) in file" v-bind:key='index' v-on:click="onClick(line, index)" class="block-rightpanel-server-tr">
        <td class="block-rightpanel-server-td" v-for="(data, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr> -->
    </table>
    <table v-if="toolbar == 'setNodes'">
      <tr>
        <td>服务器IP</td>
        <td>服务器PORT</td>
        <td>序号</td>
        <td>操作系统</td>
        <td>区块链版本号</td>
      </tr>
      <tr v-for="(line, index) in peers" v-bind:key='index' v-on:click="onClick(line, index)">
        <td v-for="(data, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
    <table v-if="toolbar == 'blockChainFunction'">
      <tr>
        <td>服务器IP</td>
        <td>服务器PORT</td>
        <td>服务名称</td>
        <td>服务介绍</td>
        <td>服务版本号</td>
      </tr>
      <tr v-for="(line, index) in funs" v-bind:key='index' v-on:click="onClick(line, index)">
        <td v-for="(data, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
    <div v-if="toolbar == 'blockChainInfo'" id="block-server-introduce">
      <p>
        区块链在数据保护上具有4大特点：
        <ul>
          <li>隐私保护:用户使用口令密码登录,上传数据使用地址密码代表用户,保障用户个人信息不泄漏</li>
          <li>数据不可篡改:上传数据通过生成区块链交易保存,交易完成后不可撤销,不可算改,保障数据安全</li>
          <li>数据完全共享:所有加入区块链的节点,都完全共享区块链上的所有数据</li>
          <li>数据权益保障:用户上传数据完成交易,获得健康币,健康币可用于区块链上的服务</li>
        </ul>
        区块链的6大功能分层：
        <ul>
          <li>数据层:</li>
          <li>网络层:</li>
          <li>安全层:</li>
          <li>共识层:</li>
          <li>交易层:</li>
          <li>应用层:</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
  import { serverStatus } from '../../utils/BlockPeer'
  export default {
    data() {
      return {
        flag: null
      }
    },
    computed: {
      toolbar: {
        get() {
          return this.$store.state.Block.toolbar
        }
      },
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
      peers: {
        get() {
          return this.$store.state.Block.peers
        }
      },
      funs: {
        get() {
          return this.$store.state.Block.funs
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        if (this.$store.state.Block.toolbar === 'getServers') {
          serverStatus(this, [data[1], data[2], index])
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
