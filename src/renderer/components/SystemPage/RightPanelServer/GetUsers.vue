<template>
  <div>
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th scope="col">名称</th>
          <th scope="col">信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(values, key) in this.$store.state.System.user" v-bind:key='key' v-if="['username', 'type', 'org', 'id', 'blockchain', 'password'].includes(key)">
          <td v-if="key === 'username'">用户名</td>
          <td v-else-if="key === 'type'">权限</td>
          <td v-else-if="key === 'org'">机构</td>
          <td v-else-if="key === 'id'">ID</td>
          <td v-else-if="key === 'blockchain'">区块信息</td>
          <td v-else-if="key === 'password'">密码</td>
          <td v-if="key === 'username'"  v-on:click="createUserinfo('name')">
            <div v-if="userinfo.name">
              <input type="text" v-model="userinfoName" />
            </div>
            <div v-else>{{values}}</div>
          </td>
          <td v-else-if="key === 'password'" v-on:click="createUserinfo('pass')">
            <div v-if="userinfo.pass">
              <input type="text" v-model="userinfoPass" />
            </div>
            <div v-else>{{values}}</div>
          </td>
          <td v-else>{{values}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userinfo: { name: false, pass: false },
        userinfoName: '',
        userinfoPass: ''
      }
    },
    methods: {
      createUserinfo: function (value) {
        if (value === 'name') {
          this.userinfo.name = true
        } else if (value === 'pass') {
          this.userinfo.pass = true
        }
      }
    }
  };
</script>
