<template>
  <div class="persionTop">
    <div v-if="orgPage === 'getPersonTable'">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>姓名</th>
            <th>机构</th>
            <th>年龄</th>
            <th>电话</th>
            <th>邮箱</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for= "(value, index) in persons.data" v-bind:key="index" v-on:click="upUser(index)">
            <td>{{value.id}}</td>
            <td>{{value.username}}</td>
            <td>{{value.name}}</td>
            <td>{{value.org}}</td>
            <td>{{value.age}}</td>
            <td>{{value.tel}}</td>
            <td>{{value.email}}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="page">
        <ul class="pagination">
          <li class="page-item" v-for= "(value, index) in persons.page_list" v-bind:key="index" v-bind:class="{'disabled':value.page == persons.page_num}" v-on:click="serverPage(value.page)"><a class="page-link" href="#">
            {{value.num}}
          </a></li>
        </ul>
      </nav>
    </div>
    <div v-if="orgPage === 'getPerson'">
      <form>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" placeholder="姓名" v-model="personInfo.name" @input="persion()">
        </div>
        <div class="form-group">
          <label>机构</label>
          <input type="text" class="form-control" placeholder="机构" v-model="personInfo.org" @input="persion()">
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="text" class="form-control" placeholder="年龄" v-model="personInfo.age" @input="persion()">
        </div>
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" placeholder="电话" v-model="personInfo.tel" @input="persion()">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" placeholder="邮箱" v-model="personInfo.email" @input="persion()">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { sGetUsers } from '../../../utils/Server';
  export default {
    data() {
      return {
        personInfo: { name: '', org: '', age: '', tel: '', email: '' },
        upPerson: 'table',
        id: null
      }
    },
    computed: {
      persons: {
        get() {
          return this.$store.state.System.persons
        }
      },
      orgPage: {
        get() {
          return this.$store.state.System.orgPage
        }
      }
    },
    methods: {
      persion: function () {
        const b = { name: this.personInfo.name, org: this.personInfo.org, age: this.personInfo.age, tel: this.personInfo.tel, email: this.personInfo.email }
        this.$store.commit('SYSTEM_UPDATA_PERSON', b)
      },
      upUser: function (value) {
        this.personInfo.name = this.persons.data[value].name
        this.personInfo.org = this.persons.data[value].org
        this.personInfo.age = this.persons.data[value].age
        this.personInfo.tel = this.persons.data[value].tel
        this.personInfo.email = this.persons.data[value].email
        this.id = this.persons.data[value].id
        this.$store.commit('SYSTEM_ID_PERSON', this.persons.data[value].id)
        this.$store.commit('SYSTEM_GET_ORGPAGE', 'getPerson');
      },
      serverPage: function (value) {
        sGetUsers(this, [this.$store.state.System.server, this.$store.state.System.port], value)
      }
    }
  };
</script>
<style>
.persionTop {
  margin-top: 0.8em;
}
.page {
  float: right;
}
</style>
