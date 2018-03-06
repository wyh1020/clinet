<template>
  <div>
    <form>
      <div class="form-group">
        <label for="InputEmail">机构人员设置</label>
        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="personInfo.email">
      </div>
      <div class="form-group">
        <label for="InputPassword">用户密码</label>
        <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="personInfo.password">
      </div>
    </form>
    <button type="submit" class="btn btn-primary" v-on:click="register">添加机构</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        personInfo: { email: '', password: '' }
      }
    },
    methods: {
      register: function () {

      }
    }
  };
</script>
