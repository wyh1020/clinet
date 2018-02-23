<template>
  <div>
    <div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1" class="text-danger">注册的Email地址</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" class="text-danger">用户密码</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        
      </form>
      <button id="login" class="btn btn-outline-primary" v-on:click="login">登陆</button>
    </div>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index'>
        <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
      login: function () {

      }
    },
  };
</script>

<style scoped>

</style>
